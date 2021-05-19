# Documentation

Welcome to the AttendanceTracker_DSL-KEA documentation. The application is not finished yet and is being gradually updated.

## Setup instructions

**Prerequisites**
- npm
- node.js
- mysql (Currently not necessary)
- create .env file under dsl-app directory

**.env file contents**
- DB={name}
- DB_HOST={host} (e.g., localhost)
- DB_USER={user} (e.g., admin or root, etc.)
- DB_PASS={pass}
- DB_DIALECT={database_dialect} (e.g., mysql or postgres)

**Running the app**
1. Navigate to the folder dsl-app
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start both back- and frontend servers concurrently
4. Navigate to http://localhost:3333 for the api
5. Navigate to http://localhost:4200 for the client application

##*NOTES*
- Use Postman to create a new user; existing user's passwords don't work for authentication due to bcrypt.js requiring an encrypted password to allow you to authenticate

