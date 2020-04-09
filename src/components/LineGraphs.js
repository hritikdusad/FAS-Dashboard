import React,{useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';

export default function LineGraphs(props) {
    const [showModal, setModal] = useState(false);

    const options = {
        title: {
            text: props.Options.Title
        },
    
        yAxis: {
            title: {
                text: props.Options.YAxisTitle
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
            name: props.Options.YAxisTitle,
            data: props.Options.Data,
            color: props.Options.Color,
            point:{
                events:{
                    click: (function() {
                        setModal(!showModal);
                      })
                }
            }
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
    return (showModal)?<DetailTable open={true} ChartOptions={props.Options} ChartType="Line"/>:<HighchartsReact highcharts={Highcharts} options={options} />
}
