import React, { useEffect } from 'react'
import img from "../../assets/image/MightyNugget.png"
import css from "./Nav.module.css";
import gsap from 'gsap';

function NavImg() {

    useEffect(() => {
        gsap.from('.navImg', { duration: 1, delay: 1, opacity: 0, rotateY: 360 })
    })

    return (
        <div className={`${css.NavBarImg} navImg`}>
            <img src={img} alt=''></img>
        </div >
    )
}

export default NavImg
