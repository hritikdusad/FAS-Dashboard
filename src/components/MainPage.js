import React, { Component } from 'react';
import { Container, Grid, Segment, Header, Tab, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import FundStatistics from './FundStatistics';
import PerformanceStatistics from './PerformanceStatistics';

const Timelineoptions = [
    { key: 1, text: 'Yearly', value: 'Yearly' },
    { key: 2, text: 'Monthly', value: 'Monthly'},
    { key: 3, text: 'Weekly', value: 'Weekly'},
    { key: 4, text: 'Daily', value: 'Daily'}
];

export default class MainPage extends Component {

    constructor(props){
        super(props);
        this.state={
            clientList:[],
            selectedClient:'',
            fundList:[],
            filteredFundList:[],
            selectedFund:'',
            selectedTimeline:''

        };
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleFundChange = this.handleFundChange.bind(this);
        this.handleTimelineChange = this.handleTimelineChange.bind(this);
        
    }
    
    componentDidMount(){
        fetch('api/Clients')
            .then(Response=>Response.json())
            .then(Data=>this.setState({
                clientList:Data
            }))
            .catch(err => console.log(err));
        fetch('api/Funds')
            .then(Response=>Response.json())
            .then(Data=>this.setState({
                fundList:Data,
                filteredFundList:Data
            }))
            .catch(err=>console.log(err));
    }

    handleClientChange(event, { value }){
        this.setState({ 
            selectedClient:value 
        });
        this.fetchfund(value);
    }

    fetchfund(Client){
        let funds = [],filteredFunds = [];
        fetch('api/Clients/'+Client)
            .then(Response => Response.json())
            .then(Data=>{
                console.log(Data);
                Data.map((element)=>{
                    element.fundId.map((fund)=>{
                        funds.push(fund);
                        return '';
                    });
                    return '';
                })
            })
            .then(()=>{
                this.state.fundList.forEach((fund)=>{
                    funds.forEach((extractedfund)=>{
                        if(extractedfund === fund.fundId){
                            filteredFunds.push(fund);
                        }
                    });
                });
                this.setState({
                    filteredFundList:filteredFunds
                });
            })
            .catch(err=>console.log(err));
    }

    handleFundChange(event, {value}){
        this.setState({
            selectedFund:value
        });
    }

    handleTimelineChange(event,{value}){
        this.setState({
            selectedTimeline:value
        });
    }
    render() {
        const Clientoptions = [],Fundoptions = [];
        const Tabs = [
                        { 
                        menuItem: 'Fund Statistics',
                        render: () => <Tab.Pane>
                                            <FundStatistics ClientList={this.state.clientList} FundList={this.state.filteredFundList} TimeLine={this.state.selectedTimeline}/>
                                        </Tab.Pane> 
                        },
                        { 
                        menuItem: 'Performance Statistics',
                        render: () => <Tab.Pane>
                                        <PerformanceStatistics ClientList={this.state.clientList} FundList={this.state.filteredFundList} TimeLine={this.state.selectedTimeline}/>
                                    </Tab.Pane> 
                        }
            ];
        
        this.state.clientList.forEach(data => {
            Clientoptions.push({
                key:data.clientId,
                text:data.clientName,
                value:data.clientId
            });
        });

        this.state.filteredFundList.forEach(data=>{
            Fundoptions.push({
                key:data.fundId,
                text:data.fundName,
                value:data.fundId
            });
        });

        if(this.state.clientList.length === 0 || this.state.fundList.length === 0){
            return (
                <Dimmer active inverted>
                    <Loader inverted size="massive">Loading</Loader>
                </Dimmer>   
            );
        }
        return (
            <Container fluid>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment inverted>
                                <Header as='h1' textAlign='center' inverted color="blue">FAS DASHBOARD</Header>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Dropdown
                                onChange={this.handleClientChange}
                                options={Clientoptions}
                                placeholder='Choose Clients'
                                selection
                                value={this.state.selectedClient}   
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Dropdown
                                onChange={this.handleFundChange}
                                options={Fundoptions}
                                placeholder='Choose Funds'
                                selection
                                value={this.state.selectedFund}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Dropdown
                                onChange={this.handleTimelineChange}
                                options={Timelineoptions}
                                placeholder='Timeline'
                                selection
                                value={this.state.selectedTimeline}
                            />
                        </Grid.Column>     
                    </Grid.Row>
                </Grid>
                <Tab
                        menu={{ color: 'blue', attached: false, tabular: false }}
                        panes={Tabs}
                    >
                </Tab>
            </Container>

            
        )
    }
}
