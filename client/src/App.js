import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddNews from './components/AddNews';
import EditNews from './components/EditNews';
import Home from './components/Home';

const App = () => {

  return (
   <>
   <Navbar/>
   <Routes>
    <Route path="/home" element={<Home/>}/> 
    <Route path="/" element={<Home/>}/> 
    <Route path="/add_news" element={<AddNews/>}/>
    <Route path="/edit_news" element={<EditNews/>}/>
   </Routes>
   </>
  );
};

export default App;
