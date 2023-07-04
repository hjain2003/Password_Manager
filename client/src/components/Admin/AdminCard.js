import React from 'react';
import './Admin.css';

const AdminCard= (props) => {
  
  return (
    <>
      <div className="card">
        <span><b>{props.name}</b></span>
        <span>{props.email}</span>
        <button id="delete">Delete</button>
      </div>
      <br />
    </>
  );
};

export default AdminCard;
