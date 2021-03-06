import React, { useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TransactionCard from './TransactionCard';
import { fetchTransactionData } from '../../slices/transactionSlice';
import css from "../Routes/Routes.module.css";
import Terms from '../BoxType/Terms';

function Transaction() {
    const transactionInfo = useSelector(state => state.transactionSlice);
    const userInfo = useSelector(state => state.userLoginSlice);
    const dispatch = useDispatch();

    // TODO: Changed from GET to POST to work with heroku
    useEffect(() => {
        axios.post(`/transaction/full/`, { id: userInfo.userId })
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
        <div className={`${css.Transaction}`}>
            <div className={`${css.PageTitle}`}>
                <h1>Your Recent Transactions</h1>
            </div>
            {userInfo.loggedIn ? renderTransactions() : <Navigate to="/" />}
        </div>
    )
}

export default Transaction;
