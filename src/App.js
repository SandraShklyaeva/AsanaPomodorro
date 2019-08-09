import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Circle from './components/Circle';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { authUser } from './services/actions';

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    authUser: () => dispatch(authUser())
  };
}

class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: null,
      isOpen: false,
      progress: 0,
      time: 10,
      paused: false,
      count: 0
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  componentDidMount() {
    this.props.authUser();
    this.handleStart();
  }

  handleSelectItem(item) {
    this.setState({
      currentItem: item
    });
  }

  handleStart() {
    this.setState({ paused: false });
    this.state.timer = setInterval(() => {
      this.setState({ progress: this.state.progress + 1 });
      if (this.state.progress === this.state.time) {
        this.handlePause();
        this.setState({ 
          count: this.state.count + 1, 
          progress: 0 
        });
      }
    }, 1000);
  }

  handlePause() {
    clearInterval(this.state.timer);
    this.setState({ paused: true });
  }

  render() {
    return (
      <Paper>
        <Circle
          radius={120}
          stroke={4}
          time={this.state.time}
          progress={this.state.progress}
          handleStart={this.handleStart}
          handlePause={this.handlePause}
          paused={this.state.paused}
        />
        Count: {this.state.count}
        <Navigation />
      </Paper>
    );
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedApp);
export default App;
