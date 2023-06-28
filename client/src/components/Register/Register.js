import React from 'react'
import './Register.css';
import { NavLink } from 'react-router-dom';

const Register = () => {
    return (
        <>
            <div className="auth_container">

                <div className="register_box">
                    <h1 id="register_heading" align="center">REGISTER</h1>
                    <hr />
                    <br />
                    <form>
                        <span>UserName &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name="name" placeholder='Enter name'/></span><br /><br />
                        <span>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='email' name="email" placeholder='Enter email'/></span><br /><br />
                        <span>Passkey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='password' name="passkey" placeholder='Enter passkey'/></span><br /><br />
                        <span>Confirm Passkey &nbsp;&nbsp;&nbsp;<input type='text' name="cpasskey" placeholder='confirm passkey'/></span><br /><br />
                        <input type="submit" name="submit" id="submit_form" value="Register"/>
                    </form>
                    <br />
                    <span id="already">Already have an account ? <NavLink to='/login'>Login here</NavLink></span>
                </div>
            </div>
        </>
    )
}

export default Register
