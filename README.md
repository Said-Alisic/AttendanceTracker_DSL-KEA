# Documentation

Welcome to the AttendanceTracker_DSL-KEA documentation. The application is not finished yet and is being gradually updated.

## Setup instructions

**Prerequisites**
- npm
- node.js
- mysql
- Create MySQL database with database directory SQL scripts
- Create .env file under dsl-app directory

**.env file contents**
- DB={name}
- DB_HOST={host} (e.g., localhost)
- DB_USER={user} (e.g., admin or root, etc.)
- DB_PASS={pass}
- DB_DIALECT={database_dialect} (e.g., mysql or postgres)
- BACKEND_PORT=8080

**Running the app**
1. Navigate to the folder dsl-app
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start both back- and frontend servers concurrently
4. Navigate to http://localhost:8080 for the api
5. Navigate to http://localhost:4200 for the client application

**Testing the app**
***As Admin user***
- Open a browser and navigate to http://localhost:4200 and sign in as (EMAIL) adminsuser@KEA.dk (PASS) 1234
- Click on 'Users' sidebar link and create a new user
- Click on 'Classes' sidebar link and create a new class
- Add new users to the new class or other classes and try removing users from classes
- Log out

***As Teacher user***
- Sign in as (EMAIL) teacheruser@KEA.dk (PASS) 1234
- You're right where you wanna be! (Otherwise, reloadd page and click on 'Attendances' sidebar link )
- Check attendances for the different classes (Databases class has most predefined attendances so best for checking a lot of statistics)
- Check both attendances where you can see timeslots and dates and overall attendance for users by percentage present and not present
- Click on 'Check Attendance' sidebar link and generate a new code for a class (preferably Databases for best testing due to data amount)
- Be sure to COPY the GENERATED CODE right after you GENERATE A CODE so you can submit it later as a student
- Click on 'Attendance' sidebar link and check the attendance stats (they will have changed right away)
- Log out

***As Student user***
- Sign in as (EMAIL) bobbayes@KEA.dk (PASS) 1234 and it should take you to the 'Submit Attendance' sidebar link automatically
- Submit the code (there may be an issue with location tracking either when creating or submitting the code, but for submitting, be sure to submit the code TWICE)
- Log out and sign in as the previous teacher and check the attendance statistics, they will have changed for Bob Bayes or whoever else you submitted the proper code with


##*NOTES*
- All predefined users' passwords are '1234' and the following users can be logged in to access the various functionalities of the app:\
  ADMIN access: adminuser@KEA.dk\
  TEACHER access: corradinimail@KEA.dk\
  STUDENT access: bobbayes@KEA.dk
- (WARNING) Users not part of a class can submit a code and will not receive a proper warning for not being part of the class, but it will not break the application
  


