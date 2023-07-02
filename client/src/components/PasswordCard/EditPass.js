import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPass = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [passData, setPassData] = useState({
        title: '',
        pass: '',
        additionalinfo: '',
    });

    useEffect(() => {
        const fetchPasswordDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/password/getPassById/${id}`);
                if (response.status === 201) {
                    const data = await response.json();
                    setPassData(data.pass_details);
                } else {
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchPasswordDetails();
    }, [id]);

    const handleInputChange = (e) => {
        setPassData({ ...passData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/password/updatePass/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
                },
                body: JSON.stringify(passData),
            });

            if (response.status === 200) {
                window.alert("Pass Updated successfully!");
                navigate('/passSpace');
                console.log('Password updated successfully');
                // Handle success, such as displaying a success message or redirecting to the password space page
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="add_pass_container">
            <h1 align="center" id="add_heading">Edit Password</h1>
            <div className="add_form_container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label><br />
                <input type="text" id="title" name="title" value={passData.title} onChange={handleInputChange} />
                <br /><br />
                <label htmlFor="pass">Password:</label><br />
                <input type="text" id="pass" name="pass" value={passData.pass} onChange={handleInputChange} />
                <br /><br />
                <label htmlFor="additionalinfo">Additional Information:</label><br />
                <textarea id="additionalinfo" name="additionalinfo" value={passData.additionalinfo} onChange={handleInputChange} style={{ width: '580px' }}/>
                <br /><br />
                <button type="submit" id="add_pass_submit">Update Password</button>
            </form>
        </div>
    </div>
  );
};

export default EditPass;
