import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions/actions';
import { initChart } from '../chart/sideChart';
import SideChartRender from './SideChartRender.jsx';

//main store that will dispatch all the functionality

const App = (props) => {
    
    const dispatch = useDispatch()
    const updateData = (data) => dispatch(actions.addData(data))
    const data = useSelector(state => state.coin.coinData)
    //**********need to update the data not adding the data here
    //npm run dev1
    useEffect(() => {
        
        initChart();
        const interval = setInterval(() => {
            fetch('/api')
            .then((res) => res.json())
            .then((anotherResponse) => {
                anotherResponse.forEach((value) => {
                    updateData(value)
                })
            })
        }, 5000);

        
    }, [])

    const newArr = []
    for(let i = 0; i < data.length; i++){
        newArr.push(<p>{data[i].name}</p>)
    }
    return (
        <div>
            <h1>Hi</h1>
            <SideChartRender data={data} updateData={updateData}/>
        </div>
    )
}

export default App;


    // const values = [
    //     {name: "Bitcoin", symbol: "BTCUSD", price: 11273.82, volume: 50737.86558678, changesInHourPercent: "49.00"},
    //     {name: "Ethereum", symbol: "ETHUSD", price: 373.6023, volume: 1053628.38241956, changesInHourPercent: "18.00"},
    //     {name: "Litecoin", symbol: "LTCUSD", price: 53.5618, volume: 1040521.85187026, changesInHourPercent: "91.00"},{name: "Ripple", symbol: "XRPUSD", price: 0.278, volume: 183427160.82767963, changesInHourPercent: "101.00"},
    //     {name: "Bitcoin Cash", symbol: "BCHUSD", price: 276.2372, volume: 269188.75303909, changesInHourPercent: "64.00"},
    //     {name: "Monero", symbol: "XMRUSD", price: 85.6443, volume: 48747.4740298, changesInHourPercent: "57.00"},
    // ]