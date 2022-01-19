import React from 'react'
import TransactionInfo from './TransactionInfo';
import css from "../BoxType/BoxType.module.css";

function TransactionCard(props) {
    const { id, action, amount, type, weaponName, atk, state } = props;

    const renderInfo = () => {
        let content = [];

        if (action !== "mint") {
            content.push(
                <TransactionInfo
                    key={id}
                    action={action}
                    amount={amount}
                    type={type} />
            )
        } else {
            content.push(
                <TransactionInfo
                    key={id}
                    action={action}
                    amount={atk}
                    type={weaponName}
                    state={state} />
            )
        }

        return content;
    }

    return (
        <div className={`${css.TransactionContainer} ${css.DecorateBox}`}>
            <div className={`${css.DecorateBoxInner}`}>
                {renderInfo()}
            </div>
        </div>
    )
}

export default TransactionCard
