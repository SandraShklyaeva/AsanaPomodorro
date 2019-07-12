import React from 'react';
import './Timer.css';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pomodorros: 0,
      time: 0,
      start: 0,
      duration: 40,
      isStarted: false,
      gradient: {}
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleResume = this.handleResume.bind(this);
  }

  handleResume() {
    this.setState({
      pomodorros: this.state.pomodorros + 1,
      time: 0,
      start: 0,
      duration: 40,
      isStarted: false,
      gradient: {}
    });
  }

  handleStart(event) {
    if (this.state.isStarted) {
      //stop timer
      this.setState({
        //time: 0,
        //gradient: {}
      });
      clearInterval(this.timer);
    } else {
      //start timer
      this.timer = setInterval(() => {
        if (this.state.time === this.state.duration) {
          this.handleStart();
        } else {
          var x = (100 * this.state.time) / this.state.duration;
          this.setState({
            time: this.state.time + 1,
            gradient: {
              background:
                'linear-gradient(to left, #3240ff 0%, #5e28ff ' +
                x +
                '%, #ffffff ' +
                x +
                '%, #ffffff 100%)'
            }
          });
        }
      }, 2000);
    }
    this.setState({
      isStarted: !this.state.isStarted
    });
  }

  render() {
    return (
      <div className='pomodorro' style={this.state.gradient}>
        <div>Pomodorro's current time: {this.state.time}</div>
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handleResume}>Resume</button>
        <div>Count of previous pomoddoros: {this.state.pomodorros}</div>
        {this.props.item && (
          <div>
            <span className='todoActive'>
              Current item: {this.props.item.project}{' '}
              ({this.props.item.todo.name})
            </span>
          </div>
        )}
      </div>
    );
  }
}
