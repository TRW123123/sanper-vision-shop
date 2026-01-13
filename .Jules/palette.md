## 2026-01-13 - Shadcn Button Loading State
**Learning:** The `Button` component from Shadcn UI in this repo does not have a built-in `isLoading` prop. Loading states must be manually implemented using a state variable (e.g. `isSubmitting`), conditionally rendering a spinner (like `Loader2`), and setting the `disabled` attribute.
**Action:** When implementing forms or async actions, always manually add `isSubmitting` state and update the button UI to show feedback and prevent double-clicks.
