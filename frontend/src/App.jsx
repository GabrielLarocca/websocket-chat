import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import Darkmode from 'darkmode-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const options = {
//   backgroundColor: '#fff',  // default: '#fff'
//   buttonColorDark: '#100f2c',  // default: '#100f2c'
//   buttonColorLight: '#fff', // default: '#fff'
//   label: '🌓', // default: ''
// };

// const darkmode = new Darkmode(options);
// darkmode.showWidget();

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
      <ToastContainer />
      {/* {darkmode.toggle()} */}
    </BrowserRouter>
  );
}