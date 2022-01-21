import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BodyContainer from '../BodyBox/BodyContainer';
import BoxButton from '../BodyBox/BoxButton';
import css from "./BoxType.module.css";

function Login(props) {
    const { title } = props;
    const [heading, setHeading] = useState(null);
    const [userName, setUserName] = useState('');
    const [userPass, setUserPass] = useState('');
    const userLoginError = useSelector(state => state.userLoginSlice.error);

    useEffect(() => {
        if (title === 'Login') {
            setHeading('Login now to get started');
        } else if (title === 'Create User') {
            setHeading("Don't have an account? Create one now");
        };
    }, [])

    const renderButton = () => {
        if (title === 'Login') {
            return (
                <BoxButton
                    action={'login'}
                    userName={userName}
                    userPass={userPass}
                />
            )
        } else if (title === 'Create User') {
            return (
                <BoxButton
                    action={'createUser'}
                    userName={userName}
                    userPass={userPass}
                />
            )

        }
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleUserPassChange = (e) => {
        setUserPass(e.target.value);
    }

    return (
        <div className={`${css.LoginContainer}`}>
            <div className={`${css.DecorateBox}`}>
                <div className={`${css.DecorateBoxInner}`}>
                    <div className={`${css.Login}`}>
                        <BodyContainer title={title} image={false} src='' button={true} />
                        <p>{heading}</p>
                        <form className={`${css.LoginForm}`}>
                            <label>
                                Name:
                                <input type="text" name="name" onChange={handleUserNameChange} />
                            </label>
                            <label>
                                Password:
                                <input type="password" name="name" onChange={handleUserPassChange} />
                            </label>
                            {renderButton()}
                            <label className='errorCode'>
                                {/*TODO: Fix log/create double display */}
                                {userLoginError}
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
