// src/features/events/store/thunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "@/utils/api";

// Fetch popular events
export const fetchPopularEvents = createAsyncThunk(
  "events/fetchPopularEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/secure/readAllDocuments/PopularEvents");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch upcoming events
export const fetchUpcomingEvents = createAsyncThunk(
  "events/fetchUpcomingEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("api/secure/readAllDocuments/UpcomingEvents");
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
