const initialState = {
  durations: {
    workSession: 20,
    shortBreakSession: 5,
    longBreakSession: 15,
    goal: 8,
    goalUntilLongBreak: 4
  },
  theme: 'default',
  timerType: '',
  sound: '',
  autoBreakSessions: true,
  autoWorkSessions: false
};

function settingsReducer(state = initialState, action) {
  return state;
}

export default settingsReducer;
