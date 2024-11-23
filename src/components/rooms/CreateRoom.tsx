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
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const CreateRoom = () => {
    const dispatch = useDispatch();
    const token = Cookies.get('token');
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

        const isValid = formData.videos.every(video => {
            const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
            return video.title && urlPattern.test(video.url);
        });

        if (!isValid) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all video fields (title and URL) with valid information.',
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

    const handleParticipantsChange = (e: SelectChangeEvent<typeof formData.participants>) => {
        const { target: { value } } = e;
        setFormData({
            ...formData,
            participants: typeof value === 'string' ? value.split(',') : value,
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await path.get('/User/Users');
                setUsers(response.data);
                dispatch(setUsers(response.data));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-lg p-4 max-w-md w-full">
                <h2 className="text-lg font-bold text-gray-700 text-center mb-4">Create New Room</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <TextField
                        fullWidth
                        label="Room Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                    />

                    <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Videos</h3>
                        {formData.videos.map((video, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <TextField
                                    label="Title"
                                    value={video.title}
                                    onChange={(e) => handleInputChange(e, index, 'title')}
                                    variant="outlined"
                                    size="small"
                                    className="flex-grow"
                                />
                                <TextField
                                    label="URL"
                                    value={video.url}
                                    onChange={(e) => handleInputChange(e, index, 'url')}
                                    variant="outlined"
                                    size="small"
                                    className="flex-grow"
                                />
                            </div>
                        ))}
                        <Button
                            onClick={addVideo}
                            size="small"
                            variant="outlined"
                            className="text-xs"
                        >
                            + Add Video
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <TextField
                            fullWidth
                            label="Start Time"
                            name="startTime"
                            type="datetime-local"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            fullWidth
                            label="End Time"
                            name="endTime"
                            type="datetime-local"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size="small"
                        />
                    </div>

                    <div>
                        <label htmlFor="participants" className="text-sm font-medium text-gray-600">Participants</label>
                        <Select
                            multiple
                            value={formData.participants}
                            onChange={handleParticipantsChange}
                            renderValue={(selected) => selected.join(', ')}
                            fullWidth
                            className="mt-1 text-sm"
                        >
                            {users?.map((user: any) => (
                                <MenuItem key={user.id} value={user.id}>
                                    <Checkbox checked={formData.participants.indexOf(user.id) > -1} />
                                    <ListItemText primary={user.username} />
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="py-2"
                    >
                        Create Room
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;
