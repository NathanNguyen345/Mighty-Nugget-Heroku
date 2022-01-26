import React, { useState, useEffect } from 'react';
import cssBox from "../BoxType/BoxType.module.css";
import { Timeline } from 'gsap/gsap-core';

function InfoScreen(props) {
    const { boxType } = props
    const timeline = new Timeline();

    const renderInfo = () => {
        let content = []

        switch (boxType) {
            case 'Mint':
                content.push(
                    <div>
                        <h1>Minting Info:</h1>
                        <div className='infoText'>
                            <p>1: Select a weapon from the Weapon Selection grid</p>
                            <p>2: Once selected, the materials will display the needed materials to mint</p>
                            <p>3: Provide the needed matierals</p>
                            <p>4: Click Mint Item Now</p>
                            <p>5: Successfully minting a weapon will provide you with the chosen weapon with randomized stats</p>
                        </div>
                    </div>
                )
                break;
            case 'Stake':
                content.push(
                    <div>
                        <h1>Stake Info:</h1>
                        <div className='infoText'>
                            <p>Commiting materials will provide a % return on your investment</p>
                            <p>Commited: This is how many materials you've commited from this account</p>
                            <p>Pool: Collection of all materials commited by all users currently playing</p>
                        </div>
                    </div>
                )
                break
            default:
                break;
        }

        return content;
    }

    const closeClickHandler = () => {
        timeline
            .to('.InfoScreen', { duration: 1, autoAlpha: 0, zIndex: -1 })
    }

    return (
        <React.Fragment>
            <div className={`InfoScreen flex`}>
                <div className='centerDiv'>
                    <div className={`${cssBox.DecorateBox}`}>
                        <div className={`${cssBox.DecorateBoxInner}`}>
                            {renderInfo()}
                            <button className='pixelButton' onClick={closeClickHandler}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default InfoScreen;
