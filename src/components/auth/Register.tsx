import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Stack } from '@mui/material';

const Register: React.FC = () => {

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

                    <form style={{ width: '100%' }}>
                        <Stack spacing={3}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
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
