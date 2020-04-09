import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Dimmer, Loader} from 'semantic-ui-react';
import DetailTable from './DetailTable';

export default class ActiveInactiveClients extends Component {

    constructor(props){
        super(props);
        this.state={
            InActiveClients:'',
            ActiveClients:'',
            isLoading: true,
            showModal: false
        };
    }

    componentDidMount(){
        fetch('api/Clients')
            .then(Response=>Response.json())
            .then(Data=>{
                let InActiveClients = 0, ActiveClients = 0;
                Data.map(data=>{
                    if(parseInt(data.isActive)===1){
                        ActiveClients++;
                    }
                    else{
                        InActiveClients++;
                    }
                    return 'a';
                }); 
                this.setState({
                    InActiveClients:InActiveClients,
                    ActiveClients:ActiveClients,
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
              text: 'Active/Inactive Clients'
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
                    y: this.state.ActiveClients,
                    name: "Active",
                }, {
                    y: this.state.InActiveClients,
                    name: "InActive",
                }]
              }
            ]
          };

          if(this.state.showModal){
            return <DetailTable name="hritik" open={true}/>
            }
        return (
            
            this.state.isLoading?
            <Dimmer active inverted>
                <Loader inverted size="large"/>
            </Dimmer>   : 
            <HighchartsReact highcharts={Highcharts} options={options} />
        )
    }
}
