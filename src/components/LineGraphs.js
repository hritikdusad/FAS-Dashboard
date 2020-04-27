import React,{useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';

export default function LineGraphs(props) {
    const [showModal, setModal] = useState(false);
    const [xAxisPoint, setXAxisPoint] = useState('');
    const [partName, setPartName] = useState('');

    const options = {
        chart:{
            type:'line',
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
    
        yAxis: {
            title: {
                text: props.Options.YAxisTitle,
                style:{
                    fontWeight: 'bold',
                    color: '#FFFFFF'
                }
            },
            labels: {
                style: {
                    color: '#FFFFFF'
                }
            },
            tickInterval:props.Options.YAxisTickInterval
        },
    
        xAxis: {
            title:{
                text:props.Options.XAxisTitle,
                style:{
                    fontWeight: 'bold',
                    color: '#FFFFFF'
                }
            },
            categories:props.Options.XAxisLabel,
            tickInterval:props.Options.XAxisTickInterval,
            labels: {
                style: {
                    color: '#FFFFFF'
                }
            }
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: '#FFFFFF'
             }
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                shadow:true,
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

        series: props.Options.Data,
    
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

    return (showModal) ? 
                        <DetailTable 
                                    open={true} 
                                    ChartOptions={props.Options} 
                                    ChartType="Line"
                                    PartName={partName}
                                    XAxisPoint={xAxisPoint} 
                        />
                        :
                        <HighchartsReact highcharts={Highcharts} options={options} />
}
