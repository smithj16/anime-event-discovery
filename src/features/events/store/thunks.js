// src/features/events/store/thunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { filteredEventsApi } from "@/utils/api";
import * as api from "@/utils/api";

// Fetch popular events
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

// Fetch upcoming events
export const fetchUpcomingEvents = createAsyncThunk(
  "events/fetchUpcomingEvents",
  async (filters, { rejectWithValue }) => {
    try {
      // Construct query string from filters
      const queryString = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          if (value) acc[key] = value; // Add only non-null values
          return acc;
        }, {})
      ).toString();

      const response = await api.get(
        `api/secure/readAllDocuments/UpcomingEvents?${queryString}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch individual event
export const fetchEvent = createAsyncThunk(
  "events/fetchEvent",
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.post("api/secure/ReadDocument", { name });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch filtered events
export const fetchFilteredEvents = createAsyncThunk(
  "events/fetchFilteredEvents",
  async ({ filters, token }, { rejectWithValue }) => {
    try {
      const data = await filteredEventsApi(filters, token); 
      console.log("API Response:", data);
      return data;
    } catch (error) {
      console.error("FetchFilteredEvents Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);