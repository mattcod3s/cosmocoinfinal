import React, { useState, createContext, useReducer } from 'react';

const initialLoginFormData = {emailAddress: '', password: ''};
const initialRegistrationFormData = {firstName: '', lastName: '', emailAddress: '', password: ''};



export const SignupStatusContext = createContext();

export const SignupStatusProvider = (props) => {

    const [isSignup, setIsSignup] = useState(true);

    return (
        <SignupStatusContext.Provider value={ [isSignup, setIsSignup] }>
            {props.children}
        </SignupStatusContext.Provider>
    );
}


export const FadeAnimContext = createContext();

export const FadeAnimProvider = (props) => {

    const [fadeAnim, setFadeAnim] = useState(false);

    return (
        <FadeAnimContext.Provider value={ [fadeAnim, setFadeAnim] }>
            {props.children}
        </FadeAnimContext.Provider>
    );
}



export const CurrentUserContext = createContext();


export const CurrentUserProvider = (props) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')));

    return (
        <CurrentUserContext.Provider value={ [currentUser, setCurrentUser] }>
            {props.children}
        </CurrentUserContext.Provider>
    )
}


export const LoginFormDataContext = createContext();


export const LoginFormDataProvider = (props) => {

    const [loginFormData, setLoginFormData] = useState(initialLoginFormData);

    return (
        <LoginFormDataContext.Provider value={ [loginFormData, setLoginFormData] }>
            {props.children}
        </LoginFormDataContext.Provider>
    )
}

export const RegistrationFormDataContext = createContext();


export const RegistrationFormDataProvider = (props) => {

    const [registrationFormData, setRegistrationFormData] = useState(initialRegistrationFormData);

    return (
        <RegistrationFormDataContext.Provider value={ [registrationFormData, setRegistrationFormData] }>
            {props.children}
        </RegistrationFormDataContext.Provider>
    )
}



export const CryptoAddDataContext = createContext();

export const CryptoAddDataProvider = (props) => {

    const [cryptoAddData, setCryptoAddData] = useState({
        id: '', name: '', symbol: '', value: '', percentChange1hr: '', author: '',
    });

    return (
        <CryptoAddDataContext.Provider value={ [cryptoAddData, setCryptoAddData] }>
            {props.children}
        </CryptoAddDataContext.Provider>
    )
}


export const CryptoInfoContext = createContext();

export const CryptoInfoProvider = (props) => {

   const [cryptoInfo, setCryptoInfo] = useState(false);

    return (
        <CryptoInfoContext.Provider value={ [cryptoInfo, setCryptoInfo] }>
            {props.children}
        </CryptoInfoContext.Provider>
    )
}


export const InfoContentContext = createContext();

export const InfoContentProvider = (props) => {

   const [infoContent, setInfoContent] = useState({
       _id: '', id: '', name: '', value: '', symbol: '', percentChange1hr: '', percentChange24hr: '',percentChange7d: '', marketCap: '',
   });

    return (
        <InfoContentContext.Provider value={ [infoContent, setInfoContent] }>
            {props.children}
        </InfoContentContext.Provider>
    )
}


