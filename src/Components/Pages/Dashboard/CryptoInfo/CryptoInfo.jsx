import React, {useEffect, useState, useContext} from 'react';
import './cryptoInfoStyles.scss';
import {CryptoInfoContext} from '../../../../context/context';
import {Chart} from 'chart.js'; 
const CryptoInfo = ({_id, id, name, symbol, value, percentChange1hr, percentChange24hr, percentChange7d, marketCap}) => {
    const [cryptoInfo, setCryptoInfo] = useContext(CryptoInfoContext);
    const [isNegative, setIsNegative] = useState(false);
    const [chartColor, setChartColor] = useState('rgb(141,228,70)');
    const [isMobile, setIsMobile] = useState(false);
    
    const cryptoCompareData = async () => {
        const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${symbol}&tsym=USD&limit=119&api_key=${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`);
        const json = await response.json();
        const data = json.Data.Data
        const times = data.map(obj => obj.time)
        const prices = data.map(obj => obj.high)
        return {
          times,
          prices
        }
    }

  

    useEffect(()=> {
        if (percentChange1hr < 0) {
            setIsNegative(true);
            setChartColor('rgb(255,0,0)');
            console.log(percentChange1hr)
        } else {
            console.log(percentChange1hr)
            setIsNegative(false);
            setChartColor('rgb(141,228,70)');
        }

       
        const ismobile = window.innerWidth < 600;
        if (ismobile !== isMobile) setIsMobile(ismobile);
        
        const result = cryptoCompareData();
        console.log(result);
        printCoinChart();
    }, [isNegative]);

    let createCoinChart;

    async function printCoinChart() {
        let { times, prices } = await cryptoCompareData();
        
        let coinChart = document.getElementById('btcChart').getContext('2d');
      
        let gradient = coinChart.createLinearGradient(0, 0, 0, 400);
      
        gradient.addColorStop(0, `${isNegative ? 'rgba(255,0,0,0.5)' : 'rgba(141, 228, 70,0.5)'}`);
        gradient.addColorStop(isMobile ? 0.2 : 0.6, `${isNegative ? 'rgba(255,0,0,0)' : 'rgba(141, 228, 70,0)'}`);
      
        Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
        Chart.defaults.global.defaultFontSize = 12;
      
        createCoinChart = new Chart(coinChart, {
          type: 'line',
          data: {
            labels: times,
            datasets: [{
              label: '$',
              data: prices,
              backgroundColor: gradient,
              borderColor: chartColor,
              borderJoinStyle: 'round',
              borderCapStyle: 'round',
              borderWidth: 3,
              pointRadius: 0,
              pointHitRadius: 10,
              lineTension: .2,
            }]
          },
      
          options: {
            title: {
              display: false,
              text: 'Heckin Chart!',
              fontSize: 35
            },
      
            legend: {
              display: false
            },
      
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
      
            scales: {
              xAxes: [{
                display: false,
                gridLines: {}
              }],
              yAxes: [{
                display: false,
                gridLines: {}
              }]
            },
      
            tooltips: {
              callbacks: {
                //This removes the tooltip title
                title: function() {}
             },
              //this removes legend color
              displayColors: false,
              yPadding: 20,
              xPadding: 10,
              position: 'nearest',
              caretSize: 10,
              backgroundColor: 'rgba(255,255,255,.9)',
              bodyFontSize: 20,
              bodyFontColor: '#303030',
              bodyFontFamily: 'Poppins',
            }
          }
        });
      }


    return (
        <div className={"crypto__info__box"}>
            <div className="exit" onClick={()=>setCryptoInfo(false)}>
                <h1>X</h1>
            </div>
            <div className="info__main">
                <div className="info__main__top">
                    <div className="symbol"><h2>{symbol}</h2></div>
                    <div className="value">
                        <div className="percent1hr">
                            <h4 style={isNegative ? {color: 'rgb(255, 0, 0)', backgroundColor: 'rgba(255, 20, 20, 0.3)'} : {color: 'rgb(141, 228, 70)', backgroundColor: 'rgba(56, 116, 8, 0.3)'}}>{`%${percentChange1hr}`}</h4>
                        </div>
                        <h2 style={isNegative ? {color: 'rgb(255, 0, 0)'} : {color: 'rgb(141, 228, 70)'}}> {`$ ${value}`}</h2>
                    </div>
                </div>
                <div className="info__mid__row">
                    <div className="topNameArea">
                        <div className="name"><span>Cryptocurrency : </span><h2>{`${name}`}</h2></div>
                    </div>
                    <div className="bottomDataArea">
                        <div className="marketCap"><span>Market Cap : </span><h2>{`$ ${marketCap}`}</h2></div>
                    </div>
                </div>
                <div className="info__chart__area">
                    <canvas id="btcChart"></canvas>
                </div>
            </div>
        </div>
    )
}

export default CryptoInfo;
