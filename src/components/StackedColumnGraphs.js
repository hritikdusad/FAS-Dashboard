import React, {useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';


export default function StackedColumnGraphs(props) {
    const [showModal, setModal] = useState(false);
    const [xAxisPoint, setXAxisPoint] = useState('');
    const [partName, setPartName] = useState('');

    let options = {
        chart: {
            type: 'column',
            style:{
                fontFamily:'serif'
            }
        },
        title: {
            text: props.Options.Title,
            style:{
                color:'#000000',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text:props.Options.XAxisTitle,
                style:{
                    fontWeight: 'bold',
                    color: '#000000'
                }
            },
            categories: props.Options.XAxisLabels,
            labels: {
                style: {
                    color: '#000000'
                }
            }
            
        },
        yAxis: {
            min: 0,
            title: {
                text: props.Options.YAxisTitle,
                style:{
                    fontWeight: 'bold',
                    color: '#000000'
                }
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
            },
            labels: {
                style: {
                    color: '#000000'
                }
            },
            tickInterval: props.Options.YAxisTickInterval
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
            },
            series:{
                cursor: 'pointer',
                point:{
                        events:{
                            click: function(){
                                setXAxisPoint(this.category);
                                setPartName(this.series.name);
                                setModal(!showModal);
                            }
                        }
                }
            }
        },
        series: [{
            name: props.Options.UpperStackName,
            data: props.Options.UpperStackData,
            color: props.Options.UpperStackColor
        }, 
        {
            name: props.Options.LowerStackName,
            data: props.Options.LowerStackData,
            color: props.Options.LowerStackColor
        }]
    };

    console.log(xAxisPoint);
    console.log(partName);
    return (showModal) ?
                        <DetailTable 
                                    open={true}
                                    ChartOptions={props.Options}
                                    ChartType="StackedColumn"
                        />
                        :
                        <HighchartsReact highcharts={Highcharts} options={options} />
}
