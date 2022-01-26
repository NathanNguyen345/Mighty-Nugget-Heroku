import React from 'react';
import css from './BodyBox.module.css';
import gsap from 'gsap';
import { Timeline } from 'gsap/gsap-core';
import InfoScreen from './InfoScreen';

function InfoButton(props) {
    const { boxType } = props
    const timeline = new Timeline();

    const infoClickHandler = () => {
        timeline
            .to('.InfoScreen', { duration: 1, autoAlpha: 1, zIndex: 1000 })
    }

    return (
        <div className={`${css.InfoButton} flex`}>
            <div className={`flexItem`}>
                <button className='pixelButton' onClick={infoClickHandler}>?</button>
            </div>
        </div>
    );
}

export default InfoButton;
