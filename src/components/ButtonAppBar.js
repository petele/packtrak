import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import { signOut } from '../helpers/fbHelper';

export default function ButtonAppBar({uid}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isSignedIn = uid !== null & uid !== -1;
  const signInOutLabel = isSignedIn ? 'Sign Out' : 'Sign In';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function clickSignInOut() {
    closeMenu();
    if (isSignedIn) {
      signOut();
      navigate('/', {replace: true});
    }
    navigate('/signin', {replace: true});
  }

  const handleClose = () => {
    closeMenu();
  };

  const closeMenu = () => {
    setAnchorEl(null);
  }

  const baseTabStyle = {
    color: 'inherit',
    display: 'block',
    borderRadius: 0,
    paddingTop: '20px',
    marginBottom: 0,
    paddingBottom: '16px',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
  };

  const curPath = window.location.pathname;
  const incomingStyle = Object.assign({}, baseTabStyle);
  if (curPath.startsWith('/incoming')) {
    incomingStyle.borderBottomColor = 'inherit';
  }
  const deliveredStyle = Object.assign({}, baseTabStyle);
  if (curPath.startsWith('/delivered')) {
    deliveredStyle.borderBottomColor = 'inherit';
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PackTrak
          </Typography>
          <Button
            component={Link}
            to="/incoming"
            sx={incomingStyle}>
            Incoming
          </Button>
          <Button
            component={Link}
            to="/delivered"
            sx={deliveredStyle}>
            Delivered
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} onClick={closeMenu} to="/profile">Profile</MenuItem>
              <MenuItem component={Link} onClick={closeMenu} to="/about">About PackTrak</MenuItem>
              <MenuItem onClick={clickSignInOut}>{signInOutLabel}</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
