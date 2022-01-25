import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import css from "./Nav.module.css";
import { reset } from "../../slices/userLoginSlice";
import { resetInventoryCount } from "../../slices/userInventorySlice"
import gsap from 'gsap';

function NavBullet() {
    const userLogin = useSelector(state => state.userLoginSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        gsap.from('.link', { duration: .5, stagger: .5, opacity: 0, delay: 1.5 })
    }, [])

    const logoutClickHandler = () => {
        dispatch(reset());
        dispatch(resetInventoryCount());
    }

    return (
        <div className={`${css.NavBarBulletContainer}`}>
            <ul>
                <li className='link'>
                    {!(userLogin.loggedIn) ? <Link to="/">Login</Link> : <Link to="/" onClick={logoutClickHandler}>Logout</Link>}
                </li>
                <li className='link'><Link to="/town">Town</Link></li>
                <li className='link'><Link to="/transactions">Transaction</Link></li>
                <li className='link'><Link to="/explore">Explore</Link></li>
                {/* <li><Link to="/explorePhaser">Explore</Link></li> */}
                <li className='link'><Link to="/market">Market Place</Link></li>
                {/* <li>Whitepaper</li> */}
            </ul>
        </div>
    )
}

export default NavBullet
