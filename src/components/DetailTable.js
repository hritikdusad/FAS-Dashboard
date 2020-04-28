import React, { Component } from 'react'
import { Modal} from 'semantic-ui-react';
import PieCharts from './PieCharts';
import ColumnGraphs from './ColumnGraphs';
import StackedColumnGraphs from './StackedColumnGraphs';
import LineGraphs from './LineGraphs';
import TableData from './TableData';
import MainPage from './MainPage';



export default class DetailTable extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: this.props.open,
            DataList:this.props.ChartOptions.DataList
        }
        this.handleClose = this.handleClose.bind(this);
    }

    
    handleClose(){
        this.setState({
            isModalOpen:false
        });
    }

    render() {
      if(this.state.isModalOpen === false){
          if(this.props.ChartType === "Pie"){
            return <PieCharts Options={this.props.ChartOptions} />
          }
          else if(this.props.ChartType === "Column"){
            return <ColumnGraphs Options={this.props.ChartOptions} />
          }
          else if(this.props.ChartType === "StackedColumn"){
            return <StackedColumnGraphs Options={this.props.ChartOptions} />
          }
          else{
            return <LineGraphs Options={this.props.ChartOptions} />
          }
      }

        return (
            <Modal open={this.state.isModalOpen}
                    onClose={this.handleClose}
                    dimmer='inverted'
                    closeIcon
            >
            <Modal.Header as='h1'>
                {this.props.ChartOptions.Header}
              </Modal.Header>
            <Modal.Content image scrolling>
              <Modal.Description>
                  <TableData 
                              Data={this.state.DataList} 
                              PartName={this.props.PartName} 
                              XAxisPoint={this.props.XAxisPoint} 
                              SelectedFund={this.props.ChartOptions.selectedFund} 
                              Title={this.props.ChartOptions.Title}
                              Timeline={this.props.ChartOptions.TimeLine}
                  />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )
    }
}
