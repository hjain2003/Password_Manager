import React, { useEffect, useState } from 'react';
import './Admin.css';
import AdminCard from './AdminCard';

const Admin = () => {
    const [userCards, setUserCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const userCardsPerPage = 5;
    const [searchQuery, setSearchQuery] = useState('');

    const callAllUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/user/getAllUsers", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            const data = await res.json();
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            
            setUserCards(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callAllUsers();
    }, []);

    const handleNextPage = () => {
        const totalPages = Math.ceil(userCards.length / userCardsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const indexOfLastUserCard = currentPage * userCardsPerPage;
    const indexOfFirstUserCard = indexOfLastUserCard - userCardsPerPage;

    const filteredUserCards = userCards.filter((userCard) => {
        if (userCard.name) {
            return userCard.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
    });

    const currentUserCards = filteredUserCards.slice(
        indexOfFirstUserCard,
        indexOfLastUserCard
    );

    return (
        <>
            <div className="pass_space_container">
                {/* <span id="logout">
                    <NavLink to="/logout">Logout</NavLink> &nbsp;&nbsp;{userData.name}
                </span> */}
                <div className="saved_passwords">
                    <span id="pass_heading">All Users :</span>
                    <br />
                    <span>
                        <input
                            type="text"
                            id="searchPass"
                            placeholder="Enter title to search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </span>
                    <br />
                    <div>
                        {currentUserCards.map((item, index) => (
                            <div key={item._id}>
                                <AdminCard name={item.name} email={item.email} />
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        <br />
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Prev
                        </button>
                        <span>{currentPage}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(filteredUserCards.length / userCardsPerPage)}>

                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
