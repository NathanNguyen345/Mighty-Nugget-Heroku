import React from 'react';

function BoxImg(props) {
    const { imgSrc, imgId } = props

    return (
        <div>
            <img src={imgSrc} alt='' className={`${imgId}`}></img>
        </div >
    )
}

export default BoxImg
