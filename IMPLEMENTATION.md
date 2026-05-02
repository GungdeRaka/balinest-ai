
# Implementation Plan: Friendly Error Handling UI 🚨
**Feature Objective:** Improve the error state UI when the backend API request fails (e.g., rate limits reached or exceptions caught in `src/app/api/generate/route.ts`). Instead of a generic error, we want Bli Tourah to apologize in a friendly, humorous way while displaying his panicked expression.

## Phase 1: Glossary Update
**Task:** Add the Balinese word "Ampura" to the `FULL_GLOSSARY` object in the frontend code.
**Definition:** "I'm sorry" or "Forgive me".

## Phase 2: Error State UI Updates
**Task:** Locate the error state rendering in the UI (where the `error` state is displayed).
**Changes Required:**
1. **Friendly Error Message:** Replace the standard error output with a custom, funny message. For example:
   > "<GlossaryTooltip word='Ampura' definition='I ]m sorry' />, my friend! 😅 It seems the travel spirits are a bit overwhelmed right now (or my coconut telegraph is broken). Let me catch my breath, and please try generating your magic itinerary again in a moment!"
2. **Avatar Update:** Ensure that while this error state is active, the avatar image displayed on the screen is strictly `/bli-tourah-panic.png`. 
3. **Styling:** Maintain the premium dark theme aesthetics even for the error message, avoiding harsh, unstyled default alert boxes.