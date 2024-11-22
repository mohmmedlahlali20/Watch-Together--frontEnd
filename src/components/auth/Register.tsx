import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Stack
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    registerRequest,
    registerSuccess,
    registerFailure
} from '../../redux/slice/auth/authSlice.ts';
import path from '../../axios/axios.ts';

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        if (!username) {
            setUsernameError('Username is required');
            return;
        }
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            return;
        }

        dispatch(registerRequest());

        try {
            const response = await path.post('/auth/register', { username, email, password });
            console.log(response.data);
            dispatch(registerSuccess(response.data));
            navigate('/login');
        } catch (err: any) {
            dispatch(registerFailure(err.message));
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
                    Create a New Account
                </Typography>

                <form onSubmit={handleRegister}>
                    <Stack spacing={3}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={!!usernameError}
                            helperText={usernameError}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: '#f7f7f7',
                                },
                                '& .MuiInputLabel-root': {
                                    fontWeight: 600,
                                    color: '#555',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: '#4B92FF',
                                },
                            }}
                        />

                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: '#f7f7f7',
                                },
                                '& .MuiInputLabel-root': {
                                    fontWeight: 600,
                                    color: '#555',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: '#4B92FF',
                                },
                            }}
                        />

                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: '#f7f7f7',
                                },
                                '& .MuiInputLabel-root': {
                                    fontWeight: 600,
                                    color: '#555',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: '#4B92FF',
                                },
                            }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 600,
                                padding: '12px 0',
                                textTransform: 'none',
                                backgroundColor: '#4B92FF',
                                '&:hover': {
                                    backgroundColor: '#3c7acc',
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
};

export default Register;
