import React from 'react'

const Login = () => {
  return (
    <>
    <div className="auth_container">

        <div className="register_box">
            <h1 id="register_heading" align="center">LOGIN</h1>
            <hr />
            <br />
            <form>
                <span>UserName &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name="name" placeholder='Enter name'/></span><br /><br />
                <span>Passkey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='password' name="passkey" placeholder='Enter passkey'/></span><br /><br />
                <input type="submit" name="submit" id="submit_form" value="Login"/>
            </form>
            <br />
            <span id="already">Don't have an account ? <a href="">Register here</a></span>
        </div>
    </div>
</>
  )
}

export default Login
