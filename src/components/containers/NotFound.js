import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';

const primary = blue[500]; // #f44336

export default function Error() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        Esta pagina não existe! Aperte o botão para voltar!
      </Typography>
      <Button variant="contained" onClick={(e) => navigate("/")}>Back Home</Button>
    </Box>
  );
}