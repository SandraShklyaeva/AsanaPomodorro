import React from 'react';
import './ProjectItem.css';

export default class ProjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    this.props.selectItem({
        id: this.props.itemId,
        name: this.props.name
    });
  }

  handleDelete() {
    this.props.deleteItem(this.props.itemId);
  }

  render() {
    return (
      <li>
        <span className="todo" title="Click me to select" onClick={this.handleClick}>{this.props.name}</span>
        <button onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
}
