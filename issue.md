# Issue: Implement Greeting Screen with Bli Tourah AI Avatar
## Overview
We need to transform the root page (`src/app/page.tsx`) into an interactive greeting screen. This screen will introduce users to **Bli Tourah**, our AI concierge, and collect the user's name before proceeding to the itinerary planner.

## Requirements

### 1. Visual Layout
- **Avatar:** Centered on the screen using the image located at `/public/bli-tourah-greeting.png`.
- **Chat Bubble:** A stylized text box placed directly above Bli Tourah's head.
- **Form:** A simple name input field and a "Continue" button located below the avatar.
- **Theming:** Strictly follow the color palette defined in `src/app/globals.css`:
- **Background:** `--background` (#111111)
- **Text:** `--foreground` (#ffffff)
- **Accents:** `--color-maroon` (#7f1d1d) and `--color-gold` (#d4af37)
### 2. Interaction & Animation
- **Typing Effect:** The greeting text should appear with a "typing animation" to simulate a real-time AI response.
- **Greeting Text:** *"Om Swastyastu! Welcome to BaliNest AI. I am Bli Tourah, your local AI
- **Form Submission:**
- **Capture the user's name.**
- **On submit, navigate the user to the `/itinerary` page** (note: this page doesn't exist yet, just implement the navigation).
### 3. Technical Implementation Details
- **Use Tailwind CSS for styling** (refer to `src/app/globals.css` for custom theme variables).  
- **Implement the typing animation** using a library (like `framer-motion`) or a simple `useEffect`.  
- **Ensure the layout is responsive** and looks premium (subtle shadows, elegant typography).

## Checklist for Junior Developer
- [ ] Replace placeholder content in `src/app/page.tsx`.
- [ ] Implement the chat bubble component with the typing animation.
- [ ] Properly position the `@public/bli-tourah-greeting.png` avatar.
- [ ] Create the name input field and "Continue" button using the `--color-gold` for the button  
- [ ] Add basic client-side validation for the name field (not empty).
- [ ] Implement navigation to `/itinerary` on successful submission.
- [ ] Verify that no linting errors are introduced.