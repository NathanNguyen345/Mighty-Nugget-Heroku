import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../slices/userLoginSlice';
import css from "../BodyBox/BodyBox.module.css";
import res from 'express/lib/response';

function BoxButton(props) {
    const { action, userName, userPass } = props;
    const [buttonContent, setButtonContent] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (action === 'login') {
            setButtonContent('Click to login');
        } else if (action === 'createUser') {
            setButtonContent('Click to create a new user');
        };
    }, [])

    const onClickHandler = () => {
        switch (action) {
            case 'login':
                axios.post("/user/login", { userName, userPass })
                    .then(res => {
                        dispatch(login(res.data.id));
                        navigate("/town");
                    })
                    .catch(err => {
                        return res.status(400).json(err.response.data.msg)
                    });
                break;
            case 'createUser':
                axios.post("/user/createUser", { userName, userPass })
                    .then((res) => {
                        dispatch(login(res.data.id));
                        navigate("/town");
                    })
                    .catch(err => {
                        return res.status(400).json(err.response.data.msg)
                    });
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <button
                className={`${css.LoginButton}`}
                type='button'
                onClick={onClickHandler}
            >{buttonContent}</button>
        </React.Fragment>
    )
}

export default BoxButton
