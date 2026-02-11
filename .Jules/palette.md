## 2025-02-18 - Missing Loading States on Forms
**Learning:** The application uses Shadcn UI buttons which don't have built-in loading states. Form submissions in `KontaktView` and `AnfrageView` currently lack feedback, making the UI feel unresponsive during the simulated API call.
**Action:** Always implement a local `isLoading` state when using Shadcn Buttons for async actions, and manually swap the icon for a `Loader2` spinner while disabling the button.
