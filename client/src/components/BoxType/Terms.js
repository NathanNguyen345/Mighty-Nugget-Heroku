import React from 'react';
import css from "./BoxType.module.css";

function Terms() {
    return (
        <div className={`${css.TermsContainer}`}>
            <div className={`${css.DecorateBox}`}>
                <div className={`${css.DecorateBoxInner}`}>
                    <h2>Need more items? Go explore and earn some items.</h2>
                    <a href="http://localhost:3000/explore">Explore</a>
                </div>
            </div>
        </div>
    )
}

export default Terms
