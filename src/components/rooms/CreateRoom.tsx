import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from '../../redux/slice/room/roomSlice.ts';
import { setUsers } from '../../redux/slice/users/usersSlice.ts';
import path from '../../axios/axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const CreateRoom = () => {
    const dispatch = useDispatch();
    const token = Cookies.get('auth_token');
    const user = jwtDecode(token);
    const userId = user.userId;

    const [formData, setFormData] = useState({
        name: '',
        owner: userId,
        videos: [{ title: '', url: '' }],
        startTime: '',
        endTime: '',
        participants: [],
    });

    const users = useSelector((state: any) => state.users);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = formData.videos.every(video => video.title && video.url);
        if (!isValid) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all video fields (title and URL).',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const response = await path.post('/rooms/create', formData);
            dispatch(addRoom(response.data));

            Swal.fire({
                title: 'Room Created!',
                text: 'Your room has been successfully created.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error('Error creating room:', error);

            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while creating the room.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number, field?: string) => {
        const { name, value } = e.target;

        if (field && typeof index === 'number') {
            const updatedVideos = [...formData.videos];
            updatedVideos[index][field] = value;
            setFormData({ ...formData, videos: updatedVideos });
        } else if (name === 'participants') {
            setFormData({
                ...formData,
                participants: [...formData.participants, value],
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addVideo = () => {
        setFormData({
            ...formData,
            videos: [...formData.videos, { title: '', url: '' }],
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await path.get('/User/Users');
                dispatch(setUsers(response.data));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-900 container mx-auto">
            <div className="bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-3xl">
                <h1 className="text-4xl font-bold text-white text-center mb-6">Create a New Room</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <TextField
                            fullWidth
                            label="Room Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            variant="outlined"
                            className="bg-white rounded-lg text-black shadow-md focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl text-white font-semibold">Videos</h2>
                        {formData.videos.map((video, index) => (
                            <div key={index} className="flex gap-4">
                                <TextField
                                    label="Video Title"
                                    value={video.title}
                                    onChange={(e) => handleInputChange(e, index, 'title')}
                                    variant="outlined"
                                    className="bg-white rounded-lg text-black shadow-md focus:ring-2 focus:ring-purple-500"
                                />
                                <TextField
                                    label="Video URL"
                                    value={video.url}
                                    onChange={(e) => handleInputChange(e, index, 'url')}
                                    variant="outlined"
                                    className="bg-white rounded-lg text-black shadow-md focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        ))}
                        <Button
                            variant="outlined"
                            onClick={addVideo}
                            className="text-white border-white hover:bg-white hover:text-purple-500 focus:ring-2 focus:ring-purple-500 mt-2"
                        >
                            Add Video
                        </Button>
                    </div>

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
                            className="bg-white rounded-lg text-black shadow-md focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

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
                            className="bg-white rounded-lg text-black shadow-md focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="participants" className="text-white font-semibold">
                            Participants
                        </label>
                        <select
                            name="participants"
                            value=""
                            onChange={handleInputChange}
                            className="w-full mt-2 bg-white text-black p-3 rounded-lg border shadow-md focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Participants</option>
                            {users?.map((user: any) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-500 focus:ring-2 focus:ring-purple-500"
                    >
                        Create Room
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;
