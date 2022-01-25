import React, { useRef } from 'react';
import ItemSelection from './ItemSelection';
import InventoryImg from '../BoxType/InventoryImg';
import css from "./ItemBox.module.css";

function ItemBoxContainer(props) {
    const { title, action, selection } = props

    return (
        <div className={`${css.ItemBoxContainer} ${'flex'}`}>
            <div className={`${css.Item}`}>
                <div className={`${'grid'} ${'gridCol'}`}>
                    <p>{title}</p>
                    <p className='blueText'>{action}</p>
                </div>
                <div>
                    <InventoryImg imgId={title} />
                </div>
                <div>
                    {selection
                        ? <ItemSelection name={title} />
                        : null
                    }
                </div>
            </div>
        </div >
    )
}

export default ItemBoxContainer
