import React, { useState } from 'react'
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        passkey: "",
        cpasskey: ""
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUser((prevState)=>({
            ...prevState,
            [name]: value
        }));
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, passkey, cpasskey} = user;
    
        const res = await fetch("http://localhost:5000/user/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            passkey,
            cpasskey
          })
        });
    
        const data = await res.json();
    
        if (res.status === 422) {
          window.alert("Registration failed");
          console.log("Registration failed")
          console.log(res.status);
        }
        else if (res.status !== 422) {
          window.alert("Registration successfull");
          console.log("Registration successfull");
          console.log(res.status);
          console.log(data);
          navigate('/login');
        }
      };

    return (
        <>
            <div className="auth_container">

                <div className="register_box">
                    <h1 id="register_heading" align="center">REGISTER</h1>
                    <hr />
                    <br />
                    <form>
                        <span>UserName &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name="name" placeholder='Enter name' onChange={handleChange}/></span><br /><br />
                        <span>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='email' name="email" placeholder='Enter email' onChange={handleChange}/></span><br /><br />
                        <span>Passkey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='password' name="passkey" placeholder='Enter passkey' onChange={handleChange}/></span><br /><br />
                        <span>Confirm Passkey &nbsp;&nbsp;&nbsp;<input type='text' name="cpasskey" placeholder='confirm passkey' onChange={handleChange}/></span><br /><br />
                        <input type="submit" name="submit" id="submit_form" value="Register" onClick={PostData}/>
                    </form>
                    <br />
                    <span id="already">Already have an account ? <NavLink to='/login'>Login here</NavLink></span>
                </div>
            </div>
        </>
    )
}

export default Register
