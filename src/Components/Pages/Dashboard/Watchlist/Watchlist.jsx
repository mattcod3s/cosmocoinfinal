import React, {useContext, useEffect, useState,} from 'react';
import './watchlistStyles.scss';
import addButton from '../../../../Assets/button.svg';
import Crypto from './Dropdown/Crypto/Crypto';
import Dropdown from './Dropdown/Dropdown';
import {useSelector, useDispatch} from 'react-redux';
import arrowOut from '../../../../Assets/arrowOut.svg';
import {fetchDropdown} from '../../../../actions/dropdown';
import {updateCryptos} from '../../../../actions/crypto';
import CryptoWidget from './CryptoOption/CryptoWidget';

const Watchlist = () => {
    const dispatch = useDispatch();
    const cryptos = useSelector((state) => state.cryptoReducer);
    const dropdown = useSelector((state) => state.dropdownReducer);
    
    const [isAddCrypto, setIsAddCrypto] = useState(false);

    const noCryptosAdded = (
        <div className="no__crypto__added">
            
                <h2>No Cryptos Added</h2>
            
        </div>
    );

    let watchedCryptos = (
        <>
        {cryptos.map((crypto) => (
            
                <CryptoWidget isAdd={isAddCrypto} key={crypto._id} _id={crypto._id}  id={crypto.id} name={crypto.name} symbol={crypto.symbol} value={crypto.value} />
            
        ))}
        </>
    );
    

    useEffect(() => {
        dispatch(fetchDropdown());
    }, [dispatch, isAddCrypto])

    return (
        <>
            <div className={isAddCrypto ? "dropdown__cont" : "dropdown__closed"}>
                <img src={arrowOut} onClick={()=>setIsAddCrypto(false)}/>
                <Dropdown isActive={isAddCrypto}/>
            </div>
            <div className="watchlist__container">
                <div className="watchlist__header">
                    <div className="header__title">
                        <h3>Your Watchlist</h3>
                    </div>
                    <div className="header__add">
                        <div className="add__area" onClick={()=>setIsAddCrypto(true)}>
                            <div className="add_icon">
                                <img src={addButton}/>
                            </div>
                            <div className="add_text">
                                <h4>Add CryptoCurrency</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="watchlist__main">
                    {cryptos.length > 0 ? watchedCryptos : noCryptosAdded}
                </div>
            </div>
        </>
    )
}

export default Watchlist;
