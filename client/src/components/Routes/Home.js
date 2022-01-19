import React from 'react';
import SplashBoxIntro from '../BoxType/SplashBoxIntro';
import Login from '../BoxType/Login';

import css from "./Routes.module.css";

function Home() {
    return (
        <div className={`${css.home}`}>
            <div className={`${'flex'} ${'item-center'} ${'flex-col'}`}>
                <div className={`${css.PageTitle}`}>
                    <h1>Mighty Nugget</h1>
                </div>
                <SplashBoxIntro />
            </div>
            <div className={`${'flex'} ${'flex-row'} ${'flex-split'}`}>
                <Login title='Login' />
                <Login title='Create User' />
            </div>
        </div >
    )
}

export default Home
