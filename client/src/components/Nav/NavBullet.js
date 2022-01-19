import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import css from "./Nav.module.css";
import { reset } from "../../slices/userLoginSlice";

function NavBullet() {
    const userLogin = useSelector(state => state.userLoginSlice);
    const disptch = useDispatch();

    const logoutClickHandler = () => {
        disptch(reset());
    }

    return (
        <div className={`${css.NavBarBulletContainer}`}>
            <ul>
                <li>
                    {!(userLogin.loggedIn) ? <Link to="/">Login</Link> : <Link to="/" onClick={logoutClickHandler}>Logout</Link>}
                </li>
                <li><Link to="/town">Town</Link></li>
                <li><Link to="/transactions">Transaction</Link></li>
                {/* <li><Link to="/explore">Explore</Link></li> */}
                <li>Whitepaper</li>
            </ul>
        </div>
    )
}

export default NavBullet
