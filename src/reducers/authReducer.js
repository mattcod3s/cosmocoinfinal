const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case 'AUTH':
            if (action?.data.result === undefined) {
                localStorage.setItem('profile', JSON.stringify({...action?.data.data.data.result}));
                // console.log(action?.data.data.data.result);
                return { ...state, authData: action?.data.data.data.result};
            } else {
                localStorage.setItem('profile', JSON.stringify({...action?.data.result}));
                // console.log(action?.data.result);
                return { ...state, authData: action?.data.result};
            }
            
            
        case 'LOGOUT':
            localStorage.clear();

            return { ...state, authData: null} ;
        default:
            return state;
    }
}

export default authReducer;