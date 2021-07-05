import React, {useEffect, useContext, useState} from 'react';
import './dashboardStyles.scss';
import CryptoInfo from './CryptoInfo/CryptoInfo';
import Watchlist from './Watchlist/Watchlist';
import HeaderMain from '../../Headers/HeaderMain/HeaderMain';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCryptos} from '../../../actions/crypto';
import { CryptoInfoContext, InfoContentContext } from '../../../context/context'


const Dashboard = () => {
    const [cryptoInfo, setCryptoInfo] = useContext(CryptoInfoContext);
    const dispatch = useDispatch();
    const cryptos = useSelector((state) => state.cryptoReducer);
    const [infoContent, setInfoContent] = useContext(InfoContentContext);
    const [isMinus, setIsMinus] = useState(false);
    useEffect(() => {
        dispatch(fetchCryptos());
        if (infoContent.percentChange1hr < 0) {
            setIsMinus(true);
        } 
    }, [dispatch, cryptos]);

    return (
        <div className="dashboard__page">
            <HeaderMain />
           {cryptoInfo ?  <CryptoInfo _id={infoContent._id} id={infoContent.id} name={infoContent.name} symbol={infoContent.symbol} value={infoContent.value} percentChange1hr={infoContent.percentChange1hr} percentChange24hr={infoContent.percentChange24hr} percentChange7d={infoContent.percentChange7d} marketCap={infoContent.marketCap}/>  : <Watchlist isMinus={isMinus} />}
        </div>
    )
}

export default Dashboard;
