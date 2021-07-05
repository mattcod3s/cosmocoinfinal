import React,{useState, useEffect, useContext} from 'react';
import './loginPageStyles.scss';
import SigninCard from './Cards/SigninCard/SigninCard';
import SignupCard from './Cards/SignupCard/SignupCard';
import SigninForm from './Forms/SigninForm/SigninForm';
import SignupForm from './Forms/SignupForm/SignupForm';
import SignInCardMobile from './Cards/SignInCardMobile/SignInCardMobile';
import SignUpCardMobile from './Cards/SignUpCardMobile/SignUpCardMobile';
import SignInFormMobile from './Forms/SignInFormMobile/SignInFormMobile';
import SignUpFormMobile from './Forms/SignUpFormMobile/SignUpFormMobile';
import {SignupStatusContext} from '../../../context/context';
import {useHistory} from 'react-router-dom';

const LoginPage = () => {
    const history = useHistory();
    const [isSignup, setIsSignup] = useContext(SignupStatusContext);
    const [fadeAnim, setFadeAnim] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const desktopContainer = (
        <div className="login__container">
            <div className="login__card" style={isSignup ? {transform: 'translateX(0px)'} : {transform: 'translateX(46vw)'}}>
                {isSignup ?  <SigninCard /> : <SignupCard/>}
            </div>
            <div className="login__form" style={isSignup ? {transform: 'translateX(24vw)'} : {transform: 'translateX(0px)'}}>
                {isSignup ? <SignupForm /> : <SigninForm /> }
            </div>
        </div>
    )

    const mobileContainer = (
        <div className="login__container__mobile">
            <div className="login__card__mobile" style={isSignup ? {transform: 'translateY(-22vh)'} : {transform: 'translateY(22vh)'}}>
                {isSignup ?  <SignInCardMobile /> : <SignUpCardMobile/>}
            </div>
            <div className="login__form__mobile" style={isSignup ? {transform: 'translateY(13vh)'} : {transform: 'translateY(-22vw)'}}>
                {isSignup ? <SignUpFormMobile /> : <SignInFormMobile /> }
            </div>
        </div>
    )

    useEffect(() => {
        const ismobile = window.innerWidth < 600;
        if (ismobile !== isMobile) setIsMobile(ismobile);
    }, [history])

    return (
        <div className="login__page">
            <div className="logo"></div>
            {isMobile ? mobileContainer : desktopContainer}
        </div>
    )
}

export default LoginPage;
