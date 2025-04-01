import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import Camera from './src/Camera';

export default function App() {
  return (
    <Provider store={store}>
      <Camera />
    </Provider>
  );
}
