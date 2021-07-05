 const cryptoReducer = (cryptos = [], action) => {

    switch (action.type) {
        case 'FETCH_ALL' : 
            return action.payload;
        case 'CREATE' : 
            return [...cryptos, action.payload];
        case 'UPDATE' : 
            return cryptos.map((crypto) => crypto._id === action.payload._id ? action.payload : crypto)
        case 'DELETE' : 
            return cryptos.filter((crypto) => crypto._id !== action.payload);
        default : 
            return cryptos;
    }

} 

export default cryptoReducer;
