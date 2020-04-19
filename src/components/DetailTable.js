import React, { Component } from 'react'
import { Modal, Table } from 'semantic-ui-react';
import PieCharts from './PieCharts';
import ColumnGraphs from './ColumnGraphs';
import StackedColumnGraphs from './StackedColumnGraphs';
import LineGraphs from './LineGraphs';



export default class DetailTable extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: this.props.open,
            FundList:[]
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
     // let state = (this.props.PartName === "Active")?1:0;
      let TableData = (
        <>
        <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Start Date On FAS</Table.HeaderCell>
                        <Table.HeaderCell>Creation Date On FAS</Table.HeaderCell>
                      </Table.Row>
                </Table.Header>
        <Table.Body>
                        {/* {this.state.FundList.map((element)=>{
                          if(element.isActive === state)
                            return (
                              <Table.Row>
                                <Table.Cell>{element.fundId}</Table.Cell>
                                <Table.Cell>{element.fundName}</Table.Cell>
                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                <Table.Cell>{element.createdOnFAS}</Table.Cell>
                              </Table.Row>
                            );

                            return '';
                          })} */}
        </Table.Body>
        </>
    );
      
            
                        
        return (
            <Modal open={this.state.isModalOpen}
                    onClose={this.handleClose}
            >
            <Modal.Header>{this.props.ChartOptions.Header}</Modal.Header>
            <Modal.Content image scrolling>
              <Modal.Description>
                  <Table celled>
                    {TableData}
                  </Table>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )
    }
}
