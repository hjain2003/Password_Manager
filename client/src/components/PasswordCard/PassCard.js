import React from 'react';
import './PassCard.css';
import { NavLink } from 'react-router-dom';

const PassCard = (props) => {

  const {passId} = props;
  console.log("PASS ID : ",passId);
  return (
    <>
      <div className="card">
        <span><b>{props.title}</b></span>
        <span>{props.pass}</span>
        <span>
          <NavLink to={`/passInfo/${props.passId}`}>More info</NavLink>
        </span>
        <button id="edit">Edit</button>
        <button id="delete">Delete</button>
      </div>
      <br />
    </>
  );
};

export default PassCard;
