import React, { Component } from 'react';
import { Dropdown} from 'semantic-ui-react';
import SignOffDetailsGraph from './SignOffDetailsGraph';
import TimelineDropDown from './TimelineDropDown';

export default class FundsDropDown extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedFund:'',
            extractedfunds:[],
            allfunds:[],
            LoadfilteredGraph:false
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchFunds = this.fetchFunds.bind(this);
    }

    componentDidUpdate(prevProps){
        if(this.props.Client !== prevProps.Client){
            console.log("Updated the render" + this.props.Client);
            this.fetchData(this.props.Client);
        }   
    }

    fetchData(Client){
        fetch('api/Clients/'+Client)
        .then(Response=>Response.json())
        .then(Data=>{
            let extractedfunds = [];
            Data.forEach(element => {
                element.fundId.map(a=>{
                    extractedfunds.push(a);
                });
            });
            this.setState({
                extractedfunds:extractedfunds
            });
        })
        .catch((err)=>console.log(err));
    }

    handleChange(event, {value}){
        this.setState({
            selectedFund:value
        });
    }

    fetchFunds(){
        fetch('api/Funds')
        .then(Response => Response.json())
        .then(Data=>this.setState({
            allfunds:Data
        }))
        .catch(err=>console.log(err));
    }
    render() {
        let filteredFunds = [],options = [];
        if(this.state.extractedfunds.length === 0){
            this.fetchData(this.props.Client);
        }
        if(this.state.allfunds.length === 0){
            this.fetchFunds();
        }

        this.state.allfunds.forEach((fund)=>{
            this.state.extractedfunds.forEach((extractedfund)=>{
                if(extractedfund === fund.fundId){
                    filteredFunds.push(fund);
                }
            });
        });

        filteredFunds.forEach((element)=>{
            options.push({
                key:element.fundtId,
                text:element.fundName,
                value:element.fundId
            })
        });
        return (
            <>
               <Dropdown
                    onChange={this.handleChange}
                    options={options}
                    placeholder='Choose Funds'
                    selection
                    value={this.state.selectedFund}
                />
                
            </>
            
        )
    }
}

