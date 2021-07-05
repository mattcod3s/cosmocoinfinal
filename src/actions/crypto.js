import * as api from '../api/';

export const fetchCryptos = () => async (dispatch) => {

    try {
        const { data } = await api.fetchCryptos();
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const addCryptos = (crypto) => async (dispatch) => {

    try {
        const { data } = await api.addCryptos(crypto);
        dispatch({type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCryptos = (id, updatedCrypto) => async (dispatch) => {

    try {
        const { data } = await api.updateCryptos(id, updatedCrypto);
        console.log(data, updatedCrypto);
        dispatch({type: 'UPDATE', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCryptos = (id) => async (dispatch) => {

    try {
        await api.deleteCryptos(id);
        dispatch({type: 'DELETE', payload: id});
    } catch (error) {
        console.log(error.message);
    }
}