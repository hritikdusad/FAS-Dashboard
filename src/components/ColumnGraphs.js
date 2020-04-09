import React,{useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';


export default function ColumnGraphs(props) {
    const [showModal, setModal] = useState(false);

    let options = {
        chart: {
            type: 'column'
        },
        title: {
            text: props.Options.Title
        },
        xAxis: {
            categories: props.Options.Categories,
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: props.Options.YAxisTitle
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
            }
        },
        series: [{
            name: props.Options.XAxisTitle,
            point:{
                events:{
                    click: (function() {
                        setModal(!showModal);
                      })
                }
            },
            data: props.Options.Data,
            color: props.Options.Color
    
        }]
    }      
    console.log(props.Options.TimeLine);
    return (showModal)?<DetailTable open={true} ChartOptions={props.Options} ChartType="Column"/>:<HighchartsReact highcharts={Highcharts} options={options} />
    }

