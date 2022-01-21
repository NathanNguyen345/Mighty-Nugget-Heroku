import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MintContainer from '../ItemBox/MintContainer';
import WeaponsContainer from '../ItemBox/WeaponsContainer';
import { subtractMintingMaterialsThunk } from "../../slices/userInventorySlice";
import { addWeaponToInventoryThunk } from "../../slices/userLoginSlice";
import css from "./BoxType.module.css";

function NoRiskBox() {
    const materialCounterSliceState = useSelector(state => state.materialCounterSlice);
    const mintMaterialState = useSelector(state => state.mintMaterialsSlice)
    const userInfoState = useSelector(state => state.userLoginSlice);
    const error = useSelector(state => state.userInventorySlice.error);

    const dispatch = useDispatch();

    const mintItemHandler = () => {
        const data = {
            itemName: mintMaterialState.item,
            userId: userInfoState.userId,
            materials: mintMaterialState.materials,
            materialsCounter: materialCounterSliceState
        }
        try {
            dispatch(subtractMintingMaterialsThunk(data));
            dispatch(addWeaponToInventoryThunk(data));
        } catch {
            console.log("error minting");
        }
    }

    return (
        <div className={`${css.NoRiskMinting}`}>
            <div className={`${css.DecorateBox}`}>
                <div className={`${css.DecorateBoxInner}`}>
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
