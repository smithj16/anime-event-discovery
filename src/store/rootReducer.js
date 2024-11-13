import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice'; 
import eventsReducer from '@/features/events/store/eventSlice';
import newsReducer from '@/store/slices/newsSlice';

const rootReducer = combineReducers({
  user: userReducer, 
  event: eventsReducer,
  news: newsReducer
});

export default rootReducer;