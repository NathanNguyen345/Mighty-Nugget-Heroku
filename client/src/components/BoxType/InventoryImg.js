import React, { useState, useEffect } from 'react';
import ether from "../../assets/image/ether.png";
import fish from "../../assets/image/fish.png";
import ore from "../../assets/image/ore.png";
import wood from "../../assets/image/wood.png";
import axe from "../../assets/image/weapons/axe.png";
import boat from "../../assets/image/weapons/boat.png";
import pickaxe from "../../assets/image/weapons/pickaxe.png";
import sword from "../../assets/image/weapons/sword.png";
import diamond from "../../assets/image/diamond.png";

function InventoryImg(props) {
    const { imgId } = props
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        renderImgSrc();
    })

    const renderImgSrc = () => {
        switch (imgId) {
            case 'ether':
                setImgSrc(ether);
                break;
            case 'axe':
                setImgSrc(axe);
                break;
            case 'sword':
                setImgSrc(sword);
                break;
            case 'boat':
                setImgSrc(boat);
                break;
            case 'pickaxe':
                setImgSrc(pickaxe);
                break;
            case 1:
            case 'wood':
                setImgSrc(wood);
                break;
            case 2:
            case 'ore':
                setImgSrc(ore);
                break;
            case 3:
            case 'fish':
                setImgSrc(fish);
                break;
            case 4:
            case 'diamond':
                setImgSrc(diamond);
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <img src={imgSrc} alt='imgId'></img>
        </React.Fragment>
    )
}

export default InventoryImg
