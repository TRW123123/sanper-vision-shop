
from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_default_timeout(10000)

    try:
        # Navigate to configurator
        print("Navigating to configurator...")
        page.goto("http://localhost:4321/konfigurator")

        # Step 1: Select Type
        print("Step 1: Selecting product type...")
        heading = page.get_by_role("heading", name="Bioklimatische Pergola")
        heading.scroll_into_view_if_needed()
        heading.click(force=True)
        time.sleep(1)
        page.get_by_role("button", name="Weiter").click()

        # Step 2: Dimensions
        print("Step 2: Waiting for dimensions...")
        expect(page.get_by_text("Breite (cm)")).to_be_visible()
        page.get_by_role("button", name="Weiter").click()

        # Step 3: Extras
        print("Step 3: Extras...")
        time.sleep(1)
        page.get_by_role("button", name="Weiter").click()

        # Step 4: Contact
        print("Step 4: Filling contact form...")
        expect(page.get_by_text("Fast geschafft!")).to_be_visible()

        page.get_by_label("Vorname *").fill("Test")
        page.get_by_label("Nachname *").fill("User")
        page.get_by_label("E-Mail *").fill("test@example.com")
        page.get_by_label("Telefon").fill("123456789")
        page.get_by_label("PLZ").fill("12345")

        # Setup Interception
        # We need a flag to know if we hit it
        request_intercepted = {"value": False}

        def handle_route(route):
            print(f"Intercepted POST request to {route.request.url}")
            request_intercepted["value"] = True
            # We do NOT fulfill here, intentionally hanging the request to capture the loading state
            # The browser will wait.

        # Route exact match for the form submission URL
        page.route("http://localhost:4321/", lambda route: handle_route(route) if route.request.method == "POST" else route.continue_())

        print("Submitting form...")
        submit_button = page.get_by_role("button", name="Anfrage absenden")
        submit_button.click()

        # Wait a second to ensure the React state updated and we are in "hanging" state
        time.sleep(1)

        print("Taking screenshot...")
        page.screenshot(path="verification/loading_state.png")

        if request_intercepted["value"]:
            print("Request was successfully intercepted.")
        else:
            print("WARNING: Request was NOT intercepted.")

        # Verify button text changed to "Wird gesendet..."
        expect(page.get_by_text("Wird gesendet...")).to_be_visible()
        expect(submit_button).to_be_disabled()

        print("SUCCESS: Loading state verified.")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
