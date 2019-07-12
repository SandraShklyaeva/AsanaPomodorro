import { ADD_ARTICLE, FETCH_TASKS } from './constants';
import asana from 'asana';
// replace with your personal access token.
var personalAccessToken = '0/bd9753eded967d6eb74493eca899b2e7';

// Construct an Asana client
var client = asana.Client.create().useAccessToken(personalAccessToken);

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function fetchTasks(payload) {
  return { type: FETCH_TASKS, payload };
}

export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return client.users
      .me()
      .then(user => {
        console.log(user);
        const userId = user.id;
        // The user's "default" workspace is the first one in the list, though
        // any user can have multiple workspaces so you can't always assume this
        // is the one you want to work with.
        const workspaceId = user.workspaces[2].gid;
        console.log(workspaceId);
        return client.tasks.findAll({
          assignee: userId,
          workspace: workspaceId,
          opt_fields: 'id,name'
        });
      })
      .then(response => {
        console.log(response);
        // There may be more pages of data, we could stream or return a promise
        // to request those here - for now, let's just return the first page
        // of items.
        dispatch(fetchProductsSuccess(response.data));
        return response.data;
      })
      .catch(e => {
        dispatch(fetchProductsFailure(e));
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
