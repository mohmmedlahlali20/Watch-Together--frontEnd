import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/auth/authSlice';
import roomReducer from '../slice/room/roomSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
