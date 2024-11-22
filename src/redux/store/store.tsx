import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/auth/authSlice';
import roomReducer from '../slice/room/roomSlice';
import userReducer from '../slice/users/usersSlice.ts';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
        user: userReducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
