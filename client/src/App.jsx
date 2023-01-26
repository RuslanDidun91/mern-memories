import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Auth from './components/Auth/Auth';


const App = () => {

  return (
    <Router>
      <Container maxWidth='lg'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;