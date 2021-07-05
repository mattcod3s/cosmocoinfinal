import React, {useContext, useEffect, useState} from 'react';
import './styles.scss';
import {FadeAnimContext, RegistrationFormDataContext, CurrentUserContext} from '../../../../../context/context';
import { signup } from '../../../../../actions/auth';
import { useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import visible from '../../../../../Assets/visible.svg';
import invisible from '../../../../../Assets/invisible.svg';

const SignUpFormMobile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [fadeAnim, setFadeAnim] = useContext(FadeAnimContext);
    const [registrationFormData, setRegistrationFormData] = useContext(RegistrationFormDataContext);
    const [isVisible, setIsVisible] = useState(false);

    const checkFirstName = (e) => {
        let lettersRegex = /^[A-Za-z]+$/;
        if(e.target.value.match(lettersRegex)) {
            setFirstNameError(false);
            setFirstNameEmpty(false);
        } else if (e.target.value === '') {
            setFirstNameEmpty(true);
            setFirstNameError(false);
        } else {
            setFirstNameEmpty(false);
            setFirstNameError(true);
        }
        
       
    }

    const checkLastName = (e) => {
        let lettersRegex = /^[A-Za-z]+$/;
        if(e.target.value.match(lettersRegex)) {
            setLastNameError(false);
            setLastNameEmpty(false);
        } else if (e.target.value === '') {
            setLastNameEmpty(true);
            setLastNameError(false);
        } else {
            setLastNameEmpty(false);
            setLastNameError(true);
        }
    }

    const checkEmail = (e) => {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(e.target.value === '') {
            setEmailEmpty(true);
        } else if (e.target.value.match(emailRegex)) {
            setEmailError(false);
            setEmailEmpty(false);
        } else {
            setEmailEmpty(false);
            setEmailError(true);
        }
    }

    const checkPassword = (e) => {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(e.target.value === '') {
            setPasswordEmpty(true);
        } else if (e.target.value.length < 6 && e.target.value.length > 1) {
            setPasswordError(true);
        } else {
            setPasswordEmpty(false);
            setPasswordError(false);
        }
    }

    const handleSubmit = () => {
        
        if (setEmailEmpty || setEmailError || setFirstNameEmpty || setFirstNameError || setLastNameEmpty || setLastNameError || setPasswordEmpty || setPasswordError) {
            console.log('error')
        }
        dispatch(signup(registrationFormData, history));
        
    }

    const handleChange = (e) => {
        setRegistrationFormData({ ...registrationFormData, [e.target.name] : e.target.value})
        
    }

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [firstNameEmpty, setFirstNameEmpty] = useState(false);
    const [lastNameEmpty, setLastNameEmpty] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    return (
        <div className="form__container__mobile">
            <div className={`wrapper ${fadeAnim && "fade"}`} onAnimationEnd={()=>setFadeAnim(false)}>
                <div className="form__title"> 
                    <h2>Sign Up</h2>
                </div>
                <div className="su_form">
                    <form>
                        <div className="form__row__top">
                            <div className="fname__input">
                                <input onChange={(e)=>handleChange(e)} onKeyDown={(e)=>checkFirstName(e)} onKeyPress={(e)=>checkFirstName(e)} onKeyUp={(e)=>checkFirstName(e)} type="text" placeholder="First Name" name="firstName"/>
                                <h2 className={firstNameError ? 'firstName__error error__msg' : firstNameEmpty ? 'firstName__error error__msg' : ''}>
                                    {firstNameError ? 'Only Letters Allowed' : firstNameEmpty ? 'Required *' : ''}
                                </h2>
                            </div>
                            <div className="lname__input">
                                <input onChange={(e)=>handleChange(e)} onKeyDown={(e)=>checkLastName(e)} onKeyPress={(e)=>checkLastName(e)} onKeyUp={(e)=>checkLastName(e)} type="text" placeholder="Last Name" name="lastName"/>
                                <h2 className={lastNameError ? 'lastName__error error__msg' : lastNameEmpty ? 'lastName__error error__msg' : ''}>
                                    {lastNameError ? 'Only Letters Allowed' : lastNameEmpty ? 'Required *' : ''}
                                </h2>
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="email__input">
                                <input onChange={(e)=>handleChange(e)} onKeyDown={(e)=>checkEmail(e)} onKeyPress={(e)=>checkEmail(e)} onKeyUp={(e)=>checkEmail(e)} type="email" placeholder="E-mail Address" name="emailAddress"/>
                                <h2 className={emailError ? 'email__error error__msg' : emailEmpty ? 'email__error error__msg' : ''}>
                                    {emailError ? 'Incorrect Email Address' : emailEmpty ? 'Required *' : ''}
                                </h2>
                            </div>
                        </div>
                        <div className="form__row">
                            <div className="password__input">
                                <input onChange={(e)=>handleChange(e)} onKeyDown={(e)=>checkPassword(e)} onKeyPress={(e)=>checkPassword(e)} onKeyUp={(e)=>checkPassword(e)} type={isVisible ? "text" : "password"}placeholder="Password" name="password"/>
                                <img src={isVisible ? visible : invisible} onClick={()=>setIsVisible(!isVisible)}/>
                                <h2 className={passwordError ? 'password__error error__msg' : passwordEmpty ? 'password__error error__msg' : ''}>
                                    {passwordError ? 'Password must contain at least 6 characters' : passwordEmpty ? 'Required *' : ''}
                                </h2>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="su__buttonArea">
                    <div className="su__btn" onClick={()=>handleSubmit()}>
                        <h3>Sign Up</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpFormMobile
