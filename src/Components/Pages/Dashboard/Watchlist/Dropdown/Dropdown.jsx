import React, { useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import './dropdownStyles.scss';
import Crypto from './Crypto/Crypto';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';


const Dropdown = ({isActive}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const dropdown = useSelector((state) => state.dropdownReducer);
    const [displayData, setDisplayData] = useState();
    const { data } = dropdown;
    useEffect(() => {
        setDisplayData(data);
    }, [dispatch, dropdown, location])

    
    
    const sumData = (
        <div className="dropdown__menu">
            {displayData === undefined ? <h2>hello</h2> : 
            <>
           {displayData.map((option) => (
               <Crypto key={option.id} id={option.id} name={option.name} symbol={option.symbol} value={option.quote.USD.price} percentChange1hr={option.quote.USD.percent_change_1h }/>
           ))}
            </>}
        </div>
    )

    const otherData = (
        <div className="dropdown__menu">
            <h2>hi</h2>
        </div>
    )

   
    return (
        <>
        {isActive ? sumData : otherData}
        </>
    )
}

export default Dropdown;
