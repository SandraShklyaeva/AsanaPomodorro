import React from 'react';
import ProjectItem from './ProjectItem';

export default class Project extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleSelectItem(item) {
    this.props.selectItem({
      project: this.props.project.id,
      todo: item
    });
  }

  handleDeleteItem(item) {
    this.props.deleteItem({
      project: this.props.project.id,
      todo: item
    });
  }

  render() {
    return (
      <div>
        <h4>{this.props.project.id}</h4>
        <ul>
          {this.props.project.todos.map(function(item, i) {
            return (
              <ProjectItem
                key={i}
                itemId={item.gid}
                name={item.name}
                selectItem={this.handleSelectItem}
                deleteItem={this.handleDeleteItem}
              />
            );
          }, this)}
        </ul>
      </div>
    );
  }
}
