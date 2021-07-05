import React, { useEffect, useState, useContext, useRef } from 'react';
import './cryptoWidgetStyles.scss';
import deleteIcon from '../../../../../Assets/deleteOff.svg';
import infoIcon from '../../../../../Assets/infoIcon.svg';
import refreshIcon from '../../../../../Assets/refresh.svg';
import { useDispatch, useSelector } from 'react-redux';
import {CryptoInfoContext, InfoContentContext} from '../../../../../context/context';
import { deleteCryptos, updateCryptos } from '../../../../../actions/crypto';



const CryptoWidget = ({_id, id, name, symbol, value, percentChange1hr}) => {
    const dispatch = useDispatch();
    const [cryptoInfo, setCryptoInfo] = useContext(CryptoInfoContext);
    const [infoContent, setInfoContent] = useContext(InfoContentContext);
    const cryptos = useSelector((state) => state.cryptoReducer);
    const dropdown = useSelector((state) => state.dropdownReducer);
    const { data } = dropdown;
    const [currentPercent, setCurrentPercent] = useState('');
    const [updatedCrypto, setUpdatedCrypto] = useState({
        _id: '' ,id: '', name: '', symbol: '', value: '',
    });  
    const [currentPrice, setCurrentPrice] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    const cryptoCompareData = async () => {
        if (isMounted) {
            const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${symbol}&tsym=USD&limit=119&api_key=${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`);
            const json = await response.json();
            const data = json.Data.Data
            const times = data.map(obj => obj.time)
            const prices = data.map(obj => obj.high)
            const currentPrice = prices[119];
            return {
            times,
            prices,
            currentPrice
            }
        }
    }

   
    async function fetchCurrentPrice () {
        if (isMounted) {
            let { currentPrice } = await cryptoCompareData();
            //setCurrentPrice(currentPrice);
        }
        
    }

    useEffect(() => {
        setIsMounted(true);
        if (updatedCrypto.id !== '') {
            dispatch(updateCryptos(_id, updatedCrypto));
        }
        fetchCurrentPrice();
        getPercent();
        return () => {
            setIsMounted(false);
            clearTimeout(getPercent);
        }
    }, [updatedCrypto]);


    /*
    const handleRefreshClick = () => {
        
        data.map((d) => {
            if (d.name === name) {
                let newPrice = String(Math.round(d.quote.USD.price * 100) / 100);
                if (newPrice !== value) {
                    //console.log("update me")
                    setUpdatedCrypto({
                        _id: _id, id: id, name: name, symbol: symbol, value: newPrice, 
                    })
                }
            }
        })
        
    }*/

    const handleInfoClick = () => {
        data.map((d) => {
            if (d.name === name) {
                setInfoContent({
                    _id: _id, 
                    id: id, 
                    name: name, 
                    symbol: symbol, 
                    value: String(Math.round(d.quote.USD.price * 100) / 100),
                    percentChange1hr: String(Math.round(d.quote.USD.percent_change_1h * 100) / 100),
                    percentChange24hr: String(Math.round(d.quote.USD.percent_change_24h * 100) / 100),
                    percentChange7d: String(Math.round(d.quote.USD.percent_change_7d * 100) / 100),
                    marketCap: String(Math.round(d.quote.USD.market_cap)),
                });
            }
        })

        
        setCryptoInfo(true);
        console.log(infoContent);
    }

    setTimeout(getPercent, 3000);
    function getPercent() {
        if (isMounted) {
            if (data === undefined) {
                // console.log('ff')
            } else {
                data.map((d) => {
                    if (d.name === name) {
                        setCurrentPercent(String(Math.round(d.quote.USD.percent_change_1h * 100) / 100));
                        setCurrentPrice(String(Math.round(d.quote.USD.price * 100) / 100));
                    }
                })
                clearTimeout(getPercent);
            }
        }
        
    }

    return (
        <div className="crypto__widget">
            <div className="crypto__symbol">
                <h1>{symbol}</h1>
            </div>
            <div className="crypto__name">
                <h2>{name}</h2>
            </div>
            
            <div className="crypto__value">
                <span style={currentPercent < 0 ? {color: 'rgb(255, 0, 0)', backgroundColor: 'rgba(255, 20, 20, 0.3)', border: '1px solid rgb(255, 0, 0)'} : {color: 'rgb(141, 228, 70)', backgroundColor: 'rgba(56, 116, 8, 0.3)', border: '1px solid rgb(141, 228, 70)'}}>{`%${currentPercent}`}</span><h2 style={currentPercent < 0 ? {color: 'rgb(255, 0, 0)'} : {color: 'rgb(141, 228, 70)'}}>{`$ ${currentPrice}`}</h2>
            </div>
            <div className="crypto__delete">
                <div className="delete__button">
                    <img src={infoIcon} onClick={()=>handleInfoClick()}/>
                    <img src={deleteIcon} onClick={()=>dispatch(deleteCryptos(_id))}/>
                </div>
            </div>
        </div>
    )
}

export default CryptoWidget;
