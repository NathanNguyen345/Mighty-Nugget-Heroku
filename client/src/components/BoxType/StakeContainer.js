import React, { useEffect } from 'react';
import socket from "../../socket/socket";
import BodyContainer from '../BodyBox/BodyContainer';
import StakeInfo from './StakeInfo';
import InfoButton from '../BodyBox/InfoButton';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStakeDataThunk, updateStakeMaterialThunk } from '../../slices/stakeSlice';
import { updateMaterialThunk } from '../../slices/userInventorySlice';
import { updateUserStakeMaterialThunk } from "../../slices/userLoginSlice";
import css from "./BoxType.module.css";

function StakeContainer(props) {
    const { boxType } = props;
    const stakeState = useSelector(state => state.stakeSlice);
    const userState = useSelector(state => state.userLoginSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStakeDataThunk());
    }, [])

    useEffect(() => {
        // Socket listener for mongo db change stream
        socket.on('transaction', (payload) => {

            let transactionData = payload.info.transaction;
            const stake = payload.info.stake;

            if (typeof (transactionData) != 'undefined') {
                let data = {
                    userId: userState.userId,
                    materialName: transactionData.matType,
                    amount: transactionData.amount,
                    stakeId: '61da8cc6e5b8c4b05839c3e4',
                    stakeAmount: stake[transactionData.matType],
                    inventoryId: userState.inventoryId
                }

                if (transactionData.action === 'deposit') {
                    dispatch(updateStakeMaterialThunk(data));
                    dispatch(updateMaterialThunk(data));
                    dispatch(updateUserStakeMaterialThunk(data));
                } else if (transactionData.action === 'withdraw') {
                    data.amount = (data.amount * -1)
                    dispatch(updateStakeMaterialThunk(data));
                    dispatch(updateMaterialThunk(data));
                    dispatch(updateUserStakeMaterialThunk(data));
                } else if (transactionData.action === 'mint') {
                }
            }
        })

        return () => {
            socket.disconnect();
        };
    }, [])

    const renderStakeInfo = () => {
        let content = [];

        for (let key in stakeState.inventory) {
            content.push(
                <React.Fragment key={key}>
                    <StakeInfo key={key} name={key} />
                </React.Fragment>
            )
        }

        return content;
    }

    const handleMouseEnter = () => {
        boxType('Stake');
    }

    return (
        <div className={`${css.StakeContainer}`} onMouseEnter={handleMouseEnter}>
            <div className={`${css.DecorateBox}`}>
                <div className={`${css.DecorateBoxInner}`}>
                    <div className='flex'>
                        <div className='flexItem'>
                            <h2>Stake Your Materials</h2>
                        </div>
                        <InfoButton boxType={'Stake'} />
                    </div>
                    <BodyContainer image={true} src='STAKE' />
                    {renderStakeInfo()}
                </div>
            </div>
        </div >
    )
}

export default StakeContainer
