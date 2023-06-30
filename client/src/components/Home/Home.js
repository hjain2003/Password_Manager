import React, { useEffect, useState } from 'react'
import './Home.css';
import { NavLink } from 'react-router-dom';

const Home = () => {

    return (
        <div className='home_container'>
            {/* <span id="logout"><NavLink to='/logout'>Logout</NavLink> &nbsp;&nbsp;{userData.name}</span> */}
            <div className="inner_container">
                <h1>Password Manager</h1>
                <br />
                <p>A secure, reliable and easy-to-use platform to</p>
                <p> store and manage your passwords</p>
                <br />
                <button id="home_btn"><NavLink to='/register'>SignUp</NavLink></button>
            </div>
        </div>
    )
}

export default Home
