import React from 'react'
import './AddPass.css';

const AddPass = () => {
    return (
        <>
            <div className="add_pass_container">
                <h1 align="center" id="add_heading">Add Password</h1>
                <div className="add_form_container">
                    <label htmlFor="title">Title/url</label>
                    <input type="text" placeholder='Title/URL' name="title" />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder='Enter password' name="password" />
                    <br />
                    <label htmlFor="additionalInfo">Additonal Info</label>
                    <textarea type="text" placeholder='Enter description' name="additionalInfo" style={{ width: '580px' }} />
                    <br />
                    <button id="add_pass_submit">Submit</button>
                </div>
            </div>
        </>
    )
}

export default AddPass
