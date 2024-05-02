import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from  "./components/Header";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Courses from "./components/Courses";


export default function App() {
  return (
    <BrowserRouter>
      <Header />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/explore'element={<Courses/>} />
      </Routes>
    </BrowserRouter>
  );
}