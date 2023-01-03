import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { signOut } from 'firebase/auth';

import { auth } from '../helpers/fbHelper';


export default function ButtonAppBar(props) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const clickSignOut = () => {
    console.log('click sign out');
    signOut(auth);
    window.localStorage.removeItem('pktk_uid');
    setAnchorEl(null);
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            href="/incoming"
            sx={{ my: 2, color: 'white', display: 'block' }}>
            Incoming
          </Button>
          <Button
            href="/delivered"
            sx={{ my: 2, color: 'white', display: 'block' }}>
            Delivered
          </Button>

          <Box sx={{ flexGrow: 1 }}></Box>
          {!props.uid && (
            <IconButton
              size="large"
              href="/signin"
              aria-label="sign in"
              color="inherit">
              <AccountCircle />
            </IconButton>
          )}
          {props.uid && (
            <div>
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
                    <MenuItem component="a" href="/profile">Profile</MenuItem>
                    <MenuItem onClick={clickSignOut}>Sign Out</MenuItem>
                  </Menu>
                </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
