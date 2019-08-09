import React from 'react';
import './Circle.css';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ButtonBase from '@material-ui/core/ButtonBase';

class ProgressRing extends React.Component {
  constructor(props) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;

    this.countdownRef = React.createRef();
    this.countdownNumberRef = React.createRef();
  }

  componentDidMount() {
    const { radius } = this.props;
    this.countdownRef.current.style.width = radius * 2 + 'px';
    this.countdownRef.current.style.height = radius * 2 + 'px';
    this.countdownNumberRef.current.style.lineHeight = radius * 2 + 'px';
  }

  render() {
    const { radius, stroke, progress } = this.props;
    const strokeDashoffset =
      this.circumference - (progress / this.props.time) * this.circumference;

    const time = this.props.time - this.props.progress;
    const minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

    return (
      <div className='countdownWrapper'>
        {this.props.paused ? (
          <ButtonBase onClick={this.props.handleStart}>
            <PlayArrowIcon />
          </ButtonBase>
        ) : (
          <ButtonBase onClick={this.props.handlePause}>
            <PauseIcon />
          </ButtonBase>
        )}
        <div className='countdown' ref={this.countdownRef}>
          <div className='countdownPanel'>
            <Typography
              className='countdown-number'
              ref={this.countdownNumberRef}
              variant='h3'
            >
              {minutes + ':' + seconds}
            </Typography>
          </div>

          <svg
            className='countdownCircle'
            height={radius * 2}
            width={radius * 2}
          >
            <circle
              stroke='red'
              fill='transparent'
              strokeWidth={stroke}
              strokeDasharray={this.circumference + ' ' + this.circumference}
              style={{ strokeDashoffset: 0 }}
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke='black'
              fill='transparent'
              strokeWidth={stroke}
              strokeDasharray={this.circumference + ' ' + this.circumference}
              style={{ strokeDashoffset }}
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {this.props.paused ?
            <circle
              stroke='red'
              fill='grey'
              fill-opacity='0.7'
              strokeWidth={stroke}
              strokeDasharray={this.circumference + ' ' + this.circumference}
              style={{ strokeDashoffset: 0 }}
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            /> : ''}
          </svg>
        </div>
      </div>
    );
  }
}

export default ProgressRing;
