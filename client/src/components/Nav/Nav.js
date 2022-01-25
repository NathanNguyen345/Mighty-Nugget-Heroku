import React, { useEffect, useRef } from 'react';
import NavBullet from './NavBullet';
import NavImg from './NavImg';
import css from "./Nav.module.css";
import gsap from 'gsap';

function Nav() {
    const navRef = useRef();

    useEffect(() => {
        gsap.from(navRef.current, { duration: 1.5, y: '-100%', ease: 'bounce' })
    }, [])

    return (
        <div className={`${css.Navbar}`} ref={navRef}>
            <NavImg />
            <NavBullet />
        </div >
    )
}

export default Nav
