import React, { useState } from 'react'
import './Otp.css';
import { useNavigate } from 'react-router-dom';

const Otp = () => {

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [otpdetails,setOtpDetails] = useState({
    otpdetails: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtpDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  } 

  const PostOtp = async (e) => {
    e.preventDefault();

    const { otp } = otpdetails;

    const res = await fetch('http://localhost:5000/user/verifyotp', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        otp
      })
    });

    const data = await res.json();

    if (res.status === 400 || res.status===500) {
      window.alert("otp verification failed");
      console.log("otp failed");
      console.log(res.status);
      console.log(data);
    } else if (res.status !== 400) {
      window.alert("opt verification successful");
      console.log("otp successful");
      navigate('/passSpace');
      console.log(data);
    }
  };
  return (
    <>
    <div className="otp_container">
        <div className="otp_form">
            <form action="">
                <h3 align="center">OTP VERIFICATION</h3>
                <span id="otp_description">OTP sent to registered email !</span>
                <br /><br />
                <input type="number" placeholder='Enter 4 digit otp pin' name="otp" onChange={handleChange} />
                <br /><br />
                <span><button id="resend">Resend OTP</button>&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" value="Enter" id="enter_otp" onClick={PostOtp} /></span>
            </form>
            <br />
                <span id="otp_description">Kindly check the spam folder in case you haven't received your otp</span>
        </div>
    </div>
    </>
  )
}

export default Otp