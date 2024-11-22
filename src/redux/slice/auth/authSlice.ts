import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: {
        email: string;
        userId: string;
    } | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(
            state,
            action: PayloadAction<{ user: { email: string; userId: string }; token: string }>
        ) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        registerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(
            state,
            action: PayloadAction<{ user: { email: string; userId: string }; token: string }>
        ) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
