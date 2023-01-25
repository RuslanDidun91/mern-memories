import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';


const App = () => {

  return (
    <Container maxWidth='lg'>
      <Navbar/>
      <Home/>
    </Container>
  )
}

export default App;