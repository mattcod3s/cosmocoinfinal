import React, {useEffect, useState, useContext} from 'react';
import {useDispatch} from 'react-redux';
import {CryptoAddDataContext} from '../../../../../../context/context';
import './cryptoStyles.scss';
import {addCryptos} from '../../../../../../actions/crypto';
import confirmation from '../../../../../../Assets/confirmation.svg';
import cancel from '../../../../../../Assets/x-button.svg';
const ClickOutHandler = require('react-onclickout');

const Crypto = ({id, symbol, name, value}) => {
    const dispatch = useDispatch();

    const roundedValue = Math.round(value * 100) / 100;
    const [isToBeConfirmed, setIsToBeConfirmed] = useState(false);

    const [cryptoAddData, setCryptoAddData] = useContext(CryptoAddDataContext);

    const handleCreate = (coinName, coinSymbol, coinId, coinValue, ) => {
        setCryptoAddData({
            id: coinId, name: coinName, symbol: coinSymbol, value: coinValue, author: [JSON.parse(localStorage.getItem('profile'))?.email || JSON.parse(localStorage.getItem('profile'))?.emailAddress],
        });
        if (isToBeConfirmed===false) {
            setIsToBeConfirmed(true);
        }
        
    }

    const handleConfirm = () => {
        
        setIsToBeConfirmed(false);
        dispatch(addCryptos(cryptoAddData));
    }

    const handleCancel = () => {
        //console.log("cancelled : ", cryptoAddData);
        setIsToBeConfirmed(false);
        
    }

    const onClickout = () => {
        setIsToBeConfirmed(false);
    }
    return (
        <ClickOutHandler onClickOut={()=>onClickout()}>
            <div className="crypto__wrapper" onClick={()=>handleCreate(name, symbol, id, roundedValue)}>
                <div className="crypto__symbol"><h2>{symbol}</h2></div>
                <div className={isToBeConfirmed ? "crypto__name__gone" : "crypto__name"}><h2>{name}</h2></div>
                <div className={isToBeConfirmed ? "crypto__confirm_active" : "crypto__confirm"}>
                    <div className="confirm" onClick={()=>handleConfirm()}>
                        <img src={confirmation}/>
                    </div>
                    <div className="cancel" onClick={()=>handleCancel()}>
                        <img src={cancel}/>
                    </div>
                </div>
            </div>
        </ClickOutHandler>
    )
}

export default Crypto;
