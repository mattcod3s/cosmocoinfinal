import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {SignupStatusProvider,CryptoInfoProvider,InfoContentProvider, CryptoAddDataProvider, FadeAnimProvider,  CurrentUserProvider, RegistrationFormDataProvider, LoginFormDataProvider} from './context/context';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <CurrentUserProvider>
            
                <RegistrationFormDataProvider>
                    <LoginFormDataProvider>
                        <SignupStatusProvider>
                            <FadeAnimProvider>
                                <CryptoAddDataProvider>
                                    <InfoContentProvider>
                                        <CryptoInfoProvider>
                                            <App />
                                        </CryptoInfoProvider>
                                    </InfoContentProvider>
                                </CryptoAddDataProvider>
                            </FadeAnimProvider>
                        </SignupStatusProvider>
                    </LoginFormDataProvider>
                </RegistrationFormDataProvider>
           
        </CurrentUserProvider>
    </Provider>
, document.getElementById('root'));