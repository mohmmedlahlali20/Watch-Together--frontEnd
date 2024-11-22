import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Room {
    _id: string;
    name: string;
    owner: string;
    videos: Video[];
    participants: string[];
    startTime: Date;
    endTime: Date;
}

interface Video {
    title: string;
    url: string;
}

interface RoomState {
    rooms: Room[];
}

const initialState: RoomState = {
    rooms: [],
};

const RoomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRoom: (state, action: PayloadAction<Room>) => {
            state.rooms.push(action.payload);
        },
        getAllRooms: (state, action: PayloadAction<Room[]>) => {
            state.rooms = action.payload;
        },
        getVideoByRoomId: (state, action: PayloadAction<string>) => {
            const roomId = action.payload;
            const room = state.rooms.find((room) => room._id === roomId);
            if (room) {
                return room.videos;
            }
            return [];
        },
    },
});

export const { addRoom, getAllRooms, getVideoByRoomId } = RoomSlice.actions;
export default RoomSlice.reducer;
