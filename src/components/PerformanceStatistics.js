import React from 'react';
import LineGraphs from './LineGraphs';
import ColumnGraphs from './ColumnGraphs';


export default function PerformanceStatistics(props) {
    let Timeline = props.TimeLine;
    let XAxisTitle,XAxisLabel=[];
        if(Timeline === "" || Timeline === "Yearly"){
            XAxisTitle = "Year";
        }else if(Timeline === "Weekly"){
            XAxisTitle = "Weeks";
        }else if(Timeline === "Monthly"){
            XAxisTitle = "Months";
        }else{
            XAxisTitle = "Days";
        }

        if(XAxisTitle === "Year"){
            XAxisLabel = [2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]
        }
        else if(XAxisTitle === "Months"){
            XAxisLabel = ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'];
        }
   let FundPerformanceOptions={
        Title:"Fund Performance",
        XAxisTitle: XAxisTitle,
        XAxisLabel: XAxisLabel,
        YAxisTitle: "Average Fund Performance Time(ms)",
        YAxisTickInterval: 20,
        Data:[49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        Color: "#004185",
        Header:"Fund Performance Details",
        TimeLine: Timeline
    };
    let SignOffDetailsOptions={
        Title: "Sign-Off Details",
        YAxisTitle: "Delay",
        YAxisTickInterval:1,
        XAxisTitle: XAxisTitle,
        XAxisLabel:XAxisLabel,
        XAxisTickInterval:1,
        Data:[4, 5, 5, 6, 9, 11, 13, 15, 1, 2, 3, 4],
        Color:"red",
        Header:"Delay Details",
        TimeLine: Timeline
    };
    return (
        <>
            <ColumnGraphs Options={FundPerformanceOptions}/>
            <LineGraphs Options={SignOffDetailsOptions}/>
        </>
                
    )
}
