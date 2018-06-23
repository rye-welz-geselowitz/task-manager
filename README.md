# Task Manager
This project is a coding challenge for Wonderschool.

## Try it out
`git clone https://github.com/sarahwelzgeselowitz/task-ui.git`
`cd task-manager`
`npm install`
`npm start`

## Design Decisions
* One of the main decisions I faced was when to determine a tasks's status (locked/completed/incomplete). Although task is the smallest conceptual unit in the app, its status depends on knowledge of all the other tasks. I considered two possibilities. (1) At the app level, I would map the task list to a new task list with a status field, which could then be rendered without any additional data. (2) At the App level, I would generate a set of incomplete tasks, which I would pass down to the component that renders a single task. I opted for the second choice because I did not like that the first choice required the programmer to manage multiple task lists, i.e. multiple sources of truth.
* Another decision I faced was where and how to encode the business logic for the app. In a larger app, I would probably opt to use Redux and embed the business logic in the reducers. But for a toy app like this, it seemed sufficient to make a folder of helper functions, which I've included in [src/logic](src/logic). I organized these functions conceptually - utils (general functions), task (functions related to tasks or list of tasks), and status (an enum for representing task status)
* The write-up did not include information about the "All Groups" button in the sample UI, so I made my own decisions. I wrote my app such that by default, all groups display in the right panel. When the user clicks a group in the left panel, the right panel is filtered to just that group - the "All Groups" button clears the filter.

# Todos / Potential Improvements
* more responsive layout
* test React app rendering, not just functions
