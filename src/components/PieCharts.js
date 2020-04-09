import React, {useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DetailTable from './DetailTable';




export default function PieCharts(props){
  const [showModal, setModal] = useState(false);

  let options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: props.Options.Title
    },
    series: [
      {
        cursor: 'pointer',
        point:{
          events:{
              click: (function() {
                  setModal(!showModal);
                })
          }
      },
        data: props.Options.Data
      }
    ],
  };
  //console.log(props.Options.TimeLine);
  console.log(showModal);

  return (showModal)?<DetailTable open={true} ChartOptions={props.Options} ChartType="Pie"/>:<HighchartsReact highcharts={Highcharts} options={options} />
}