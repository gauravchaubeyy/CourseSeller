import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './userComponents/Header';
import Home from './userComponents/Home';
import SignIn from './userComponents/SignIn';
import SignUp from './userComponents/SignUp';
import Courses from './userComponents/Courses';
import Header2 from './userComponents/Header2';
import Profile from './userComponents/Profile';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/signin" element={<Layout><SignIn /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/explore/*" element={<Explore />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

function Explore() {
  return (
    <div>
      <Header2 />
      <Courses />
    </div>
  );
}

export default App;


