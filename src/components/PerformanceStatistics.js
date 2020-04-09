import React from 'react';
import LineGraphs from './LineGraphs';
import ColumnGraphs from './ColumnGraphs';


export default function PerformanceStatistics(props) {
    let Timeline = props.TimeLine;

   let FundPerformanceOptions={
        Title:"Fund Performance",
        Categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov', 'Dec'],
        Data:[49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        YAxisTitle: "Average Fund Performance Time",
        XAxisTitle: "Timeline",
        TimeLine: Timeline,
        Color: "#004185"

        
    };
    let SignOffDetailsOptions={
        Title: "Sign-Off Details",
        YAxisTitle: "Delay",
        Data:[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        Color:"red"
    };
    return (
        <>
            <ColumnGraphs Options={FundPerformanceOptions}/>
            <LineGraphs Options={SignOffDetailsOptions}/>
        </>
                
    )
}
