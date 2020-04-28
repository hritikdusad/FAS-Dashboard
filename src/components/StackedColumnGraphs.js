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
                fontFamily:'OverPass'
            },
            backgroundColor:"#0C1427"
        },
        title: {
            text: props.Options.Title,
            style:{
                color:'#EEF4FF'
            }
        },
        xAxis: {
            title:{
                text:props.Options.XAxisTitle,
                style:{
                    color: '#EEF4FF'
                }
            },
            categories: props.Options.XAxisLabels,
            labels: {
                style: {
                    color: '#EEF4FF'
                }
            }
            
        },
        yAxis: {
            min: 0,
            title: {
                text: props.Options.YAxisTitle,
                style:{
                    color: '#EEF4FF'
                }
            },
            stackLabels: {
                enabled: false
            },
            labels: {
                style: {
                    color: '#EEF4FF'
                }
            },
            tickInterval: props.Options.YAxisTickInterval,
            gridLineColor:'#121F3C'
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
