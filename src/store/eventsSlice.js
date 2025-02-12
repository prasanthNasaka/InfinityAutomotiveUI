// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   events: [],  // To store all the events
//   selectedEvent: null,  // To store the currently selected event for editing
// };

// const eventsSlice = createSlice({
//   name: 'events',
//   initialState,
//   reducers: {
//     addEvent: (state, action) => {
//       state.events.push(action.payload);
//     },
//     setSelectedEvent: (state, action) => {
//       state.selectedEvent = action.payload;
//     },
//     updateEvent: (state, action) => {
//       const { index, updatedEvent } = action.payload;
//       state.events[index] = updatedEvent;
//     },
//     resetSelectedEvent: (state) => {
//       state.selectedEvent = null;
//     },
//   },
// });

// export const { addEvent, setSelectedEvent, updateEvent, resetSelectedEvent } = eventsSlice.actions;

// export default eventsSlice.reducer;


// eventsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],  // To store all the events
  selectedEvent: null,  // To store the currently selected event for editing
  eventDetails: [],  // State for handling event details
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    updateEvent: (state, action) => {
      const { index, updatedEvent } = action.payload;
      state.events[index] = updatedEvent;
      
      // Update event details if they exist
      const eventDetailIndex = state.eventDetails.findIndex(
        detail => detail.eventId === updatedEvent.id
      );
      
      if (eventDetailIndex !== -1) {
        state.eventDetails[eventDetailIndex] = {
          ...state.eventDetails[eventDetailIndex],
          ...updatedEvent.eventDetails
        };
      }
    },
    resetSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    setEventDetails: (state, action) => {
      state.eventDetails = action.payload;
    },
    addEventDetail: (state, action) => {
      state.eventDetails.push(action.payload);
    },
    deleteEventDetail: (state, action) => {
      state.eventDetails = state.eventDetails.filter((_, index) => index !== action.payload);
    },
    updateEventDetail: (state, action) => {
      const { index, updatedDetail } = action.payload;
      state.eventDetails[index] = updatedDetail;
    },
  },
});

export const {
  addEvent,
  setSelectedEvent,
  updateEvent,
  resetSelectedEvent,
  setEventDetails,
  addEventDetail,
  deleteEventDetail,
  updateEventDetail,
} = eventsSlice.actions;

export default eventsSlice.reducer;


