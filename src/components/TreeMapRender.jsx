import React, { useEffect } from 'react';
import { drawTreeMapChart, removePie } from '../chart/treeMap';
const TreeMapRender = (props) => {

    useEffect(() => {
        removePie()
        drawTreeMapChart(props.updatedData)
        
    },[props.updatedData])
    return (
        <div id="chart1"></div>
    )

}

export default TreeMapRender;