import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },

    },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
