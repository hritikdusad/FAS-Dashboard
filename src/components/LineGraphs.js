import React,{useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';

export default function LineGraphs(props) {
    const [showModal, setModal] = useState(false);
    const [xAxisPoint, setXAxisPoint] = useState('');
    const options = {
        chart:{
            type:'line',
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
    
        yAxis: {
            title: {
                text: props.Options.YAxisTitle,
                style:{
                    fontWeight: 'bold',
                    color: '#000000'
                }
            },
            labels: {
                style: {
                    color: '#000000'
                }
            },
            tickInterval:props.Options.YAxisTickInterval
        },
    
        xAxis: {
            title:{
                text:props.Options.XAxisTitle,
                style:{
                    fontWeight: 'bold',
                    color: '#000000'
                }
            },
            categories:props.Options.XAxisLabel,
            tickInterval:props.Options.XAxisTickInterval,
            labels: {
                style: {
                    color: '#000000'
                }
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
                shadow:true,
                cursor: 'pointer',
                point:{
                        events:{
                            click: function(){
                                setXAxisPoint(this.category);
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
    console.log(xAxisPoint);
    return (showModal) ? 
                        <DetailTable 
                                    open={true} 
                                    ChartOptions={props.Options} 
                                    ChartType="Line" 
                        />
                        :
                        <HighchartsReact highcharts={Highcharts} options={options} />
}
