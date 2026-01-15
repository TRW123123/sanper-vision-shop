## 2024-05-22 - [Loading States & Hydration]
**Learning:** React components in Astro islands (`client:load`) need time to hydrate. If a user (or test script) clicks a submit button before hydration, the form performs a native browser submission (page reload) instead of the React `onSubmit` handler.
**Action:** Always verify hydration in E2E tests (e.g., wait for a specific state or element). For UX, consider disabling buttons until hydration is complete if critical JS logic is required.

## 2024-05-22 - [Shadcn Button Loading]
**Learning:** The Shadcn UI `Button` in this repo doesn't have a built-in `isLoading` prop. Loading states must be manually implemented by conditionally rendering a loader icon and managing the `disabled` state.
**Action:** Created a pattern: `<Button disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : <Icon />} {isLoading ? "..." : "Text"}</Button>`
