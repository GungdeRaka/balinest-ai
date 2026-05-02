# Implementation Plan: Google Maps Tour Guide Button 🗺️
**Feature Objective:** Add a call-to-action (CTA) button directly above the "Start Over" button on the final itinerary screen. When clicked, it opens a new tab with a Google Maps search for tour guides or travel agencies in Bali.

## Phase 1: URL Helper Function
Inside the component that renders the final itinerary and "Start Over" button, add a simple helper function or constant for the Google Maps URL. 

To ensure it covers the general area of the trip, we will use a broad search query.
``` javascript
// Add this near your component's other helper functions
const getTourGuideMapLink = () => {
  // Using a broad query for Bali. You can dynamically inject specific locations from the itinerary state if preferred.
  const query = encodeURIComponent("tour guide or travel agency in Bali");
  return `[https://www.google.com/maps/search/?api=1&query=$](https://www.google.com/maps/search/?api=1&query=$){query}`;
};
```

### Phase 2: UI Layout & Styling
Locate the <div> or container holding the `<button>Start Over</button>`.
Insert a new `<a>` tag styled as a button directly above it.

#### UI Structure & Tailwind Styling Instructions:**

* **Container:** Ensure the wrapper holding these buttons is a flex column with a small gap (flex flex-col gap-4 items-center).

* **The New Button (Tour Guide):**

- Element: `<a>` tag with target="_blank" and rel="noopener noreferrer".

- Text: "Find Local Guides on Maps 🗺️"

- Style: Make it a solid gold/amber button to stand out as a primary CTA, contrasting with the outlined "Start Over" button.

- Tailwind Classes: w-full max-w-md bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-lg transition-colors text-center shadow-md

* **The Existing Button (Start Over):**

Keep its current outlined style, but ensure it matches the width of the new button (w-full max-w-md).

### Phase 3: JSX Execution Target
The final button cluster at the bottom of the itinerary screen should look like this:

```javascript
<div className="flex flex-col gap-4 mt-8 w-full items-center justify-center">
  
  <a 
    href={getTourGuideMapLink()}
    target="_blank" 
    rel="noopener noreferrer"
    className="w-full max-w-md bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-lg transition-colors text-center shadow-md"
  >
    Find Local Guides on Maps 🗺️
  </a>

  
  <button 
    onClick={handleStartOver}
    className="w-full max-w-md border border-amber-500 text-amber-500 hover:bg-amber-500/10 font-semibold py-3 px-4 rounded-lg transition-colors"
  >
    Start Over
  </button>
</div>
```