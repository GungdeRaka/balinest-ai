# Implementation Plan: BaliNest AI 🌴

## 1. Junior Developer Tasks: Balinese Glossary & UI Polish

### Task 1.1: Interactive Balinese Glossary (Tooltips)
Implement a tooltip feature for specific Balinese words used throughout the app (e.g., "Suksma", "Astungkara", "Om Swastyastu").
- **Requirement:** 
  - On **Desktop**: Show a small container (tooltip) with the word's meaning when hovering.
  - On **Mobile**: Show the tooltip when the word is clicked/tapped.
- **Words to include:**
  - **Om Swastyastu**: A Balinese greeting, meaning "May God bless you" or "May you be in a state of goodness."
  - **Suksma**: "Thank you."
  - **Astungkara**: "God willing" or "Hopefully."
  - **Bli**: A respectful term for an older brother or a peer male.

### Task 1.2: Panic Mode State
Implement a visual feedback loop in the itinerary generator to show Bli Tourah's "overwhelmed" state when the user provides a lot of detail.
- **Requirement:**
  - Track the character count of the `<textarea>` in State 2.
  - When `userInput.length > 120`, switch the Bli Tourah avatar from `bli-tourah-smile.png` to `bli-tourah-panic.png`.
  - Ensure the transition is smooth (using Framer Motion).

---

