import React from 'react';
import { Container } from '@material-ui/core';

import { Switch, BrowserRouter, Route } from 'react-router-dom';
// import dotenv from 'dotenv';
// dotenv.config();
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import {GoogleOAuthProvider} from '@react-oauth/google';
const App = () => (
  
  <GoogleOAuthProvider clientId={"296450964659-nfvrj5vb4n6f2sogg5flintbpdaag2nk.apps.googleusercontent.com"}>
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
  </BrowserRouter>
  </GoogleOAuthProvider>

);

export default App;