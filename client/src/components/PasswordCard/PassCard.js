import React from 'react';
import './PassCard.css';
import { NavLink, Navigate} from 'react-router-dom';

const PassCard = (props) => {

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/password/${props.passId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`
        }
      });

      if (response.status === 200) {
        window.alert("Password deleted successfully! Please refresh the page");
        console.log('Password deleted successfully');
      } else {
        console.log('Error:', response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card">
        <span><b>{props.title}</b></span>
        <span>{props.pass}</span>
        <span>
          <NavLink to={`/passInfo/${props.passId}`}>More info</NavLink>
        </span>
        <button id="edit"><NavLink to= {`/editPass/${props.passId}`}>Edit</NavLink></button>
        <button id="delete" onClick={handleDelete}>Delete</button>
      </div>
      <br />
    </>
  );
};

export default PassCard;
