import React from 'react';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to the User Dashboard!
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary">
        Navigate through the application using the links above.
      </Typography>
    </Container>
  );
};

export default Home;