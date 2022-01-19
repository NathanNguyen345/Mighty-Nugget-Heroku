import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import TransactionCard from './TransactionCard';
import { fetchTransactionData } from '../../slices/transactionSlice';
import css from "../Routes/Routes.module.css";

function Transaction() {
    const transactionInfo = useSelector(state => state.transactionSlice);
    const userInfo = useSelector(state => state.userLoginSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/transaction/full/${userInfo.userId}`)
            .then(res => {
                dispatch(fetchTransactionData(res.data.transactions))
            }).catch(err => {
                console.log(err.message.data);
            })
    }, [])

    const renderTransactions = () => {
        let content = [];

        transactionInfo.transaction.slice(0).reverse().map(item => {
            content.push(
                <TransactionCard
                    key={item._id}
                    id={item._id}
                    action={item.action}
                    amount={item.amount}
                    type={item.matType}
                    weaponName={item.weaponName}
                    atk={item.atk}
                    state={item.state}
                />
            )
        })

        return content;
    }

    return (
        <div className={`${css.PageTitle}`}>
            <h1>Transactions</h1>
            {renderTransactions()}
        </div>
    )
}

export default Transaction;
