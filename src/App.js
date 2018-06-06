import React, { Component } from 'react';
import './App.css';

import MainComponent from './MainComponent'

import mySaga from './sagas'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';

const store = configureStore();
store.runSaga(mySaga);

class App extends Component {
  render() {
    return <Provider store={store}>
     <MainComponent/>
     </Provider>
      }
}

export default App;