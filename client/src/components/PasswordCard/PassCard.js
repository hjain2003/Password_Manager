import React from 'react'
import './PassCard.css';

const PassCard = (props) => {
  return (
    <>
    <div className="card">
        <span>{props.title}</span>
        <span>{props.password}</span>
        <span><a href="">More info</a></span>
        <button id="edit">Edit</button>
        <button id="delete">Delete</button>
    </div>
    <br />
    </>
  )
}

export default PassCard
