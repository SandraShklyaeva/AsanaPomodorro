import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import ProjectPanel from './ProjectPanel';
import Settings from './Settings';
import Stats from './Stats';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  handleChange(event, value) {
    this.setState({ [value]: true });
  }

  closeDrawer = value => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    this.setState({ [value]: false });
  };

  render() {
    //const classes = useStyles();

    return (
      <div>
        <BottomNavigation value={this.state.value} onChange={this.handleChange}>
          <BottomNavigationAction
            label='Stats'
            value='stats'
            icon={<BarChartIcon />}
          />
          <BottomNavigationAction
            label='Projects'
            value='projects'
            icon={<ListIcon />}
          />
          <BottomNavigationAction
            label='Settings'
            value='settings'
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
        <Drawer
          anchor='bottom'
          open={this.state['stats']}
          onClose={this.closeDrawer('stats')}
        >
          <Stats />
        </Drawer>
        <Drawer
          anchor='bottom'
          open={this.state['projects']}
          onClose={this.closeDrawer('projects')}
        >
          <ProjectPanel selectItem={this.handleSelectItem} />
        </Drawer>
        <Drawer
          anchor='bottom'
          open={this.state['settings']}
          onClose={this.closeDrawer('settings')}
        >
          <Settings />
        </Drawer>
      </div>
    );
  }
}

export default Navigation;
