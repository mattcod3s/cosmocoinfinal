import React, {useContext, useEffect, useState} from 'react';
import {SignupStatusContext, FadeAnimContext} from '../../../../../context/context';
import './signinCardStyles.scss';

const SigninCard = () => {
    const [isSignup, setIsSignup] = useContext(SignupStatusContext);
    const [fadeAnim, setFadeAnim] = useContext(FadeAnimContext);

    const handleSignInClick = () => {
        setIsSignup(false);
        setFadeAnim(true);
        // console.log(fadeAnim);
    }
    return (
        <div className="signin__card">
            <div className={`si__card__details ${fadeAnim && "fade"}`}>
                <div className="si__title">
                    <h3>Welcome Back!</h3>
                </div>
                <div className="si__blurb">
                    <p>Keep Connected with us by signing in using your personal details.</p>
                </div>
                <div className="si__button">
                    <div className="si__btn" onClick={()=>handleSignInClick()}><h3>Sign In</h3></div>
                </div>
            </div>
        </div>
    )
}

export default SigninCard;
