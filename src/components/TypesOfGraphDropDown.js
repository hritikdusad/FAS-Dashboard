import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
    { key: 1, text: 'Sign-Off Details', value: 'Signoffdetails' },
    { key: 2, text: 'Fund Performance', value: 'FundPerformance'}
  ];

export default class TypesOfGraphDropDown extends Component {

    constructor(props){
        super(props);
        this.state={
            selectedValue:''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event, { value }){
        this.setState({ 
            selectedValue:value 
        });
        console.log(this.state);
    }

    render() {
        return (
              <Dropdown
                onChange={this.handleChange}
                options={options}
                placeholder='Choose an option'
                selection
                value={this.state.selectedValue}
              />
        );
      }
}


