import React from 'react'
import './Home.css';

const Home = () => {
    return (
        <div className='home_container'>
            <div className="inner_container">
                <h1>Password Manager</h1>
                <br />
                <p>A secure, reliable and easy-to-use platform to</p>
                <p> store and manage your passwords</p>
                <br />
                <button id="home_btn">SignUp</button>
            </div>
        </div>
    )
}

export default Home
