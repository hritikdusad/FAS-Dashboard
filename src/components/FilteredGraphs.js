import React, { Component } from 'react';
import {Grid, Segment} from 'semantic-ui-react';
import ClientsDropDown from './ClientsDropDown';
import TimelineDropDown from './TimelineDropDown';

export default class FilteredGraphs extends Component {
    render() {
        return (
            <div>
                <Segment secondary>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <ClientsDropDown />
                            </Grid.Column>
                            <Grid.Column>
                                <TimelineDropDown />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
}
