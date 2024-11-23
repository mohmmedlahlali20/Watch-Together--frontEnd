import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
    },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
