import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions/actions';
import { initChart } from '../chart/sideChart';
import { treeMapInitialize } from '../chart/treeMap';
import SideChartRender from './SideChartRender.jsx';
import TreeMapRender from './TreeMapRender.jsx';
import Subscribe from './Subscribe.jsx';

//main store that will dispatch all the functionality
const App = () => {
    
    const dispatch = useDispatch()
    const addData = (data) => dispatch(actions.addData(data))
    const updateData = (data) => dispatch(actions.updateData(data));
    const data = useSelector(state => state.coin.coinData)
    const updatedData = useSelector(state => state.coin.coinData)

    useEffect(() => {
        
        initChart();
        treeMapInitialize();
       
        // fetch('/api')
        // .then((res) => res.json())
        // .then((anotherResponse) => {
        //     anotherResponse.forEach((value) => {
        //         addData(value)
        //     })
        // })

        // const interval = setInterval(() => {
        //     fetch('/api')
        //     .then((res) => res.json())
        //     .then((anotherResponse) => {
        //         anotherResponse.forEach((value) => {
        //             updateData(value)
        //         })
        //     })
        // }, 5000);
        
        
    }, [])

    const newArr = []
    for(let i = 0; i < data.length; i++){
        newArr.push(<p>{data[i].name}</p>)
    }
    return (
        <div id="app-children">
            <div>
                <h3>Real time price chart</h3>
                <SideChartRender data={data} updatedData={updatedData}  addData={addData} updateData={updateData}/>
            </div>          
            <div>
                <h3>Real time volume change chart</h3>
                <TreeMapRender data={data} updatedData={updatedData} addData={addData} updateData={updateData}/>
            </div>
            <div>
                <Subscribe />
            </div>
        </div>
    )
}

export default App;
