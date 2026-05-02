# Implementation Plan: Toggleable AI Restaurant Recommendations 🍽️
**Feature Objective:** The Gemini AI will generate a contextual restaurant recommendation for each day within the JSON response. However, this data should be hidden by default. A button next to the Day Title will toggle the restaurant card's visibility.

## Phase 1: Backend System Prompt Update (`app/api/generate-itinerary/route.ts`)
Update the `systemInstruction` in the Gemini API call to include the `recommended_restaurant` object inside the `day` schema.

**Updated JSON Schema Target:**
``` json
"itinerary": [
  {
    "day": 1,
    "theme": "Arrival & Gentle Introduction",
    "recommended_restaurant": {
      "name": "Name of a real, family-friendly local restaurant",
      "cuisine": "Type of food",
      "why_its_good": "1 sentence on why it fits this family's constraints."
    },
    "activities": [ ... ]
  }
]
```

## Phase 2: Frontend UI State Management
To manage the toggle state independently for each day, extract the rendering of a single day into a new local component (e.g., <DayCard dayData={day} />).

**Component Logic Requirements:**

Import useState from React.

Inside the <DayCard /> component, create a toggle state:
const [showRestaurant, setShowRestaurant] = useState(false);

## Phase 3: UI Layout & Tailwind Styling
Update the JSX for the day header to include the toggle button, and conditionally render the restaurant details.

**UI Structure Instructions:**

**The Header:** Place the Day Title/Theme and the Toggle Button in a flexbox row (flex justify-between items-center).

**The Toggle Button:**

**Text:** "Find Recommended Restaurant 🍽️" (If showRestaurant is false) / "Hide Restaurant" (If true).

**Styling:** Small text, subtle styling (e.g., text-xs text-amber-600 hover:text-amber-800 underline px-2 py-1 rounded).

**The Conditional Render:** Below the Day Header (and above or below the activities list), conditionally render the restaurant card.

**if (showRestaurant)** -> Render a Tailwind card.

**Styling for the card:** mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 transition-all.

**Content to map:** Render dayData.recommended_restaurant?.name, cuisine, and why_its_good.

## Acceptance Criteria
Clicking the button on Day 1 opens the restaurant for Day 1 ONLY.

The UI does not break if the AI occasionally forgets to output the recommended_restaurant object (use optional chaining ?.).