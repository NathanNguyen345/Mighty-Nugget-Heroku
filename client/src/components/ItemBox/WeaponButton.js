import React from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import ItemBoxContainer from './ItemBoxContainer';
import { fetchFullMaterial } from "../../slices/mintMaterialsSlice";
import { resetCounter } from "../../slices/materialCounterSlice";

import css from "./ItemBox.module.css";


function WeaponButton(props) {
    const { item } = props

    const dispatch = useDispatch();

    // Click weapon to display new materials and reset counter redux
    const weaponClickHandler = (name) => {
        axios.get(`/mint/${name}`)
            .then(res => {
                dispatch(fetchFullMaterial(res.data.item.mats))
                dispatch(resetCounter());
            })
    }

    return (
        <React.Fragment>
            <button
                className={`${css.WeaponButton}`}
                onClick={() => weaponClickHandler(item.name)}
                value={item.name}>
                <ItemBoxContainer
                    title={item.name}
                    action={item.atk}
                />
            </button>
        </React.Fragment>
    )
}

export default WeaponButton
