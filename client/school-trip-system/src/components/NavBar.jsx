import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar  position="sticky" >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{
            cursor: 'pointer',
            fontFamily: '"M PLUS Rounded 1c", sans-serif',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '1px',
            textAlign: 'center',
            width: '100%',
          }}
          onClick={() => navigate('/')}
        >
          🔸🔸🔸 מערכת ניהול טיול שנתי - בנות משה 🔸🔸🔸
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;