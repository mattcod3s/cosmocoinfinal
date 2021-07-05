import React, {useContext, useEffect, useState} from 'react';
import {SignupStatusContext, FadeAnimContext} from '../../../../../context/context';
import './signupCardStyles.scss';

const SignupCard = () => {
    const [isSignup, setIsSignup] = useContext(SignupStatusContext);
    const [fadeAnim, setFadeAnim] = useContext(FadeAnimContext);

    const handleSignUpClick = () => {
        setIsSignup(true);
        setFadeAnim(true);
    }
    return (
        <div className="signup__card">
            <div className={`su__card__details ${fadeAnim && "fade"}`} >
                <div className="su__title">
                    <h3>Greetings!</h3>
                </div>
                <div className="su__blurb">
                    <p>Enter your personal details and start your crypto journey!</p>
                </div>
                <div className="su__button">
                    <div className="su__btn" onClick={()=>handleSignUpClick()}><h3>Sign Up</h3></div>
                </div>
            </div>
        </div>
    )
}

export default SignupCard;
