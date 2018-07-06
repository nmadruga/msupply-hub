import React, { Component } from 'react';
import mySaga from './sagas';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './App.css';
import { Main } from './components';

const store = configureStore();
store.runSaga(mySaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
