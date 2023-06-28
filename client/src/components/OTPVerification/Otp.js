import React from 'react'
import './Otp.css';

const Otp = () => {
  return (
    <>
    <div className="otp_container">
        <div className="otp_form">
            <form action="">
                <h3 align="center">OTP VERIFICATION</h3>
                <span id="otp_description">OTP sent to registered email !</span>
                <br /><br />
                <input type="number" placeholder='Enter 4 digit otp pin' name="otp"/>
                <br /><br />
                <span><button id="resend">Resend OTP</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id="enter_otp">Enter</button></span>
            </form>
            <br />
                <span id="otp_description">Kindly check the spam folder in case you haven't received your otp</span>
        </div>
    </div>
    </>
  )
}

export default Otp