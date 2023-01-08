import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import NewPage from './pages/New';


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {

  const theme = {
    primary: "#322153",
    secondary: "#6C63FF",
    background: "#F0F0F5",
    text: "#6C6C80",
    white: "#FFF"
  };

  return (
    <ThemeProvider theme={theme}>   
      <BrowserRouter>
      <Routes>
        <Route  path='/' element={<HomePage />} />
        <Route path='/new' element={<NewPage />}></Route>
      </Routes>
      </BrowserRouter> 
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
