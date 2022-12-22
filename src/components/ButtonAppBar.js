import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function ButtonAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const clickSignOut = () => {
    console.log('click sign out');
    setAnchorEl(null);
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
          {!auth && (
            <IconButton
              size="large"
              href="/signin"
              aria-label="sign in"
              color="inherit">
              <AccountCircle />
            </IconButton>
          )}
          {auth && (
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
