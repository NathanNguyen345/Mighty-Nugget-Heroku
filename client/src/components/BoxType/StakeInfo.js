import React, { useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

function StakeInfo(props) {
    const { name } = props
    const [depositAmount, setDepositAmount] = useState(0)

    const stakeData = useSelector(state => state.stakeSlice);
    const userLogin = useSelector(state => state.userLoginSlice);

    const despoitChangeHandler = (e) => {
        setDepositAmount(parseInt(e.target.value));
    }

    const depositClickHandler = () => {
        axios.post(`/transaction/${name}/deposit`,
            {
                name: name,
                amount: depositAmount,
                userId: userLogin.userId
            })
            .then(res => {
                console.log(res.data.msg);
            })
            .catch(err => {
                console.log(err.response.data.msg)
            })
    }

    const withdrawChangeHandler = (e) => {
        setDepositAmount(parseInt(e.target.value));
    }

    const withdrawClickHandler = () => {
        axios.post(`/transaction/${name}/withdraw`,
            {
                name: name,
                amount: depositAmount,
                userId: userLogin.userId
            })
            .then(res => {
                console.log(res.data.msg);
            })
            .catch(err => {
                console.log(err.response.data.msg)
            })
    }

    return (
        <div className={`flex flex-col`}>
            <div>
                <p>{name}</p>
                <p>Committed: {userLogin.stake[name]}</p>
                <p>Pool: {stakeData.inventory[name]}</p>
            </div>
            <div>
                <input type='number' onChange={despoitChangeHandler}></input>
                <button className='pixelButton' onClick={depositClickHandler}>Deposit</button>

                <input type='number' onChange={withdrawChangeHandler}></input>
                <button className='pixelButton' onClick={withdrawClickHandler}>Withdraw</button>
            </div>
        </div>
    )
}

export default StakeInfo
