# read-count-system (Pratilipi Assignment)

The Web Application demonstrates Real-time Read-Count System, wherein users can view the "current reader count" as well as the "total reader count". In order to access the data, user needs to be authenticated, for which, basic Login/Signup functionality is provided.

## Live Preview
https://read-count-system.herokuapp.com/

## Tech Stack
- NodeJS
- Express JS
- MongoDB
- Socket.io
- React (Client App)

## Steps to run locally
1. Clone the repository
```
git clone https://github.com/rishabh-madan/read-count-system.git
```
2. Open directory in terminal
```
cd read-count-system
```
3. Install dependencies
```
npm install
```
4. Run
```
npm run dev
```

## Application Overview

The Node Application provides REST API for the client app.

The stories are stored in MongoDB database, which can be fetched using the provided endpoints.
To manage the realtime read counts for each story, Socket.io is configured to capture the live connections, which holds details about the ```user``` and ```storyId```.
As soon as any new reader requests the story, the readers data is updated and a broadcast signal is sent to all the live connections, and the reader count is updated for each client.
The total read count is updated whenever a new user requests for the story (using API endpoint).

Note: Client App is designed and developed with the purpose of demonstration only. Since frontend wasn't a priority for the assignment, State Management and UI Design are just to fulfil bare minimum requirements.
