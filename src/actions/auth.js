import * as api from '../api';

export const signin = (loginFormData, history) => async (dispatch) => {
    try {
        //login user
        const  data  = await api.signIn(loginFormData);

        dispatch({type: 'AUTH', data: {data} })

        history.push('/dashboard');
    } catch (error) {
        // console.log(error, 'hi');
    }
}

export const signup = (registrationFormData, history) => async (dispatch) => {
    try {
        //register user

        //
        const data = await api.signUp(registrationFormData);

        dispatch({type: 'AUTH', data: {data} })

        history.push('/dashboard');
    } catch (error) {
        // console.log(error);
    }
}