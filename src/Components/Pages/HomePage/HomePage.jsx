import React, {useContext} from 'react';
import './homePageStyles.scss';
import { LoginPage } from "../LoginPage/LoginPage";
import {Route, BrowserRouter as Router, Switch, useLocation, Link} from 'react-router-dom';
import {SignupStatusContext} from '../../../context/context';

const HomePage = () => {
    const [isSignup, setIsSignup] = useContext(SignupStatusContext);
    const loc = useLocation();
    return (
        <div className="home__page">
            <div className="home__card">
                <div className="logo"></div>
                <div className="home__blurb">
                    <h3>Number One Platform to keep track of your favourite Cryptocurrencies!</h3>
                </div>
                <div className="home__btns">
                    <Link style={{ textDecoration: 'none' }} to="/login" className="home__btn btn__1" onClick={()=>setIsSignup(false)}><h3>Sign In</h3></Link>
                    <Link style={{ textDecoration: 'none' }} to="/login" className="home__btn btn__1" onClick={()=>setIsSignup(true)}><h3>Register</h3></Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
