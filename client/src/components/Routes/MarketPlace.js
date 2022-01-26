import React from 'react';
import css from "../Routes/Routes.module.css";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MarketPlace() {
    const userInfo = useSelector(state => state.userLoginSlice);

    const renderMarketPage = () => {
        return (
            <div className={`${css.MarketPlace}`}>
                <div className={`${css.PageTitle}`}>
                    <h1>Under Construction</h1>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {userInfo.loggedIn ? renderMarketPage() : <Navigate to="/" />}
        </React.Fragment>
    )
}

export default MarketPlace;
