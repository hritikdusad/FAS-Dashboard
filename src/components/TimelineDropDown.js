import React, { Component } from 'react';
import { Dropdown} from 'semantic-ui-react';

const options = [
    { key: 1, text: 'Yearly', value: 'Yearly' },
    { key: 2, text: 'Monthly', value: 'Monthly'},
    { key: 3, text: 'Weekly', value: 'Weekly'},
    { key: 4, text: 'Daily', value: 'Daily'}
  ];

export default class TimelineDropDown extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            selectedYear:''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, {value}){
        this.setState({
            selectedYear:value
        });
        console.log(this.state.selectedYear);
    }

    render() {
        return (
                <Dropdown
                    onChange={this.handleChange}
                    options={options}
                    placeholder='Timeline'
                    selection
                    value={this.state.selectedYear}
                />
        )
    }
}
