import { Fragment } from 'react';
import {Routes, Route, Outlet} from "react-router-dom";

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

import { CssBaseline } from '@mui/material';
import ButtonAppBar from './components/ButtonAppBar';

import './App.css';

export default function App() {
  const uid = 'fakeUser';

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/incoming" element={<Incoming uid={uid} />} />
        <Route path="/delivered" element={<Delivered uid={uid} />} />
        <Route path="/add" element={<Add uid={uid} />} />
        <Route path="/edit/:kind/:id" element={<Edit uid={uid} />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/profile" element={<Profile uid={uid} />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Outlet />
    </Fragment>
  );
}
