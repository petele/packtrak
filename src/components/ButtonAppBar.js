import * as React from 'react';
import { useNavigate } from 'react-router-dom';

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

import './ButtonAppBar.css';

import { signOut } from '../helpers/fbHelper';

export default function ButtonAppBar(props) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const curPath = window.location.pathname;
  const isIncoming = curPath.startsWith('/incoming') ? 'active' : '';
  const isDelivered = curPath.startsWith('/delivered') ? 'active' : '';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const clickSignOut = () => {
    signOut();
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
          {props.uid && (
            <Button
              href="/incoming"
              className={isIncoming}
              sx={{ my: 2, color: 'white', display: 'block' }}>
              Incoming
            </Button>
          )}
          {props.uid && (
            <Button
              href="/delivered"
              className={isDelivered}
              sx={{ my: 2, color: 'white', display: 'block' }}>
              Delivered
            </Button>
          )}

          <Box sx={{ flexGrow: 1 }}></Box>
          {!props.uid && (
            <Button
            href="/signin"
            sx={{ my: 2, color: 'white', display: 'block' }}>
            Sign In
          </Button>
          )}
          {props.uid && (
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
                <MenuItem component="a" href="/profile">Profile</MenuItem>
                <MenuItem onClick={clickSignOut}>Sign Out</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
