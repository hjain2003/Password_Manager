import React from 'react';
import './PassCard.css';
import { NavLink } from 'react-router-dom';

const PassCard = (props) => {
  
  const token = localStorage.getItem("jwtoken");
  console.log("GOT FROM LOCAL STORAGE : ",token);
  console.log('Authorization Header:', `Bearer ${token}`);

  const handlePassDelete = async () => {
      try {
        const response = await fetch(`http://localhost:5000/password/delete/${props.passId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        const data = await response.json();

        if (response.status===201) {
          window.alert("Password deleted");
          console.log(data.message);
        } else {
          // Handle error
          console.log(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  
  
  // const {passId} = props;
  // console.log("PASS ID : ",passId);
  return (
    <>
      <div className="card">
        <span><b>{props.title}</b></span>
        <span>{props.pass}</span>
        <span>
          <NavLink to={`/passInfo/${props.passId}`}>More info</NavLink>
        </span>
        <button id="edit">Edit</button>
        <button id="delete" onClick={handlePassDelete}>Delete</button>
      </div>
      <br />
    </>
  );
};

export default PassCard;
