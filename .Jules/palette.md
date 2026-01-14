# Palette's Journal

## 2024-05-22 - Manual Loading States in Shadcn Buttons
**Learning:** The `Button` component from Shadcn UI in this repo lacks a native `loading` prop. We must manually handle `isSubmitting` state, disable the button, and conditionally render the `Loader2` icon.
**Action:** Use this pattern for all future form submissions: `disabled={isSubmitting}` and `{isSubmitting ? <Loader2 className="animate-spin" /> : <Icon />}`.

## 2024-05-22 - Sonner Component Dependency Issue
**Learning:** The `sonner` component (`src/components/ui/sonner.tsx`) imported `next-themes` but the package was missing/not compatible with this Astro setup.
**Action:** Removed `next-themes` dependency and hardcoded theme to "system" to fix build. Be careful when copying Shadcn components to check for Next.js specific dependencies.
