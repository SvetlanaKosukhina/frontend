import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './components/UserPages/LoginPage';
import RegistrationPage from './components/UserPages/RegistrationPage';
import MainPage from './components/MainPage';
import { whoAmIRequested } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(whoAmIRequested());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
