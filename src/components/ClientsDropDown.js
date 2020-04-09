import React, { Component } from 'react';
import { Dropdown} from 'semantic-ui-react';
import FundsDropDown from './FundsDropDown';

export default class ClientsDropDown extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedClient:'',
            Data:[]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, { value }){
        this.setState({ 
            selectedClient:value 
        });
    }
     
    componentDidMount(){
        fetch('api/Clients')
            .then(Response=>Response.json())
            .then(Data=>this.setState({
                Data:Data
            }))
            .catch(err => console.log(err));
    }
    render() {
        const options = [];
        this.state.Data.forEach(data => {
            options.push({     
                key:data.clientId,
                text:data.clientName,
                value:data.clientId
            });
        });
        if(this.state.selectedClient === ''){
            return (
                <>
                    <Dropdown
                            onChange={this.handleChange}
                            options={options}
                            placeholder='Choose Clients'
                            selection
                            value={this.state.selectedClient}
                    >
                    </Dropdown>
                    
                     
                 </>
             )
        }
        
        return (
            <>
                
                <Dropdown
                    onChange={this.handleChange}
                    options={options}
                    placeholder='Choose Clients'
                    selection
                    value={this.state.selectedClient}
                />
                
                <FundsDropDown Client={this.state.selectedClient}/>
                
            </>
        )
    }
}