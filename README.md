# read-count-system (Pratilipi Assignment)

The Web Application demonstrates Real-time Read-Count System, wherein users can view the "current reader count" as well as the "total reader count" for the stories available on the platform. In order to access the data (stories), users need to be authenticated, for which, basic Login/Signup functionality is provided.

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
4. Install client app dependencies
```
npm run client-install
```
4. Run
```
npm run dev
```
The client app can now be accessed on port 3000.

Note: The .env file containing ```database URI```, has been added for convenience. Feel free to modify it. The integrated database contains dummy data such as sample stories, and is required for keeping track of total reader count.

## Application Overview

The Node Application provides REST API for the client app.

The stories are stored in MongoDB database, which can be fetched using the provided endpoints.

To manage the realtime read counts for each story, Socket.io is configured to capture the live connections, which holds details about the ```username``` and ```storyId```.

Different stories are considered as different rooms for socket connection.

Client(Reader) connects to the socket, when ```Story``` page is viewed, the ```storyId``` is used to establish a connection to the specific ```room```.

As soon as any new reader requests the story, the readers data is updated and a broadcast message is sent to all the live connections(in that room), and the reader count is updated at the client's end.

The total read count is updated whenever a new user requests for the story (using API endpoint).

Note: Client App is designed and developed with the purpose of demonstration only. Since frontend wasn't a priority for the assignment, State Management and UI Design are just to fulfil bare minimum requirements.
