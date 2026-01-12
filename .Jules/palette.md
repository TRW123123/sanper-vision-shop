## 2024-05-23 - [Improved Async Feedback on Configurator Submit]
**Learning:** The `Configurator` component performs a critical async form submission but lacked visual feedback (loading state) and state protection (disabled buttons) during the request. This could lead to multiple submissions or user confusion. Adding `isSubmitting` state and a spinner resolves this.
**Action:** When implementing form submissions, always check if the submit action is async and if so, implement a loading state and disable all interactive elements (submit, back, etc.) to prevent race conditions and improve UX.
