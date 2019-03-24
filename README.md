# doyoumood
A simple app to measure mood of your team.

### Next steps
- Set up mongodb instead of file
- Think about a team view with authentication
- Manage different environment

### run in production

At root level, launch "node server.js" command.
Client side is served by node server

### in development / debug

At root level, launch 
  - "node server.js" 
  - "ng serve"
In docker launch
  - "docker run -it -p 27017:27017 -d mongo"

Application will be visible at "http://localhost:4200" address
