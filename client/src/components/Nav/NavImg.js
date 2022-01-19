import React from 'react'
import img from "../../assets/image/MightyNugget.png"
import css from "./Nav.module.css";

function NavImg() {
    return (
        <div className={`${css.NavBarImg}`}>
            <img src={img} alt=''></img>
        </div >
    )
}

export default NavImg
