import * as React from 'react';
import { Fragment } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { blue, red } from '@mui/material/colors';
import { CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { onAuthStateChanged } from 'firebase/auth';

import ButtonAppBar from './components/ButtonAppBar';
import ExperimentalRibbon from './components/ExperimentalRibbon';

import { auth } from './helpers/fbHelper';

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
  const [uid, setUID] = React.useState(-1);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUID(user.uid);
      } else {
        setUID(null);
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout uid={uid} />}>
        <Route index element={<Home />} />
        <Route path="/incoming" element={<Incoming uid={uid} />} />
        <Route path="/delivered" element={<Delivered uid={uid} />} />
        <Route path="/add" element={<Add uid={uid} />} />
        <Route path="/edit/:kind/:id" element={<Edit uid={uid} />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn uid={uid} />} />
        <Route path="/signup" element={<SignUp uid={uid} />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/profile" element={<Profile uid={uid} />} />
        <Route path="*" element={<NoMatch uid={uid} />} />
      </Route>
    </Routes>
  );
}



function Layout(props) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(() =>
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
        <ButtonAppBar uid={props.uid} />
        <Toolbar />
        <Outlet />
      </ThemeProvider>
    </Fragment>
  );
}
