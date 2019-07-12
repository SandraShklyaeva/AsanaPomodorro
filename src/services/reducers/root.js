import { ADD_ARTICLE, FETCH_TASKS } from '../constants';
import projects from "./projects";
import { combineReducers } from "redux";

const initialState = {
  articles: []
};

function root(state = initialState, action) {
 /* if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  } else if (action.type === ADD_ARTICLE) {
    client.users
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
        return response.data;
      })
      .then(list => {
        let projectsUpdated = this.state.projects
          .slice(0)
          .map(function(project) {
            project.todos = list;
            return project;
          });
        this.setState({
          projects: projectsUpdated
        });
        console.log(list);
      })
      .catch(e => {
        console.log(e);
      });
  }*/
  return state;
}

export default combineReducers({
  projects,
  root
});