import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import gsap from 'gsap/all';

function StakeInfo(props) {
    const { name } = props
    const [depositAmount, setDepositAmount] = useState(0)
    const stakeData = useSelector(state => state.stakeSlice);
    const userLogin = useSelector(state => state.userLoginSlice);
    const [committed, setCommited] = useState();
    const [pool, setPool] = useState();
    const [buttonType, setButtonType] = useState();
    const commitRef = useRef();
    const poolRef = useRef();

    useEffect(() => {
        setCommited(userLogin.stake[name]);
        setPool(stakeData.inventory[name]);
    })

    useEffect(() => {
        if (committed != (committed + depositAmount)) {
            if (buttonType === 'deposit') {
                gsap.fromTo([commitRef.current, poolRef.current],
                    { scale: 1, color: "#00E1FF" },
                    { scale: 1.2, color: "#07E23C", yoyo: true, repeat: 1 });
            } else {
                gsap.fromTo([commitRef.current, poolRef.current],
                    { scale: 1, color: "#00E1FF" },
                    { scale: .8, color: "#da4040", yoyo: true, repeat: 1 });
            }
        }
    }, [committed])


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
                console.log(`STAKE_INFO: ${res.data.msg}`);
                setButtonType('deposit')
                setCommited(committed + depositAmount);
                setPool(pool + depositAmount);
            })
            .catch(err => {
                console.log(`STAKE_INFO_ERROR: ${err.response.data.msg}`)
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
                setButtonType('withdraw')
                setCommited(committed - depositAmount);
                setPool(pool - depositAmount);
            })
            .catch(err => {
                console.log(err.response.data.msg)
            })
    }

    return (
        <div className={`flex flex-col`}>
            <div>
                <p>{name}</p>
                <div></div>
                <p>Committed:
                    <span className='blueText inline-block' ref={commitRef}>{committed}</span>
                </p>
                <p>Pool:
                    <span className='blueText inline-block' ref={poolRef}>{pool}</span>
                </p>
            </div>
            <div>
                <input type='number' min='0' step='1' onChange={despoitChangeHandler}></input>
                <button className='pixelButton' onClick={depositClickHandler}>Deposit</button>

                <input type='number' min='0' step='1' onChange={withdrawChangeHandler}></input>
                <button className='pixelButton' onClick={withdrawClickHandler}>Withdraw</button>
            </div>
        </div>
    )
}

export default StakeInfo
