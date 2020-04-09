import React, { Component } from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import PieCharts from './PieCharts';
import ColumnGraphs from './ColumnGraphs';
import StackedColumnGraphs from './StackedColumnGraphs';
import LineGraphs from './LineGraphs';



export default class DetailTable extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: this.props.open
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
                    >
            <Modal.Header>Profile Picture</Modal.Header>
            <Modal.Content image scrolling>
              <Image size='medium' src='/images/wireframe/image.png' wrapped />
              <Modal.Description>
                <Header>Modal Header</Header>
                <p>
                  This is an example of expanded content that will cause the modal's
                  dimmer to scroll
                </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button primary>
                Proceed <Icon name='chevron right' />
              </Button>
            </Modal.Actions>
          </Modal>
        )
    }
}
