import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#3f51b5' }}>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#555' }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" paragraph sx={{ maxWidth: '600px', color: '#777' }}>
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{
          marginTop: '20px',
          padding: '10px 30px',
          fontSize: '1.1rem',
          borderRadius: '25px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFound;