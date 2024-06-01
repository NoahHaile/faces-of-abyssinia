// pages/quiz.js
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, LinearProgress, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import 'chart.js/auto'; // Import chart.js



const Quiz = () => {
  return(
    <Container>
      <Typography variant='h2' sx={{textAlign: 'center'}}>Coming soon</Typography>
      <Box sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', mt: 5}}>
      <CircularProgress />
      </Box>
    </Container>
  )
};

export default Quiz;
