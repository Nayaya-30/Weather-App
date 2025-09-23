import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../slices/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});