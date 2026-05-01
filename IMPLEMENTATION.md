# Implementation Plan: Itinerary Screen & Gapura Transition

## Overview
This document outlines the steps to build the secondary "Itinerary" screen for BaliNest AI. The implementation includes an animated page transition (a Balinese Gapura gate sliding open) and a new layout featuring the AI concierge Bli Tourah, where users can input their travel preferences.

## 1. Setup the Itinerary Route
- **Path:** Create a new directory and file at `src/app/itinerary/page.tsx`.
- **Purpose:** This page will act as Screen 2 (The Magic Text Area).
- **State Management:** Use `useEffect` to retrieve `balinest_username` from `localStorage` upon mounting to personalize the greeting.

## 2. Implement the Gapura Transition (Candi Bentar)
- **Concept:** When the user lands on the itinerary page (or immediately after submitting their name on the root page), two halves of a traditional Balinese gate (Gapura/Candi Bentar) should slide open horizontally to reveal the page content.
- **Assets:** Since we do not currently have Gapura image assets in `/public`, you will need to either source SVG/PNG images of a left and right Candi Bentar or use styled `div` elements as placeholders using the brand's maroon/gold colors.
- **Animation Implementation:**
  - Create a `GapuraTransition` component using `framer-motion`.
  - Position it over the entire screen (`fixed inset-0 z-50 flex`).
  - Animate the left half with `x: "-100%"` and the right half with `x: "100%"` on page load.
  - Apply `pointer-events-none` when the animation completes to allow user interaction.

## 3. Build Screen 2 (The Magic Text Area)
- **Bli Tourah Avatar:** 
  - Display the `public/bli-tourah-smile.png` avatar prominently in the corner of the screen.
- **Greeting Text:** 
  - Dynamically read the user's name from `localStorage`.
  - Display the text: *"Suksma, [User Name] family! Now, tell me everything. How many days, what is your budget, who is traveling, and what do you want to avoid?"*
  - Ensure the typography matches the premium dark-mode theme.
- **Magic Text Area:**
  - Add a `<textarea>` element below the greeting.
  - Make it large and prominent for a brain-dump input (e.g., `w-full max-w-2xl min-h-[200px]`).
  - Style it with a dark background (`#1a1a1a`) and a gold/maroon border on focus.
- **Generate Button:**
  - Add a "Generate Magic Itinerary" button below the textarea.
  - Style it prominently (e.g., solid gold background, bold black text, hover effects) to serve as the main call-to-action.

## 4. Checklist for Junior Developer
- [x] Create `src/app/itinerary/page.tsx`.
- [x] Add `useEffect` to retrieve the `balinest_username` from `localStorage`.
- [x] Build the Gapura (Candi Bentar) opening transition animation using `framer-motion`.
- [x] Display `@public/bli-tourah-smile.png` in the layout.
- [x] Render the personalized "Suksma..." greeting text.
- [x] Create the large, styled brain-dump `<textarea>`.
- [x] Add the "Generate Magic Itinerary" button.
- [x] Validate responsiveness and adherence to `globals.css` color variables.
