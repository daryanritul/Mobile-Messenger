import React from 'react';
import App from './App';

import {Provider, useDispatch} from 'react-redux';
import store from './src/store/store';

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
