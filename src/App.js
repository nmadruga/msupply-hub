import React, { Component } from 'react';
import mySaga from './sagas';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Main from './components/Main';

const store = configureStore();
store.runSaga(mySaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Main />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
