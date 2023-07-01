import React, { useEffect, useState } from 'react';
import './PassSpace.css';
import PassCard from '../PasswordCard/PassCard';

import { NavLink, useNavigate } from 'react-router-dom';

const PassSpace = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [passcards, setPassCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const passcardsPerPage = 5;
    const totalPages = Math.ceil(passcards.length / passcardsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastPasscard = currentPage * passcardsPerPage;
    const indexOfFirstPasscard = indexOfLastPasscard - passcardsPerPage;
    const currentPasscards = passcards.slice(indexOfFirstPasscard, indexOfLastPasscard);

    const [userData, setUserData] = useState('');

    const callHomePage = async () => {
        try {
            const res = await fetch("http://localhost:5000/user/getUserData", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);

            if (res.status !== 200) {
                navigate('/login');
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    };

    const showMyPwds = async () => {
        try {
            const res = await fetch(`http://localhost:5000/password/myPasswords?userId=${userId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (res.status === 200) {
                const data = await res.json();
                setPassCards(data.posts);
                setIsLoading(false);
            } else {
                console.log('Error:', res.status);
            }
        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    };

    useEffect(() => {
        callHomePage();
        showMyPwds();
    }, []);

    return (
        <>
            <div className="pass_space_container">
                <span id="logout"><NavLink to='/logout'>Logout</NavLink> &nbsp;&nbsp;{userData.name}</span>
                <div className="saved_passwords">
                    <span id="pass_heading">Your Passwords : </span>
                    <br />
                    <span>
                        <input type="text" id="searchPass" placeholder="Enter title to search" />
                        <button>Search</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button id="add_pass"><NavLink to='/addPass'>+Add password</NavLink></button>
                    </span>
                    <br />
                    {currentPasscards.map((item, index) => (
                        <div key={item._id}>
                            <PassCard
                                passId={item._id}
                                title={item.title}
                                pass={item.pass}
                                additionalinfo={item.additionalinfo}
                            />
                            {/* <MoreInfo passId={item._id}/> */}
                        </div>
                    ))}
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Prev
                        </button>
                        <span>{currentPage}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PassSpace;

               
