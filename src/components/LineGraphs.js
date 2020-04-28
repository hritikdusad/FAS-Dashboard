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
                fontFamily:'Overpass'
            },
            backgroundColor:"#0C1427"
        },
        title: {
            text: props.Options.Title,
            style:{
                color:'#EEF4FF',
                fontWeight:'bold'
            }
        },
    
        yAxis: {
            title: {
                text: props.Options.YAxisTitle,
                style:{
                    color: '#EEF4FF'
                }
            },
            labels: {
                style: {
                    color: '#EEF4FF'
                }
            },
            tickInterval:props.Options.YAxisTickInterval,
            gridLineWidth:1,
            gridLineColor:'#121F3C'
        },
    
        xAxis: {
            title:{
                text:props.Options.XAxisTitle,
                style:{
                    color: '#EEF4FF'
                }
            },
            categories:props.Options.XAxisLabel,
            tickInterval:props.Options.XAxisTickInterval,
            labels: {
                style: {
                    color: '#EEF4FF'
                }
            },
            gridLineWidth:1,
            gridLineColor:'#121F3C'
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: '#EEF4FF'
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
