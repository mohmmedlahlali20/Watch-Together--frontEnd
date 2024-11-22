import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../redux/slice/room/roomSlice.ts';
import path from '../../axios/axios';


const CreateRoom = () => {
    const dispatch = useDispatch();

    // State for form inputs
    const [formData, setFormData] = useState({
        name: "",
        owner: "",
        videos: [{ title: "", url: "" }],
        startTime: "",
        endTime: "",
        participants: [""],
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: string) => {
        const { name, value } = e.target;

        if (name.startsWith("videos") && field !== undefined && index !== undefined) {
            const updatedVideos = [...formData.videos];
            updatedVideos[index][field] = value;
            setFormData({ ...formData, videos: updatedVideos });
        } else if (name === "participants") {
            setFormData({ ...formData, participants: [value] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await path.post("/rooms", formData);
            dispatch(addRoom(response.data));
            alert("Room created successfully!");
        } catch (error) {
            console.error("Error creating room:", error);
        }
    };

    // Add a new video input
    const addVideo = () => {
        setFormData({
            ...formData,
            videos: [...formData.videos, { title: "", url: "" }],
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-700">
            <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-white text-center mb-6">Create a New Room</h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Room Name */}
                    <div>
                        <TextField
                            fullWidth
                            label="Room Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            variant="outlined"
                            className="bg-white rounded-md"
                        />
                    </div>

                    {/* Owner */}
                    <div>
                        <TextField
                            fullWidth
                            label="Owner ID"
                            name="owner"
                            value={formData.owner}
                            onChange={handleInputChange}
                            variant="outlined"
                            className="bg-white rounded-md"
                        />
                    </div>

                    {/* Videos */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white">Videos</h2>
                        {formData.videos.map((video, index) => (
                            <div key={index} className="flex gap-4">
                                <TextField
                                    label="Video Title"
                                    value={video.title}
                                    onChange={(e) => handleInputChange(e, index, "title")}
                                    variant="outlined"
                                    className="bg-white rounded-md"
                                />
                                <TextField
                                    label="Video URL"
                                    value={video.url}
                                    onChange={(e) => handleInputChange(e, index, "url")}
                                    variant="outlined"
                                    className="bg-white rounded-md"
                                />
                            </div>
                        ))}
                        <Button variant="outlined" onClick={addVideo} className="text-white border-white hover:bg-white hover:text-purple-500">
                            Add Video
                        </Button>
                    </div>

                    {/* Start Time */}
                    <div>
                        <TextField
                            fullWidth
                            label="Start Time"
                            name="startTime"
                            type="datetime-local"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            className="bg-white rounded-md"
                        />
                    </div>

                    {/* End Time */}
                    <div>
                        <TextField
                            fullWidth
                            label="End Time"
                            name="endTime"
                            type="datetime-local"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            className="bg-white rounded-md"
                        />
                    </div>

                    {/* Participants */}
                    <div>
                        <TextField
                            fullWidth
                            label="Participants (Comma-separated User IDs)"
                            name="participants"
                            value={formData.participants.join(",")}
                            onChange={handleInputChange}
                            variant="outlined"
                            className="bg-white rounded-md"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-700 text-white hover:from-indigo-700 hover:to-purple-500"
                    >
                        Create Room
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;

