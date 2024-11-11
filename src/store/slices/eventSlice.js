import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/utils/api";
import {
  popularEventsCardData,
  popularEventsData,
} from "@/utils/popularEventsData";
import { eventInfoList } from "@/utils/eventInfoList";

// Async Thunk for Fetching Popular Events
export const fetchPopularEvents = createAsyncThunk(
  "events/fetchPopularEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "api/secure/readAllDocuments/PopularEvents"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for Fetching Upcoming Events
export const fetchUpcomingEvents = createAsyncThunk(
  "events/fetchUpcomingEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "api/secure/readAllDocuments/UpcomingEvents"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Async thunk for Fetching a Event

export const fetchEvent = createAsyncThunk(
  "events/fetchEvent",
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.post("api/secure/ReadDocument", {
        name,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Functions for each state
const setPending = (state) => {
  state.status = "loading";
};

const setFulfilledPopular = (state, action) => {
  state.status = "succeeded";
  state.popularItems = action.payload?.events;
};

const setFulfilledUpcoming = (state, action) => {
  state.status = "succeeded";
  state.upcomingEventsData = action.payload?.events;
};

const setFulfilledEvent = (state, action) => {
  state.status = "succeeded";
  state.eventItem = action.payload?.event;
};

const setRejected = (state, action) => {
  state.status = "failed";
  state.error = action.error.message;
};

// Event Slice
const eventSlice = createSlice({
  name: "event",
  initialState: {
    popularItems: popularEventsData,
    upcomingEventsData: popularEventsCardData,
    eventItem: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularEvents.pending, setPending)
      .addCase(fetchPopularEvents.fulfilled, setFulfilledPopular)
      .addCase(fetchPopularEvents.rejected, setRejected)
      .addCase(fetchEvent.pending, setPending)
      .addCase(fetchEvent.fulfilled, setFulfilledEvent)
      .addCase(fetchEvent.rejected, setRejected)
      .addCase(fetchUpcomingEvents.pending, setPending)
      .addCase(fetchUpcomingEvents.fulfilled, setFulfilledUpcoming)
      .addCase(fetchUpcomingEvents.rejected, setRejected);
  },
});

export default eventSlice.reducer;
