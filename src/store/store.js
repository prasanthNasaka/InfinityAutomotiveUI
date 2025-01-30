import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from "../store/eventsSlice"

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;
