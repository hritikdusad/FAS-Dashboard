import React, {useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';

export default function PieCharts(props){
  const [showModal, setModal] = useState(false);
  const [partName, setPartName] = useState('');
  const [XAxisPoint] = useState(0);

  let options = {
    chart: {
      type: 'pie',
      style:{
        fontFamily:'serif'
      },
      backgroundColor:"#2A2A2A"
    },
    legend: {
      itemStyle: {
         color: '#FFFFFF'
      }
   
},
    title: {
      text: props.Options.Title,
      style:{
        color:'#FFFFFF',
        fontWeight:'bold'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: false
        },
        showInLegend: true
      },
      series: {
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
        name:"Data",
        colorByPoint:true,
        data: props.Options.Data,
        size:'80%',
        innerSize:'50%',
    }],
  };


  return (showModal) ?
                        <DetailTable 
                                    open={true} 
                                    ChartOptions={props.Options} 
                                    ChartType="Pie"
                                    PartName={partName}
                                    XAxisPoint={XAxisPoint}
                        />
                        :
                        <HighchartsReact highcharts={Highcharts} options={options} />
}