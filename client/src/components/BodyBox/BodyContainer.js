import React, { useState, useEffect } from 'react'
import BoxTitle from './BoxTitle'
import BoxImg from './BoxImg'
import MiningGif from "../../assets/gif/Mining.gif";
import NoRisk from "../../assets/gif/no-risk.gif";
import Stake from "../../assets/gif/stake.png";
import Wolf from "../../assets/gif/wolf.gif";

function BodyContainer(props) {
    const { title, image, src } = props;
    const [imgSrc, setImgSrc] = useState(null);
    const [imgId, setImgId] = useState(null);

    useEffect(() => {
        if (image) {
            getGif();
        };
    });

    const getGif = () => {
        switch (src) {
            case 'MIGRATION':
                setImgSrc(MiningGif);
                setImgId('Mining');
                break;
            case 'NO-RISK':
                setImgSrc(NoRisk);
                setImgId('NoRisk')
                break;
            case 'STAKE':
                setImgSrc(Stake);
                setImgId('Stake')
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <BoxTitle title={title} />
            {image ? <BoxImg imgSrc={imgSrc} imgId={imgId} /> : ''}
        </React.Fragment>
    )
}

export default BodyContainer
