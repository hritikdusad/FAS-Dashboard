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
            },
            backgroundColor:"#2A2A2A"
        },
        title: {
            text: props.Options.Title,
            style:{
                color:'#FFFFFF',
                fontWeight:'bold'
            }
        },
        xAxis: {
            title:{
                text:props.Options.XAxisTitle,
                style:{
                    fontWeight: 'bold',
                    color: '#FFFFFF'
                }
            },
            categories: props.Options.XAxisLabels,
            labels: {
                style: {
                    color: '#FFFFFF'
                }
            }
            
        },
        yAxis: {
            min: 0,
            title: {
                text: props.Options.YAxisTitle,
                style:{
                    fontWeight: 'bold',
                    color: '#FFFFFF'
                }
            },
            stackLabels: {
                enabled: true,
                style: {
                    // fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            },
            labels: {
                style: {
                    color: '#FFFFFF'
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
            headerFormat: '<p>{point.x}</p><br/>',
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


    return (showModal) ?
                        <DetailTable 
                                    open={true}
                                    ChartOptions={props.Options}
                                    ChartType="StackedColumn"
                                    PartName={partName}
                                    XAxisPoint={xAxisPoint}
                        />
                        :
                        <HighchartsReact highcharts={Highcharts} options={options} />
}
