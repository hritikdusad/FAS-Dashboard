import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class SignOffDetailsGraph extends Component {

    constructor(props){
        super(props);
        this.state = {
            datafromfunddropdown:null
        };
    }

    mycallback = (datafromchild)=>{
        this.setState({
            datafromfunddropdown:datafromchild
        });
    }   
    render() {
        const options = {

            title: {
                text: 'Sign-Off Details of Fund'
            },
        
            yAxis: {
                title: {
                    text: 'Delay'
                }
            },
        
            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2017'
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        
            series: [{
                name: 'Delay',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
                color: 'red'
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        };
        
        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        )
    }
}
