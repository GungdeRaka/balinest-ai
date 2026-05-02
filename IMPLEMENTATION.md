
# Implementation: Google Calendar Utility (No Auth Required)
On the State 3 Output UI (itinerary result), inside each Activity Card, add an "Add to Google Calendar" button. Use this helper function to generate the href link dynamically from the AI's output:

``` // Utility function to place in frontend
export const generateGoogleCalendarLink = (activity) => {
  const baseUrl = "[https://calendar.google.com/calendar/render?action=TEMPLATE](https://calendar.google.com/calendar/render?action=TEMPLATE)";
  const title = encodeURIComponent(activity.title);
  const details = encodeURIComponent(activity.description);
  const location = encodeURIComponent(activity.location);
  const dates = `${activity.start_time}/${activity.end_time}`;
  
  return `${baseUrl}&text=${title}&dates=${dates}&details=${details}&location=${location}`;
};
```