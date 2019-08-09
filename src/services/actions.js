import { ADD_ARTICLE, FETCH_TASKS, AUTH_USER } from './constants';
import asana from 'asana';
// replace with your personal access token.
var personalAccessToken = '0/bd9753eded967d6eb74493eca899b2e7';

// Construct an Asana client
var client = asana.Client.create().useAccessToken(personalAccessToken);

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export const FETCH_TASKS_BEGIN = 'FETCH_TASKS_BEGIN';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const FETCH_PROJECTS_BEGIN = 'FETCH_PROJECTS_BEGIN';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';


export const fetchProjectsBegin = () => ({
  type: FETCH_PROJECTS_BEGIN
});

export const fetchProjectsSuccess = projects => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: { projects }
});

export const fetchProjectsFailure = error => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: { error }
});

export const fetchTasksBegin = () => ({
  type: FETCH_TASKS_BEGIN
});

export const fetchTasksSuccess = data => ({
  type: FETCH_TASKS_SUCCESS,
  payload: { data }
});

export const fetchTasksFailure = error => ({
  type: FETCH_TASKS_FAILURE,
  payload: { error }
});

export const authUserSuccess = user => ({
   type: AUTH_USER,
   payload: {user}
});

export function authUser() {
  return dispatch => {
    return client.users
          .me()
          .then(user => {
            console.log(user);
            dispatch(authUserSuccess(user))
          })
  }
}

export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch(fetchProjectsBegin());
    const user = getState().user.user;
    console.log('KEK', user);

    return client.projects.findAll({
        workspace: user.workspaces[2].gid
      })
      .then(response => {
        console.log(response);
        dispatch(fetchProjectsSuccess(response.data));
        return response.data;
      })
      .catch(e => {
        dispatch(fetchProjectsFailure(e));
      });
  };
}

export function fetchTasks(project) {
  console.log('I AM PROJECT1',project);
  return (dispatch, getState) => {
    const user = getState().user.user;
    dispatch(fetchTasksBegin());
    return client.tasks.findAll({
      project: project.id,
      completed_since: 'now',
      opt_fields: 'id,name'
    })
      .then(response => {
        console.log(response);
        // There may be more pages of data, we could stream or return a promise
        // to request those here - for now, let's just return the first page
        // of items.
        dispatch(fetchTasksSuccess({
          project: project,
          tasks: response.data
        }));
        return response.data;
      })
      .catch(e => {
        dispatch(fetchTasksFailure(e));
      });
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
