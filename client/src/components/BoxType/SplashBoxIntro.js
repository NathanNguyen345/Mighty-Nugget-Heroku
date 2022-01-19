import React from 'react';
import BodyContainer from '../BodyBox/BodyContainer';

import css from "./BoxType.module.css";

function SplashBoxIntro() {
    return (
        <div className={`${css.SplashBoxContainer}`}>
            <div className={`${css.DecorateBox}`}>
                <div className={`${css.DecorateBoxInner}`}>
                    <BodyContainer title='' image={true} src='MIGRATION' button={false} />
                    <h2>Friends,</h2>
                    <p>Login with: test / 123<br />
                        Create New User: Username: min length 2 / Password: min length 2<br />
                        - Nathan</p>
                </div>
            </div >

        </div>
    )
}

export default SplashBoxIntro
