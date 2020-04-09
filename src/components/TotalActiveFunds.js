 import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dimmer, Loader} from 'semantic-ui-react';

export default class NewClosedActiveFunds extends Component {
    constructor(props){
        super(props);
        this.state={
            categories:[],
            Data:[],
            isLoading:true
        };
    }

    componentDidMount(){
        fetch('api/Funds')
            .then(Response=>Response.json())
            .then(Data=>{
                let m = new Map();
                let categories = [], Count = [];
                Data.map(data=>{
                    if(parseInt(data.isActive)===1){
                        let year = parseInt(data.startDateOnFAS.substring(0,4));
                        if(m.get(year)===undefined){
                            m.set(year,1);
                        }
                        else{
                            m.set(year,m.get(year)+1);
                        }
                    }
                    return 'a';
                });
                m.forEach((value,key) => {
                    categories.push(key);
                    Count.push(value);
                });
                this.setState({
                    categories:categories,
                    Data:Count,
                    isLoading:false
                });
            });
    }
    render() {
        let options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Total Number Of Active Funds'
            },
            xAxis: {
                categories: this.state.categories,
                crosshair: true,
                title:{
                    text:'Year'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number Of Funds'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
            series: [
                {
                    name: 'Total Active Funds',
                    data: this.state.Data,
                    events:{
                        click: function(event){
                            console.log(this.name);
                        }
                    }
                }
        ]
        }
        return (
            this.state.isLoading?
                <Dimmer active inverted>
                  <Loader inverted size="large"/>
                </Dimmer> :
                <HighchartsReact highcharts={Highcharts} options={options} />
        )
    }
}
