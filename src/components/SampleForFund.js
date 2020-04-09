import React, { Component } from 'react'

export default class SampleForFund extends Component {

    someFn = () =>{
        this.props.callbackfromparent("abc");
    }
    render() {
        this.someFn();
        return (
            <div>
                <h1>Sample it is</h1>
                
            </div>
        )
    }
}
