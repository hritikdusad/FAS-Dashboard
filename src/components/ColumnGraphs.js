import React,{useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';


export default function ColumnGraphs(props) {
    const [showModal, setModal] = useState(false);
    const [xAxisPoint, setXAxisPoint] = useState('');

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
            categories: props.Options.XAxisLabel,
            crosshair: true,
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
            tickInterval: props.Options.YAxisTickInterval,
            labels: {
                style: {
                    color: '#000000'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            series:{
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
        series: [{
            showInLegend:false,
            data: props.Options.Data,
            color: props.Options.Color,
            name: props.Options.YAxisTitle
        }]
    }
   
    return (showModal) ? 
                        <DetailTable 
                                    open={true} 
                                    ChartOptions={props.Options} 
                                    ChartType="Column"
                                    partName=""
                                    XAxisPoint={xAxisPoint}
                        />
                        :
                        <HighchartsReact highcharts={Highcharts} options={options} />
    }

