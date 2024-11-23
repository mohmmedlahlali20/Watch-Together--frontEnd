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
    loginRequest,
    loginSuccess,
    loginFailure
} from '../../redux/slice/auth/authSlice.ts';
import path from '../../axios/axios.ts';
import Cookies from 'js-cookie';


const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            return;
        }

        dispatch(loginRequest());

        try {
            const response = await path.post('/auth/login', { email, password });
            console.log(response.data);

            const token = response.data.token;

            Cookies.set('token', token);

            dispatch(loginSuccess(response.data));
            navigate('/');
            navigate('/');
        } catch (err: any) {
            dispatch(loginFailure(err.message));
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(to right, #004d40, #00695c)',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 4,
                    backgroundColor: '#1e2a38',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                    }}
                >
                    Login
                </Typography>

                <form onSubmit={handleLogin}>
                    <Stack spacing={3}>
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
                                    backgroundColor: '#263547',
                                    color: '#ffffff',
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#cfd8dc',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4db6ac',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: '#00acc1',
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
                                    backgroundColor: '#263547',
                                    color: '#ffffff',
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#cfd8dc',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4db6ac',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                    borderColor: '#00acc1',
                                },
                            }}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 600,
                                padding: '12px 0',
                                textTransform: 'none',
                                backgroundColor: '#00acc1',
                                '&:hover': {
                                    backgroundColor: '#00838f',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
