import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store/store.tsx';
import path from '../../axios/axios.ts';
import { loginRequest, loginSuccess, loginFailure } from '../../redux/slice/auth/authSlice.ts';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state: RootState) => state.auth);

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
            dispatch(loginSuccess(response.data));
            Cookies.set('auth_token', response.data.token, { expires: 7, path: '/' });
            navigate('/dashboard');
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
                backgroundColor: '#f5f5f5', // Light background color
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
                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
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
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={loading}
                            sx={{
                                backgroundColor: '#6200ea',
                                '&:hover': { backgroundColor: '#3700b3' },
                                padding: '12px 0',
                                textTransform: 'none',
                            }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        {error && (
                            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

export default Login;
