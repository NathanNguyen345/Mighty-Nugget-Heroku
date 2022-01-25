import React, { useEffect, useRef } from 'react';
import SplashBoxIntro from '../BoxType/SplashBoxIntro';
import Login from '../BoxType/Login';
import css from "./Routes.module.css";
import { Timeline } from 'gsap/gsap-core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const titleRef = useRef();
    const splashRef = useRef();
    const loginRef = useRef();
    const createRef = useRef();
    const userInfo = useSelector(state => state.userLoginSlice);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.loggedIn == false) {
            const loadtimeLine = new Timeline()
            loadtimeLine
                .fromTo(splashRef.current,
                    { opacity: 0 }, { duration: 1, opacity: 1 })
                .fromTo(loginRef.current,
                    { x: "-150%", opacity: 0 }, { deylay: .5, duration: 1, x: '0%', opacity: 1 }, '>')
                .fromTo(createRef.current,
                    { x: "150%", opacity: 0 }, { duration: 1, x: "0%", opacity: 1 }, '<')
        } else {
            const loggedInTimeline = new Timeline()
            loggedInTimeline
                .fromTo(loginRef.current,
                    { x: "0%", opacity: 1 }, { duration: 1, x: '-150%', opacity: 0 }, '')
                .fromTo(createRef.current,
                    { x: "0%", opacity: 1 }, { duration: 1, x: "150%", opacity: 0 }, '<')
                .fromTo(splashRef.current,
                    { opacity: 1 }, { duration: 1, opacity: 0 }, '<')

            setTimeout(() => {
                navigate('/town');
            }, 1100)
        }
    }, [userInfo.loggedIn])

    return (
        <div className={`${css.home}`}>
            <div className={`${'flex'} ${'item-center'} ${'flex-col'}`}>
                <div className={`${css.PageTitle}`} ref={titleRef}>
                    <h1>Mighty Nugget</h1>
                </div>
                <div ref={splashRef}><SplashBoxIntro /></div>
            </div>
            <div className={`${'flex'} ${'flex-row'} ${'flex-split'}`}>
                <div ref={loginRef}><Login title='Login' /></div>
                <div ref={createRef}><Login title='Create User' /></div>
            </div>
        </div >
    )
}

export default Home
