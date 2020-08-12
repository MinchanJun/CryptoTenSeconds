import React, { useEffect } from 'react';
import { initChart, drawChart, removeText } from '../chart/sideChart';
const SideChartRender = (props) => {

    useEffect(() => {
        removeText()
        drawChart(props.updatedData)
        
    },[props.updatedData])
    return (
        <div id="chart2"></div>
    )

}

export default SideChartRender;