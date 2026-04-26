import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar  position="sticky"  >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={() => navigate('/')}
        >
          🔸🔸🟧🔸🔸
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;