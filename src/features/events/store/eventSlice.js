// src/features/events/store/eventSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularEvents, fetchUpcomingEvents, fetchEvent, fetchFilteredEvents } from "./thunks";
import { popularEventsData, popularEventsCardData } from "@/utils/popularEventsData";
import { filteredEventsApi } from "@/utils/api";

// Initial state for event slice
const initialState = {
  popularItems: popularEventsData,
  upcomingEventsData: popularEventsCardData,
  filteredEvent: [],
  eventItem: {},
  status: "idle",
  error: null,
};

// Helper functions for handling state changes
const setPending = (state) => { state.status = "loading"; };
const setFulfilledPopular = (state, action) => { state.status = "succeeded"; state.popularItems = action.payload?.events; };
const setFulfilledUpcoming = (state, action) => { state.status = "succeeded"; state.upcomingEventsData = action.payload?.events; };
const setFulfilledEvent = (state, action) => { state.status = "succeeded"; state.eventItem = action.payload?.event; };
const setFulfilledFilter = (state, action) => {state.status = "succeeded"; state.filteredEvent = action.payload?.event; };
const setRejected = (state, action) => { state.status = "failed"; state.error = action.error.message; };

// Event slice definition
const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularEvents.pending, setPending)
      .addCase(fetchPopularEvents.fulfilled, setFulfilledPopular)
      .addCase(fetchPopularEvents.rejected, setRejected)
      .addCase(fetchUpcomingEvents.pending, setPending)
      .addCase(fetchUpcomingEvents.fulfilled, setFulfilledUpcoming)
      .addCase(fetchUpcomingEvents.rejected, setRejected)
      .addCase(fetchEvent.pending, setPending)
      .addCase(fetchEvent.fulfilled, setFulfilledEvent)
      .addCase(fetchEvent.rejected, setRejected)
      .addCase(fetchFilteredEvents.pending, setPending)
      .addCase(fetchFilteredEvents.fulfilled, setFulfilledFilter)
      .addCase(fetchFilteredEvents.rejected, setRejected)
  },
});

export default eventSlice.reducer;
