# Implementation Plan: AI Itinerary Integration (Bli Tourah)

## Overview
This phase focuses on connecting the "Magic Text Area" to our Gemini AI backend. We want Bli Tourah to actually "think" and provide a personalized itinerary based on the user's brain-dump.

## 1. Frontend: Form Logic & Input Limit
- **State Management:** 
  - Add `userInput` state to track the textarea content.
  - Add `isLoading` state to manage the button and loading UI.
  - Add `itinerary` state to store the JSON response from the API.
- **Input Validation:**
  - Implement a **1000 character limit** for the textarea.
  - Display a character counter (e.g., `85/1000`) that turns red when approaching the limit.
  - Disable the "Generate" button if the input is empty or exceeds the limit.
- **Loading State:**
  - While `isLoading` is true, change the Bli Tourah avatar to `bli-tourah-panic.png` to show he's "working hard" (or use a subtle pulse animation).
  - Disable the textarea and button during the request.

## 2. Backend: Gemini AI Persona (Bli Tourah)
- **File:** `src/app/api/generate/route.ts`
- **System Prompt Setup:**
  - Refine the `systemInstruction` to strictly define the **Bli Tourah Persona**:
    - **Identity:** A seasoned Balinese local concierge who knows every hidden gem.
    - **Tone:** Extremely helpful, warm, professional, and spiritual.
    - **Language:** Use Balinese greetings like *Om Swastyastu* (Greeting), *Suksma* (Thank you), and *Astungkara* (God willing/Hopefully).
    - **Logic:** Must analyze the number of days, budget level, traveler types (family, couple, solo), and strictly respect the "what to avoid" list.
- **Error Handling:**
  - Ensure the API handles empty prompts or Gemini failures gracefully, returning a user-friendly error message.

## 3. Frontend: Result Visualization
- **Layout Change:**
  - Once the itinerary is received, display it below the form or replace the form with the result.
  - **The "Insight" Card:** Show Bli Tourah's specific warning/tip in a prominent "Local Advice" box.
  - **Timeline UI:** Create a vertical timeline or card-based layout for the daily activities.
  - Use `framer-motion` for staggered entrance animations of the itinerary days.

## 4. Checklist for Junior Developer
- [x] Implement `userInput` state and character count (Max 1000).
- [x] Connect the "Generate" button to the `/api/generate` route using `fetch`.
- [x] Update `src/app/api/generate/route.ts` with the detailed Bli Tourah system prompt.
- [x] Implement a loading UI (e.g., button spinner or avatar change).
- [x] Improved error handling to show specific backend errors in the UI.
- [ ] Map through the `itinerary.days` and render the activities beautifully (In Progress).
- [ ] Add a "Start Over" or "Reset" button to clear the itinerary and try again.
- [ ] **Important:** Verify `GEMINI_API_KEY` is set in the environment or use the mock fallback.
- [ ] Test the integration with various inputs (e.g., "3 days, low budget, solo, avoid seafood").
