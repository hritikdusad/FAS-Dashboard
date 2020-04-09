import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class NewClosedActiveFunds extends Component {
    render() {
        let options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'New/Closed Funds'
            },
            xAxis: {
                title:{
                    text:"Year"
                },
                categories: [2012, 2013, 2014, 2016, 2017]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Number of Funds'
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
                name: 'New',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Closed',
                data: [2, 2, 3, 2, 1]             
            }]
        }
        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        )
    }
}
