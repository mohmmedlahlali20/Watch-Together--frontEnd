import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerRequest, registerSuccess, registerFailure } from '../../redux/slice/auth/authSlice.ts';
import path from '../../axios/axios.ts';

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');

        if (!firstName) {
            setFirstNameError('First Name is required');
            return;
        }
        if (!lastName) {
            setLastNameError('Last Name is required');
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
            const response = await path.post('/auth/register', { firstName, lastName, email, password });
            dispatch(registerSuccess(response.data));
            navigate('/login');
        } catch (err: any) {
            dispatch(registerFailure(err.message));
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
                        Create Account
                    </Typography>

                    <form onSubmit={handleRegister} style={{ width: '100%' }}>
                        <Stack spacing={3}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={!!firstNameError}
                                helperText={firstNameError}
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
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={!!lastNameError}
                                helperText={lastNameError}
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
                            >
                                Register
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default Register;
