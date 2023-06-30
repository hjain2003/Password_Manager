import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    passkey: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  } 

  const loginUser = async (e) => {
    e.preventDefault();

    const { name, passkey } = user;

    const res = await fetch('http://localhost:5000/user/login', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        passkey
      })
    });

    const data = await res.json();

    if (res.status === 400) {
      window.alert("Login failed");
      console.log("Login failed");
      console.log(res.status);
      console.log(data);
    } else if (res.status !== 400) {
      window.alert("Login successful");
      console.log("Login successful");
      navigate('/otpverification');
      console.log(data._id);
      localStorage.setItem("userId", data.userId);
      console.log(res.status);
      console.log(data);
    }
  };

  return (
    <>
      <div className="auth_container">
        <div className="register_box">
          <h1 id="register_heading" align="center">LOGIN</h1>
          <hr />
          <br />
          <form>
            <span>UserName &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name="name" placeholder='Enter name' onChange={handleChange} /></span><br /><br />
            <span>Passkey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='password' name="passkey" placeholder='Enter passkey' onChange={handleChange} /></span><br /><br />
            <input type="submit" name="submit" id="submit_form" value="Login" onClick={loginUser}/>
          </form>
          <br />
          <span id="already">Don't have an account ? <NavLink to='/register'>Register here</NavLink></span>
        </div>
      </div>
    </>
  )
}

export default Login
