import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCounter, subToCounter } from "../../slices/materialCounterSlice";

function ItemSelection(prop) {
    const { name } = prop;

    const mintMaterial = useSelector(state => state.mintMaterialsSlice.materials[name]);
    const matAmount = useSelector(state => state.materialCounterSlice[name]);
    const dispatch = useDispatch();

    const addClickHandler = () => {
        if (matAmount < mintMaterial) {
            dispatch(addToCounter(name));
        }
    };

    const subClickHandler = () => {
        if (matAmount > 0) {
            dispatch(subToCounter(name));
        }
    };

    return (
        <div className={`${'flex'} ${'flex-evenly'}`}>
            <button className="pixelButton" onClick={subClickHandler}>-</button>
            <p className='blueText'>{matAmount}</p>
            <button className="pixelButton" onClick={addClickHandler}>+</button>
        </div>
    )
}

export default ItemSelection
