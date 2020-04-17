import React, {useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';

export default function PieCharts(props){
  const [showModal, setModal] = useState(false);
  const [partName, setPartName] = useState('');

  let options = {
    chart: {
      type: 'pie',
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
    plotOptions: {
      series: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: false
          },
          showInLegend: true
        },
          cursor: 'pointer',
          point: {
              events: {
                  click: function () {
                      setPartName(this.name);
                      setModal(!showModal);
                  }
              }
          }
      }
    },
    tooltip:{
      useHTML:true,
      formatter() {
        let point = this.point;
        return `
            <section>
                <span>${point.y} </span>
                <span>${point.name}</span>
            </section>
        `;
    }
    },
    series: [{
        data: props.Options.Data,
    }],
  };
  console.log(partName);
  return (showModal) ?
                        <DetailTable 
                                    open={true} 
                                    ChartOptions={props.Options} 
                                    ChartType="Pie"
                                    PartName={partName}
                                    Data={props.Data}
                                    Table={props.Table}
                        />
                        :
                        <HighchartsReact highcharts={Highcharts} options={options} />
}