import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './store/cameraSlice';

const store = configureStore({
  reducer: {
    camera: cameraReducer,
  },
});

export default store;
