import React, { Component } from 'react'

export default class Sample extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        };
    }
    componentDidMount(){
        console.log("Component did mount")
        fetch('api/ActiveInactiveFunds')
            .then(Response=>Response.json())
            .then(data=>this.setState({
                data:data
            }));
    }
    render() {
        console.log(this.state);
        console.log(this.props.Data);
        return (
            <div>
                <h1>hd</h1>
            </div>
        )
    }
}
