import * as api from '../api/';

export const fetchDropdown = () => async (dispatch) => {

    try {
        const { data } = await api.fetchDropdown();
        dispatch({type: 'FETCH_ALL_OPTIONS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
} 