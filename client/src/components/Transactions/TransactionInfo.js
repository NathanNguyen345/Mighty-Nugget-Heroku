import React from 'react'
import InventoryImg from '../BoxType/InventoryImg';
import css from "../BoxType/BoxType.module.css";

function TransactionStake(props) {
    const { action, amount, type, state } = props;
    return (
        <div className={`${css.TransactionCard} ${'flex'} ${'flex-spaced-evenly'}`}>
            <div>
                <h3>{action}:</h3>
            </div>
            <div>
                <h3><InventoryImg imgId={type} /></h3>
            </div>
            <div>
                <p className='blueText'>{amount}</p>
            </div>
            <div>
                <h3>{state}</h3>
            </div>
        </div>

    )
}

export default TransactionStake
