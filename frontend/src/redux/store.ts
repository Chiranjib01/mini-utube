import { configureStore } from '@reduxjs/toolkit';
// import reducers here
import darkModeReducer from './slices/darkMode';
import userReducer from './slices/user';
import showMessageReducer from './slices/message';
import videosApi from './slices/videos';

export const store = configureStore({
  reducer: {
    [videosApi.reducerPath]: videosApi.reducer,
    darkMode: darkModeReducer,
    user: userReducer,
    message: showMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
