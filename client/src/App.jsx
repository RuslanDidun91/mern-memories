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
import PostDetails from './components/PostDetails/PostDetails';
import { useNavigate } from 'react-router-dom';


const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  return (
    <Router>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route index element={<Navigate to="/posts" />} />
          <Route path='/' exact element={<Home />} />
          <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts" />} />
          {/* <Route path="/auth" exact element={() => (!user ? <Auth /> : <Navigate to="/posts" />)} /> */}
          <Route path=":id" exact element={<PostDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;