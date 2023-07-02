import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PassCardUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedPass, setUpdatedPass] = useState({
    title: "",
    pass:"",
    additionalinfo: ""
  });

  useEffect(() => {
    const fetchPass = async () => {
      try {
        const response = await fetch(`http://localhost:5000/password/getPassbyId/${id}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.status === 201) {
          const { title, pass, additionalinfo,  } = data.pass_details;
          setUpdatedPass({title,pass,additionalinfo });
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPass();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPass((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const updatePass = async (e) => {
    e.preventDefault();

    const { title, pass, additionalinfo } = updatedPass;

    const response = await fetch(`http://localhost:5000/password/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
      },
      body: JSON.stringify({
        title,
        pass,
        additionalinfo
      })
    });

    const data = await response.json();

    if (response.status === 201) {
      window.alert('Pass updated successfully');
      navigate('/passSpace');
      console.log(data.message);
    } else {
      window.alert('Pass update failed');
      console.log(data.message);
    }
  };

  return (
    <>
      <div className="add_pass_container">
                <h1 align="center" id="add_heading">Edit Password</h1>
                <div className="add_form_container">
                    <label htmlFor="title">Title/url</label>
                    <input type="text" placeholder='Title/URL' name="title" value={updatedPass.title} onChange={handleChange}/>
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder='Enter password' name="pass" value={updatedPass.pass} onChange={handleChange} />
                    <br />
                    <label htmlFor="additionalInfo">Additonal Info</label>
                    <textarea type="text" placeholder='Enter description' name="additionalinfo" style={{ width: '580px' }} value={updatedPass.additionalinfo} onChange={handleChange}/>
                    <br />
                    <input type="submit" id="add_pass_submit" value="Submit" onClick={updatePass}/>
                </div>
            </div>
    </>
  );
};

export default PassCardUpdate;