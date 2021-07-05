const dropdownReducer = (state = [], action) => {

    switch (action.type) {
        case 'FETCH_ALL_OPTIONS' : 
            return action.payload;
        default : 
            return state;

    }

} 

export default dropdownReducer;
