EventCalendar application is used as an event-manager for a day.

Goal
Create simple event calendar app using react/redux/express/mongo stack.

Requirements
 - User should be able to view calendar.
 - Conflicting events should be the same width, and should not overlap.
 - Max event width is 200px.
 - Event background color is #E2ECF5 with #6E9ECF border color.
 - Event font is Open Sans, 14px.
 - Calendar time font is Open Sans with around 200 font weight, 16px large, 12px small.
 - Titles should be 1 line and should not overflow outside the calendar-event box. If the title is too long to fit, ellipsis (“…”) should be used.
 - Events will be between 8am to 5pm (there’s a label for 5pm but events will not exceed 5pm).
 - Calendar will cover only one same day.
 - User should be able to add/remove events from his calendar.
 - User should be able to export his calendar in JSON.
 - User should be able to login and persist his inputs between logins.


To get the application working in the development mode it is needed to perform:
- npm run start;
- npm run server.

The application will be available with localhost:3000.


To get the application working in the production mode it is required to implement the following:
- npm install -g serve;
- serve -s build;
- node server.js from build folder;

The application will be available with localhost:5000.
