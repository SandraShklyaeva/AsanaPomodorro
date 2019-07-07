import React from 'react';
import Timer from './components/Timer';
import './App.css';
import ProjectPanel from './components/ProjectPanel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: null
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  handleSelectItem(item) {
    this.setState({
      currentItem: item
    });
  }

  render() {
    return (
      <div className='App'>
        <Timer item={this.state.currentItem} />
        <ProjectPanel selectItem={this.handleSelectItem} />
      </div>
    );
  }
}

export default App;
