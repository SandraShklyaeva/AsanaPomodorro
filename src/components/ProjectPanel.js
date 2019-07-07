import React from 'react';
import Project from './Project';

export default class ProjectPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [
        {
          id: 'Project1',
          todos: ['Read JSDOcs', 'Continue ReactJS']
        },
        {
          id: 'Project2',
          todos: ['Finish Homework', 'Buy shiba']
        },
        {
          id: 'Project3',
          todos: ['Find new flat', 'Continue reading a book']
        }
      ]
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
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

  render() {
    return (
      <div>
        {this.state.projects.map(function(item) {
          return (
            <Project
              key={item.id}
              project={item}
              selectItem={this.handleSelectItem}
              deleteItem={this.handleDeleteItem}
            />
          );
        }, this)}
      </div>
    );
  }
}
