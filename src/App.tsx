import React from 'react';
import './App.scss';
import Navigation from './routes/Navigation';
import { Route, Routes } from 'react-router-dom';
import SignInSignOutPage from './pages/sign-in-sign-out/SignInSignOut.component';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignInSignOutPage />} />
      <Route path="*" element={<Navigation />}></Route>
    </Routes>
  );
}

export default App;
