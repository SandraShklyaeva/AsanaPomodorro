import React from 'react';
import Project from './Project';
import { connect } from 'react-redux';
import { addArticle, fetchProjects, fetchTasks } from '../services/actions';

const mapStateToProps = state => {
  return {
    articles: state.root.articles,
    projects: state.projects.projects,
    loading: state.projects.loading,
    error: state.projects.error
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article)),
    fetchProjects: () => dispatch(fetchProjects()),
    fetchTasks: (project) => dispatch(fetchTasks(project))
  };
}

class ConnectedProjectPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleHelloClick = this.handleHelloClick.bind(this);
    this.handleFetchTasks = this.handleFetchTasks.bind(this);
  }

  componentDidMount() {
    this.props.fetchProjects();
    //this.props.fetchProducts();
    /*client.users
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
      });*/
  }

  handleSelectItem(item) {
    this.props.selectItem(item);
  }

  handleDeleteItem(item) {
    let projectsUpdated = this.state.projects.slice(0).map(function(project) {
      if (project.id === item.project) {
        project.todos = project.todos.filter(
          (todo, index) => index !== item.todo
        );
      }
      return project;
    });
    this.setState({
      projects: projectsUpdated
    });
  }

  handleHelloClick() {
    this.props.addArticle({ title: 'TITLE', id: 'ID' });
  }

  handleFetchTasks(project) {
    console.log('I AM PROJECT',project);
    this.props.fetchTasks(project);
  }

  render() {
    return (
      <div>
        <div>
          <div onClick={this.handleHelloClick}>Hello</div>
          {this.props.articles.map(el => (
            <div className='list-group-item' key={el.id}>
              {el.title}
            </div>
          ))}
        </div>
        {this.props.loading ? (
          <div>I am Loading</div>
        ) : (
          this.props.projects.map(function(item) {
            return (
              <Project
                key={item.id}
                project={item}
                selectItem={this.handleSelectItem}
                deleteItem={this.handleDeleteItem}
                fetchTasks={this.handleFetchTasks}
              />
            );
          }, this)
        )}
      </div>
    );
  }
}

const ProjectPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedProjectPanel);
export default ProjectPanel;
