import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dimmer, Loader} from 'semantic-ui-react';
// import DetailTable from './DetailTable';

export default class ActiveInactiveFunds extends Component {

    constructor(props){
        super(props);
        this.state={
            InActiveFunds:'',
            ActiveFunds:'',
            isLoading:true
        };
    }

    componentDidMount(){
        fetch('api/Funds')
            .then(Response=>Response.json())
            .then(Data=>{
                let InActiveFunds = 0, ActiveFunds = 0;
                Data.map(d=>{
                    if(parseInt(d.isActive)===1){
                        ActiveFunds++;
                    }
                    else{
                        InActiveFunds++;
                    }
                    return '';
                });
                this.setState({
                    InActiveFunds:InActiveFunds,
                    ActiveFunds:ActiveFunds,
                    isLoading:false
                });
            })
            .catch(err=>console.log(err));
    }

    render() {
        let options = {
            chart: {
              type: 'pie'
            },
            title: {
              text: 'Active/Inactive Funds'
            },
            series: [
              {
                cursor: 'pointer',
                point:{
                    events:{
                        click: (function(component) {
                            return function() {
                              component.setState({
                                showModal: true
                              });
                            };
                          })(this)
                    }
                },
                data: [{
                    y: this.state.ActiveFunds,
                    name: "Active",
                    color: "#00FF00"
                }, {
                    y: this.state.InActiveFunds,
                    name: "InActive",
                    color: "#FF00FF"
                }]
              }
            ],
          };

        //   if(this.state.showModal){
        //     return <DetailTable open={true}/>
        //     }
        return (      
                this.state.isLoading?
                <Dimmer active inverted>
                  <Loader inverted size="large"/>
                </Dimmer> :
                <HighchartsReact highcharts={Highcharts} options={options} />   
        );
    }
}
