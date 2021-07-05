import React, {useContext, useEffect, useState, useReducer,} from 'react';
import './signinFormStyles.scss';
import {FadeAnimContext, CurrentUserContext, LoginFormDataContext, UserContext} from '../../../../../context/context';
import {useHistory, useLocation} from 'react-router-dom';
import google from '../../../../../Assets/google.svg';
import {GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector} from 'react-redux';
import dotenv from  'dotenv';
import { signin } from '../../../../../actions/auth';
import visible from '../../../../../Assets/visible.svg';
import invisible from '../../../../../Assets/invisible.svg';




const SigninForm = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const [fadeAnim, setFadeAnim] = useContext(FadeAnimContext);
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [loginFormData, setLoginFormData] = useContext(LoginFormDataContext);
    const [isVisibile, setIsVisible] = useState(false);

    useEffect(() => {
        
    }, [location, currentUser]) 

    const handleSubmit = () => {
        console.log(loginFormData);
        dispatch(signin(loginFormData, history));
    }

    const handleChange = (e) => {
        setLoginFormData({...loginFormData, [e.target.name] : e.target.value })
    }

    const googleSuccess = async (res) => {
        console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: 'AUTH', data: { result, token }})
            history.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log('Failure to Authenticate using Google. Try Again Later.')
    }
    return (
        <div className="form__container">
            <div className={`wrapper ${fadeAnim && "fade"}`} onAnimationEnd={()=>setFadeAnim(false)}>
                <div className="form__title">
                    <h2>Sign In</h2>
                </div>
                <div className="si_form">
                    <form onSubmit={()=>handleSubmit()}>
                        <input type="text" name="emailAddress" placeholder="Email Address" onChange={(e)=>handleChange(e)}/>
                        <>
                        <input type={isVisibile ? "text" : "password"} name="password" placeholder="Password" onChange={(e)=>handleChange(e)}/>
                        <img src={isVisibile ? visible : invisible} onClick={()=>setIsVisible(!isVisibile)}/>
                        </>
                    </form>
                </div>
                <div className="si__buttonArea">
                    <div className="sign_in__button si_btn" onClick={()=>handleSubmit()}><h3>Sign In</h3></div>
                    {/*<div className="sign_in__google__button si_btn"><h3>Sign In with Google</h3><img src={google}/></div>*/}
                    <GoogleLogin 
                        clientId={`686487444601-t2hv5b5kfpj0v69nh32l6fptof19p3iu.apps.googleusercontent.com`}
                        render={(renderProps) => (
                            <div 
                                className="sign_in__google__button si_btn" 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled}
                                >
                                    <h3>Sign In with Google</h3>
                                    <img src={google}/>
                            </div>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                </div>
            </div>
        </div>
    )
}

export default SigninForm;
