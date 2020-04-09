import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export default function StackedColumnGraphs(props) {

    let options = {
        chart: {
            type: 'column'
        },
        title: {
            text: props.Options.Title
        },
        xAxis: {
            title:{
                text:props.Options.XAxisTitle
            },
            categories: props.Options.XAxisLabels
        },
        yAxis: {
            min: 0,
            title: {
                text: props.Options.YAxisTitle
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: props.Options.UpperStackName,
            data: props.Options.UpperStackData,
            color: props.Options.UpperStackColor
        }, {
            name: props.Options.LowerStackName,
            data: props.Options.LowerStackData,
            color: props.Options.LowerStackColor           
        }]
    };
    console.log(props.Options.TimeLine);
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
}
