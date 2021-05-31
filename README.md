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

##*NOTES*
- All predefined users' passwords are '1234' and the following users can be logged in to access the various functionalities of the app:\
ADMIN access: adminuser@KEA.dk\
TEACHER access: corradinimail@KEA.dk\
STUDENT access: bobbayes@KEA.dk

