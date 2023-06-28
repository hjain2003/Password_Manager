import React from 'react'
import './Home.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home_container'>
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
