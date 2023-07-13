import { useMemo, Fragment } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { blue, red } from '@mui/material/colors';
import { CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ButtonAppBar from './components/ButtonAppBar';
// import OfflineToast from './components/OfflineToast';
import ExperimentalRibbon from './components/ExperimentalRibbon';
import CookieBanner from './components/CookieBanner';

import { useOnlineStatus } from './components/useOnlineStatus';
import { useAuthState } from './components/useAuthState';

import Home from './views/Home';
import About from './views/About';
import Add from './views/Add';
import Edit from './views/Edit';
import Incoming from './views/Incoming';
import NoMatch from './views/NoMatch';
import Delivered from './views/Delivered';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Forgot from './views/Forgot';
import Profile from './views/Profile';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  const uid = useAuthState();
  const isOnline = useOnlineStatus();

  return (
    <Routes>
      <Route path="/" element={<Layout uid={uid} isOnline={isOnline} />}>
        <Route index element={<Home />} />
        <Route path="/incoming" element={<Incoming uid={uid} isOnline={isOnline} />} />
        <Route path="/delivered" element={<Delivered uid={uid} isOnline={isOnline} />} />
        <Route path="/add" element={<Add uid={uid} isOnline={isOnline} />} />
        <Route path="/edit/:kind/:id" element={<Edit uid={uid} isOnline={isOnline} />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn uid={uid} isOnline={isOnline} />} />
        <Route path="/signup" element={<SignUp uid={uid} isOnline={isOnline} />} />
        <Route path="/forgot" element={<Forgot isOnline={isOnline} />} />
        <Route path="/profile" element={<Profile uid={uid} isOnline={isOnline} />} />
        <Route path="*" element={<NoMatch uid={uid} />} />
      </Route>
    </Routes>
  );
}



function Layout(props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        rowOverdue: prefersDarkMode ? 'rgb(22, 11, 11)' : red[50],
        rowToday: prefersDarkMode ? 'rgb(7, 19, 24)' : blue[50],
     },
    }), [prefersDarkMode]);

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ExperimentalRibbon />
        <ButtonAppBar uid={props.uid} isOnline={props.isOnline} />
        <Toolbar />
        <Outlet />
        <CookieBanner />
        {/* <OfflineToast isOnline={props.isOnline} /> */}
      </ThemeProvider>
    </Fragment>
  );
}
