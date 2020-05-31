# ToDo List with Recording feature

Todo List is an app to add your tasks to do.

## Technologies used

- Frontend: React with Typescript with custom Webpack. Axios for the calls. MomentJS to format the dates. EmotionJS as styling with styled components.
- Backend: Json-Server to create a easy to use and ready RestFul API.

## Working Demo

:rocket: At the moment the working demo is not public. The frontend and the backend are hosted on two different public available Heroku Dinos. Write me to have the link!

## Requested features

- Have a todo list with ADD, EDIT, DELETE of each Task.
- All of the actions should be persisted so the state will remain the same if I refresh the page
- RECORD button which records all of the actions performed between the moment it's pressed and the user press STOP
  - all of the tasks already in list will be saved as Initial State and the Replay will restart from this Initial State List
- STOP button that will stop the recording
- RESET button to clear all of the list
  - when recording is on it'll delete all of the Tasks in list and those actions will be recorded as normal deletion of each element
  - when it's not recording it'll simply empty the list
- PLAY button to replay all of the actions performed between Record and Stop
  - The Initial state ( full list of tasks when Rec was pressed ) will be restored after 3 seconds
  - Each action performed will be re performed in the same order, one each 1 second

Each TODO task will have:

- ID
- Name
- Description
- Creation date

## Installation

In the project directory, run:

### `npm install`

Install all dependencies

### `npm run dev`

Runs the app in the development mode.<br />
It'll run the frontend and the backend.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## License

[MIT](https://choosealicense.com/licenses/mit/)
