import {
    AUTH_USER
  } from '../constants.js';

const initialState = {
  user: null,
  //null -> use default workspace
  //all -> use all workspaces
  //number -> use particular workspace with given id
  workspace: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload.user
      };

    default:
      return state;
  }
}
export default reducer;
