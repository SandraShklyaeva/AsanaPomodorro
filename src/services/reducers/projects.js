import {
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_TASKS_BEGIN,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE
} from '../actions.js';

const initialState = {
  projects: [],
  loading: false,
  error: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROJECTS_BEGIN, FETCH_TASKS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };


    case FETCH_TASKS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      console.log('PAYLOAD', action.payload);
      let tasksUpdated = state.projects.map(function(project) {
        if (project.id === action.payload.data.project.id) {
          project.todos = action.payload.data.tasks
        }
        return project;
      });
      console.log('RESULT', tasksUpdated);
      return {
        ...state,
        loading: false,
        projects: tasksUpdated
      };


    case FETCH_PROJECTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server

      let projectsUpdated = action.payload.projects.map(function(project) {
        project.todos = action.payload.projects;
        return {
            id: project.id,
            todos: [],
            name: project.name
        };
      });
      return {
        ...state,
        loading: false,
        projects: projectsUpdated
      };

    case FETCH_PROJECTS_FAILURE, FETCH_TASKS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        projects: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
export default rootReducer;
