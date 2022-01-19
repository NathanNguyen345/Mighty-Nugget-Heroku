import React from 'react';
import NavBullet from './NavBullet';
import NavImg from './NavImg';

import css from "./Nav.module.css";

function Nav() {
    return (
        <div className={`${css.Navbar}`}>
            <NavImg />
            <NavBullet />
        </div>
    )
}

export default Nav
