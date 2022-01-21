import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../../slices/userLoginSlice';
import css from "../BodyBox/BodyBox.module.css";

function BoxButton(props) {
    const { action, userName, userPass } = props;
    const [buttonContent, setButtonContent] = useState('');
    const successfulLoggedIn = useSelector(state => state.userLoginSlice.loggedIn);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (successfulLoggedIn) {
            navigate("/town");
        }
    }, [successfulLoggedIn])

    useEffect(() => {
        if (action === 'login') {
            setButtonContent('Click to login');
        } else if (action === 'createUser') {
            setButtonContent('Click to create a new user');
        };
    }, [])

    const onClickHandler = () => {
        dispatch(loginThunk({ userName, userPass }));
    }

    return (
        <React.Fragment>
            <button
                className={`${css.LoginButton} pixelButton`}
                type='button'
                onClick={onClickHandler}
            >{buttonContent}</button>
        </React.Fragment>
    )
}

export default BoxButton
