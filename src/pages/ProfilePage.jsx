import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../api/users';
import { Container, Typography, Paper, CircularProgress, Box } from '@mui/material';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Container component="main" maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Typography>User not found.</Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>User Profile</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Username: {user.username}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          {/* Add more user details as needed */}
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;