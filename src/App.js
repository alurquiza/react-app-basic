import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home'
import Posts from './components/Posts'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/posts/:userid' element={<Posts />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;