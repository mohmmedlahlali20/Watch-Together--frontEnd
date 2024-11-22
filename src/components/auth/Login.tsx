import React, { useState } from 'react';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
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
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 min-h-screen flex justify-center items-center">
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 4,
                        borderRadius: 4,
                        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'white',
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
                        Login
                    </Typography>

                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
                                        borderRadius: '10px',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontWeight: 600,
                                        color: '#333',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: '#0288d1',
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
                                        borderRadius: '10px',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontWeight: 600,
                                        color: '#333',
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: '#0288d1',
                                    },
                                }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                sx={{
                                    borderRadius: '10px',
                                    fontWeight: 600,
                                    padding: '12px 0',
                                    textTransform: 'none',
                                    backgroundColor: '#0288d1',
                                    '&:hover': {
                                        backgroundColor: '#0277bd',
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>

                            {error && (
                                <Typography variant="body2" color="error" align="center" sx={{ marginTop: 2 }}>
                                    {error}
                                </Typography>
                            )}
                        </Stack>
                    </form>
                </Box>
            </Container>
        </div>
    );
}

export default Login;
