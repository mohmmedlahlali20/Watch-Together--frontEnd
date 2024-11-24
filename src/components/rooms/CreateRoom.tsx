import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../redux/slice/room/roomSlice.ts';
import path from '../../axios/axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import { Select, MenuItem, Checkbox, ListItemText, Dialog, DialogContent, DialogActions } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const CreateRoom = () => {
    const dispatch = useDispatch();
    const token = Cookies.get('token')!;
    const user = jwtDecode<{ userId: string }>(token);
    const userId = user.userId;

    const [formData, setFormData] = useState({
        name: '',
        owner: userId,
        videos: [{ title: '', url: '' }],
        startTime: '',
        endTime: '',
        participants: [],
    });

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await path.post('/rooms/create', formData);
            dispatch(addRoom(response.data));

            Swal.fire({
                title: 'Room Created!',
                text: 'Your room has been successfully created.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Reset the form
            setFormData({
                name: '',
                owner: userId,
                videos: [{ title: '', url: '' }],
                startTime: '',
                endTime: '',
                participants: [],
            });

            setIsModalOpen(false);
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

    const handleParticipantsChange = (e: SelectChangeEvent<string[]>) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            participants: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await path.get('/User/Users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {/* Button to open the modal */}
            <Button variant="contained" color="primary" onClick={toggleModal}>
                Create New Room
            </Button>

            {/* Modal */}
            <Dialog open={isModalOpen} onClose={toggleModal} fullWidth maxWidth="sm">
                <DialogContent>
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
                            <label htmlFor="participants" className="text-sm font-medium text-gray-600">
                                Participants
                            </label>
                            <Select
                                multiple
                                value={formData.participants}
                                onChange={handleParticipantsChange}
                                renderValue={(selected) => selected.join(', ')}
                                fullWidth
                                className="mt-1 text-sm"
                            >
                                {users?.map((user: any) => (
                                    <MenuItem key={user._id} value={user.username}>
                                        <Checkbox checked={formData.participants.indexOf(user._id) > -1} />
                                        <ListItemText primary={user.username} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleModal} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                        Create Room
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateRoom;
