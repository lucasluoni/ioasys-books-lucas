import React from 'react';
import LoginScreen from './pages/LoginScreen';
import BooksShelf from './pages/BooksShelf/BooksShelf';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import axios from 'axios'

export default function App() {
  axios.defaults.baseURL = 'https://books.ioasys.com.br/api/v1';

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<BooksShelf />}>
          </Route>
          <Route exact path="/login" element={<LoginScreen />}>
          </Route>
        </Routes>
      </Router>
    </>
  );
  
}
