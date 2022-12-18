# StudentDatabaseFullStack

## Concept / Project Overview
Leveraging Spring Boot and React, this application adds and retrieves Students (to display) to the user through react components. The backend was built with Java using Spring Boot and MySQL, with the front end being built with React and MUI Core / Material UI for ready-made UI components. The flow of the application is relatively simple. Once the application is fully launched, you add a student by entering a name and an address and clicking the send button. After you refresh the page, the Students list will be updated with the newly added student. See Future Development below for project goals.


## Languages and Libraries
- Java
- Spring Boot
- MySQL
- Javascript
- React
- MUI Core / Material UI
- CSS
- HTML

## Installation Instructions
This repo contains the front and backend both of which need to be initialized separately. In addition to these files, I am using XAMPP Control Panel to run an instance of Apache and MySQL, so those would also be required, or other alternatives that do the same.

### Starting the Backend
The backend was built with Java (and its Spring Boot framework) using Maven, and is the `studentsystem` folder. The project was built in IntelliJ however, any Java IDE should work. Simply import as a maven project and once complete, run the application after you have opened instances of Apache and MySQL (and potentially changed the ports if applicable)

### Starting the frontend
The frontend was built with React and is in the folder `studentfrontend`. Open with your preferred editor, open a console and `cd` into the studentfrontend folder. After doing so, run `npm install` and once that is complete run `npm start` and an instance of the page should open in your preferred browser.

## Future Development
- Expand the application as a student management app with user, faculty and admin sign-in with specific features depending on log-in.
    - Admins would be able to:
      - Create, edit, and delete student profiles
      - Create, edit, and delete faculty profiles
      - Create, edit, and delete classes
    - Students would be able to:
      - Create a profile
      - Sign up for classes
      - View class schedule
    - Faculty would be able to:
      - Create a profile
      - View the roster of students for their classes
