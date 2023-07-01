import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Register/Login';
import PassCard from './components/PasswordCard/PassCard';
import PassSpace from './components/PasswordSpace/PassSpace';
import AddPass from './components/AddPass/AddPass';
import Otp from './components/OTPVerification/Otp';
import { Routes, Route } from 'react-router-dom';
import Logout from './components/Register/Logout';
import MoreInfo from './components/PasswordSpace/MoreInfo';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/passSpace' element={<PassSpace/>}/>
      <Route path='/addPass' element={<AddPass/>}/>
      <Route path='/otpverification' element={<Otp/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/passInfo/:id' element={<MoreInfo/>}/>
    </Routes>
    </>
  );
}

export default App;
