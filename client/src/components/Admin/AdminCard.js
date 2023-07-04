import React from 'react';
import './Admin.css';

const AdminCard= (props) => {
  
  return (
    <>
      <div className="card">
        <span><b>User Name</b></span>
        <span>emailisthe@gmail.com</span>
        <button id="delete">Delete</button>
      </div>
      <br />
    </>
  );
};

export default AdminCard;
