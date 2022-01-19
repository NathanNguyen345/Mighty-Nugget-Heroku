import React, { useEffect } from 'react';
import axios from 'axios';
import Terms from '../BoxType/Terms';
import Minting from '../BoxType/Minting';
import Inventory from '../BoxType/Inventory';
import Weapons from '../BoxType/Weapons';
import StakeContainer from '../BoxType/StakeContainer';
import { fetchTransactionData } from "../../slices/transactionSlice";
import { useSelector, useDispatch } from 'react-redux';
import css from "./Routes.module.css";

function Town() {
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

    return (
        <div className={`${css.Town} ${'flex'} ${'item-center'} ${'flex-col'}`}>
            <div className={`${css.PageTitle}`}>
                <h1>Town</h1>
            </div>
            <div className={`${css.Inventory} ${'flex'} ${'flex-col'}`}>
                <h2>User Inventory</h2>
                <Inventory />
                <h2>User Weapons</h2>
                <Weapons />
            </div>
            <div className={`${css.Activties}`}>
                <h2>Actvities</h2>
                <div className={`${'grid'} ${'gridCol'}`}>
                    <Minting />
                    <StakeContainer />s
                </div>
            </div>
        </div>
    )
}

export default Town