// App.js
import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRoute from './PrivateRoute';
import Navbar from './Pages/Navbar';
import { useContext } from 'react';
import HooksContext from './Context/HooksContext';
import Cart from './Pages/Cart'

function App() {
  const context = useContext(HooksContext);
  const { mode } = context;
  return (
    <>
    <Navbar/>
    <div className={`container-fluid w-100 bg-${mode ? 'light' : 'dark'} `} >
    
    <Routes>
     
      <Route path="/" element={<Login />} />
      <Route path='/home' element={<PrivateRoute Component = {Home} />} />
      <Route path='/my-cart' element={<PrivateRoute Component = {Cart} />} />
      


    </Routes>
    </div>
    </>
  );
}

export default App;
