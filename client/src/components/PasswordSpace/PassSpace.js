import React, { useState } from 'react';
import './PassSpace.css';
import PassCard from '../PasswordCard/PassCard';

const PassSpace = () => {
    const [passcards, setPassCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [currentPage, setCurrentPage] = useState(1);

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

    return (
        <>
            <div className="pass_space_container">
                <div className="saved_passwords">
                    <span id="pass_heading">Your Passwords : </span>
                    <br />
                    <span>
                        <input type="text" id="searchPass" placeholder="Enter title to search" />
                        <button>Search</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button id="add_pass">+ Add Password</button>
                    </span>
                    <br />
                    {currentPasscards.map((item, index) => (
                        <PassCard key={index} item={item} title="name" password="pass" />
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
