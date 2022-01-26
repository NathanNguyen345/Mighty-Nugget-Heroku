import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Minting from '../BoxType/Minting';
import Inventory from '../BoxType/Inventory';
import Weapons from '../BoxType/Weapons';
import StakeContainer from '../BoxType/StakeContainer';
import { fetchTransactionData } from "../../slices/transactionSlice";
import { useSelector, useDispatch } from 'react-redux';
import { fetchFullMaterial } from "../../slices/mintMaterialsSlice";
import { resetCounter } from '../../slices/materialCounterSlice';
import css from "./Routes.module.css";
import Terms from '../BoxType/Terms';
import InfoScreen from '../BodyBox/InfoScreen';

function Town() {
    const userInfo = useSelector(state => state.userLoginSlice);
    const dispatch = useDispatch();
    const [boxType, setBoxType] = useState();

    useEffect(() => { })

    useEffect(() => {
        // TODO: Changed from GET to POST to work with heroku
        axios.post(`/transaction/full/`, { id: userInfo.userId })
            .then(res => {
                dispatch(fetchTransactionData(res.data.transactions))
            }).catch(err => {
                console.log(err.message.data);
            })
        // TODO: Changed from GET to POST to work with heroku
        axios.post(`/mint/axe`)
            .then(res => {
                dispatch(fetchFullMaterial(res.data.item.mats))
            })
        dispatch(resetCounter());
    }, [userInfo.userId])

    const renderTown = () => {
        return (
            <React.Fragment>
                <InfoScreen boxType={boxType} />
                <div className={`${css.Town} ${'flex'} ${'item-center'} ${'flex-col'}`}>
                    <div className={`${css.PageTitle}`}>
                        <h1>Town</h1>
                        <Terms page={'Town'} />
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
                            <Minting boxType={setBoxType} />
                            <StakeContainer boxType={setBoxType} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {userInfo.loggedIn ? renderTown() : <Navigate to="/" />}
        </React.Fragment>
    )
}

export default Town
