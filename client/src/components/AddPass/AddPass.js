import React, { useState } from 'react'
import './AddPass.css';
import { useNavigate } from 'react-router-dom';

const AddPass = () => {

    const navigate = useNavigate();
    const [pwdDetails, setPwdDetails] = useState({
        title: "",
        pass: "",
        additionalinfo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPwdDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handlePassSubmission = async (e) => {
        e.preventDefault();
      
        const { title, pass, additionalinfo } = pwdDetails;
      
        try {
          const res = await fetch('http://localhost:5000/password/setpassword', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title,
              pass,
              additionalinfo,
            }),
          });
      
          const data = await res.json();
      
          if (res.status === 422) {
            window.alert('Pass Addition failed');
            console.log(res.status);
            console.log(data);
          } else if (res.status !== 422) {
            window.alert('Pass addition successful');
            // console.log("Login successful");
            navigate('/passSpace');
            console.log(res.status);
            console.log(data);
          }
        } catch (error) {
          console.log(error);
          navigate('/login');
        }
      };
      
    return (
        <>
            <div className="add_pass_container">
                <h1 align="center" id="add_heading">Add Password</h1>
                <div className="add_form_container">
                    <label htmlFor="title">Title/url</label>
                    <input type="text" placeholder='Title/URL' name="title" onChange={handleChange}/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder='Enter password' name="pass" onChange={handleChange}/>
                    <br />
                    <label htmlFor="additionalInfo">Additonal Info</label>
                    <textarea type="text" placeholder='Enter description' name="additionalinfo" style={{ width: '580px' }} onChange={handleChange}/>
                    <br />
                    <input type="submit" id="add_pass_submit" value="Submit" onClick={handlePassSubmission}/>
                </div>
            </div>
        </>
    )
}

export default AddPass
