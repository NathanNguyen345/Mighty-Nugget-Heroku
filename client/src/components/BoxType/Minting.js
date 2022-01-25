import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MintContainer from '../ItemBox/MintContainer';
import WeaponsContainer from '../ItemBox/WeaponsContainer';
import ItemBoxContainer from '../ItemBox/ItemBoxContainer';
import { subtractMintingMaterialsThunk } from "../../slices/userInventorySlice";
import { addWeaponToInventoryThunk } from "../../slices/userLoginSlice";
import css from "./BoxType.module.css";
import { Timeline } from 'gsap/gsap-core';

function NoRiskBox() {
    const materialCounterSliceState = useSelector(state => state.materialCounterSlice);
    const mintMaterialState = useSelector(state => state.mintMaterialsSlice)
    const userInfoState = useSelector(state => state.userLoginSlice);
    const error = useSelector(state => state.userInventorySlice.error);
    const blockerTopRef = useRef();
    const blockerBottomRef = useRef();
    const timeline = new Timeline({ duration: .5 });
    const dispatch = useDispatch();
    const [mintItem, setMintItem] = useState();

    useEffect(() => {
        const mintedWeapon = userInfoState.weapon[userInfoState.weapon.length - 1];
        setMintItem({
            name: mintedWeapon.name,
            atk: mintedWeapon.atk
        })
    }, [userInfoState.weapon])

    const mintItemHandler = () => {
        timeline
            .to('.MintInnerContainer', { duration: 1.5, bottom: '0%' })
            .to('.MintInnerContainerBottom', { duration: 1.5, top: '0%' }, '<')
            .to(blockerTopRef.current, { duration: 1.5, opacity: 1 }, '<')
            .to(blockerBottomRef.current, { duration: 1.5, opacity: 1 }, '<')
            .to('.MintInnerContent', { duration: 1.5, opacity: 1, delay: 1 })

        const data = {
            itemName: mintMaterialState.item,
            itemId: userInfoState.inventoryId,
            materials: mintMaterialState.materials,
            materialsCounter: materialCounterSliceState,
            userId: userInfoState.userId
        }
        try {
            dispatch(subtractMintingMaterialsThunk(data));
            dispatch(addWeaponToInventoryThunk(data));
        } catch (err) {
            console.log(`error minting: ${err}`);
        }
    }

    const clearMintBlocker = () => {
        timeline
            .to('.MintInnerContent', { duration: 1.5, opacity: 0 })
            .to('.MintInnerContainer', { duration: 1.5, bottom: '100%' }, '>')
            .to('.MintInnerContainerBottom', { duration: 1.5, top: '100%' }, '<')
            .to(blockerTopRef.current, { duration: 1.5, opacity: 0 }, '<')
            .to(blockerBottomRef.current, { duration: 1.5, opacity: 0 }, '<')

        setTimeout(() => {
            setMintItem();
        }, 1500);
    }

    return (
        <div className={`${css.NoRiskMinting}`}>
            <div className={`${css.DecorateBox}`}>
                <div className={`${css.DecorateBoxInner} pos-relative`}>
                    <div className='MintInnerContainer'>
                        <div className={`${css.MintScreenTop}`} ref={blockerTopRef}></div>
                        <div className='MintInnerContent'>
                            <h2>Minted:</h2>
                            {mintItem
                                ? <ItemBoxContainer
                                    key={`${mintItem.name}-${mintItem.atk}`}
                                    title={mintItem.name}
                                    action={mintItem.atk}
                                />
                                : null
                            }
                            <button className='pixelButton' onClick={clearMintBlocker}>Okay</button>
                        </div>
                    </div>
                    <div className='MintInnerContainerBottom'>
                        <div className={`${css.MintScreenBottom}`} ref={blockerBottomRef}></div>
                    </div>
                    <h2>Mint A Weapon</h2>
                    <p>You're guaranteed to receive a weapon on mint with randomize stats</p>
                    <MintContainer />
                    <p> Select a weapon to see how much materials is needed</p>
                    <WeaponsContainer />
                    <p className='blueText'>{error}</p>
                    <button className='pixelButton' onClick={mintItemHandler}>Mint Item Now</button>
                </div>
            </div>
        </div>
    )
}

export default NoRiskBox
