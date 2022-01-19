import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeaponThunk } from '../../slices/weaponSelectionSlice';
import WeaponButton from './WeaponButton';

import css from "./ItemBox.module.css";

function WeaponsContainer() {
    const userId = useSelector(state => state.userLoginSlice.userId);
    const weaponListData = useSelector(state => state.weaponSelectionSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWeaponThunk(userId));
    }, [])

    const renderWeaponSelection = () => {
        let content = [];

        weaponListData.weaponList.map((item) => {
            content.push(
                <WeaponButton item={item} key={item.name} />
            )
        });

        return content;
    }

    return (
        <div className={`${css.MintingGrid} ${'grid'}`}>
            {renderWeaponSelection()}
        </ div>
    )
}

export default WeaponsContainer
