import React, { Component } from 'react';
import { Container, Grid, Segment, Header, Tab, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import FundStatistics from './FundStatistics';
import PerformanceStatistics from './PerformanceStatistics';
import ErrorPage from './ErrorPage';
import './Modified_CSS/Style.css';



const TimelineOptions = [
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
            SignOffDetails:[],
            selectedFund:'',
            selectedTimeline:'',
            loadErrorPage: false,
            StatusCode: '',
            StatusText:''
        };
        this.handleClientChange = this.handleClientChange.bind(this);
        this.handleFundChange = this.handleFundChange.bind(this);
        this.handleTimelineChange = this.handleTimelineChange.bind(this);
        
    }
    
    componentDidMount(){
        /* Fetching Clients Data */
        fetch('api/Clients')
            .then(Response=>{
                if(Response.status!==200){
                    this.setState({
                        loadErrorPage: true,
                        StatusCode: Response.status,
                        StatusText:Response.statusText
                    })
                }
                return Response.json()})
            .then(Data=>this.setState({
                clientList:Data
            }))
            .catch(err => console.log(err));
        
        /* Fetching Funds Data */
        fetch('api/Funds')
            .then(Response=>{
                if(Response.status!==200){
                    this.setState({
                        loadErrorPage: true,
                        StatusCode: Response.status,
                        StatusText:Response.statusText
                    })
                }
                return Response.json()})
            .then(Data=>this.setState({
                fundList:Data,
                filteredFundList:Data
            }))
            .catch(err=>console.log(err));

        /* Fetching SignOff Data */
        fetch('api/signoffdetails')
            .then(Response=>{
                if(Response.status!==200){
                    this.setState({
                        loadErrorPage: true,
                        StatusCode: Response.status,
                        StatusText:Response.statusText
                    })
                }
                return Response.json()})
            .then(Data=>this.setState({
                SignOffDetails:Data
            }))
            .catch(err=>console.log(err));

    }

    /* Fetching Filtered Fund Lists */
    fetchfund(Client){
        let funds = [],filteredFunds = [];
        fetch('api/Clients/'+Client)
            .then(Response => Response.json())
            .then(Data=>{
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



    handleClientChange(event, { value }){
        this.setState({ 
            selectedClient:value,
            filteredFundList:[],
            selectedFund:''
        });
        this.fetchfund(value);
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
                                                <FundStatistics 
                                                                ClientList={this.state.clientList} 
                                                                FundList={this.state.filteredFundList} 
                                                                TimeLine={this.state.selectedTimeline}
                                                />
                                            </Tab.Pane> 
                            },
                            { 
                            menuItem: 'Performance Statistics',
                            render: () => <Tab.Pane>
                                            <PerformanceStatistics 
                                                                    ClientList={this.state.clientList} 
                                                                    FundList={this.state.filteredFundList} 
                                                                    TimeLine={this.state.selectedTimeline}
                                                                    SelectedFundId={this.state.selectedFund}
                                                                    SignOffDetails = {this.state.SignOffDetails}
                                            />
                                            </Tab.Pane> 
                            }
                    ];
        /* Adding Client Options in the Drop Down */
        this.state.clientList.forEach(data => {
            Clientoptions.push({
                key:data.clientId,
                text:data.clientName,
                value:data.clientId
            });
        });

        /*  Adding Fund Options in the Drop Down*/
        this.state.filteredFundList.forEach(data=>{
            Fundoptions.push({
                key:data.fundId,
                text:data.fundName,
                value:data.fundId
            });
        });

        /* Conditional Rendering of Error Page if Response Status is not 200 */
        if(this.state.loadErrorPage){
            return <ErrorPage StatusCode={this.state.StatusCode} StatusText={this.state.StatusText} />
        }

        /* Loading Dimmer when the data is loaded to states of the component */
        if(this.state.clientList.length === 0 || this.state.fundList.length === 0){
            return (
                <Dimmer active inverted>
                    <Loader inverted size="massive">Loading</Loader>
                </Dimmer>   
            );
        }

        /* In all Other Cases This is the JSX To Be Rendered */
        return (
            <Container fluid>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column>
                        <Segment className="Background">
                                <Header
                                        className="Heading"
                                        as='h2'
                                        
                                >
                                    FAS DASHBOARD
                                </Header>
                        </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column width={4}>
                            <Dropdown
                                onChange={this.handleClientChange}
                                options={Clientoptions}
                                placeholder='Select Client'
                                search
                                selection
                                openOnFocus
                                value={this.state.selectedClient}
                                   
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Dropdown
                                onChange={this.handleFundChange}
                                options={Fundoptions}
                                placeholder='Select Fund'
                                search
                                selection
                                openOnFocus
                                value={this.state.selectedFund}
                                className="TimelineFilter"
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Dropdown
                                onChange={this.handleTimelineChange}
                                options={TimelineOptions}
                                placeholder='Select Timeline'
                                search
                                selection
                                openOnFocus
                                value={this.state.selectedTimeline}
                            />
                        </Grid.Column>     
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Tab
                                    menu={{ color: 'blue', attached: true, tabular: false }}
                                    panes={Tabs}
                            >
                            </Tab>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                        
            </Container>

            
        )
    }
}
