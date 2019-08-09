import React from 'react';
import { connect } from 'react-redux';

class ConnectedSettings extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h3>Durations</h3>
          <div>
              Work Session {this.props.settings.durations.workSession}
          </div>
          <div>
              Short Break {this.props.settings.durations.shortBreakSession}
          </div>
          <div>
              Long Break {this.props.settings.durations.longBreakSession}
          </div>
          <div>
              Daily Goal {this.props.settings.durations.goal}
          </div>
        </div>
        <div>
          <h3>Theme</h3>
          <div>
              {this.props.settings.theme}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSettings);
export default Settings;
