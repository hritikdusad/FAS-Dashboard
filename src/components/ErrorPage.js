import React, { useState } from 'react';
import { Message, Container, Grid, Segment, Header, Button} from 'semantic-ui-react';
import MainPage from './MainPage';

export default function ErrorPage(props) {
    const[TryMainPage, setTryMainPage] = useState(false);

    function handleClick(){
        setTryMainPage(true);
        console.log("Clicked");
    }

    if(TryMainPage){
        return <MainPage />
    }
    return (
        <Container fluid>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                        <Segment className="Background">
                                <Header
                                        className="Heading"
                                        as='h2'
                                        
                                >
                                    FAS DASHBOARD
                                </Header>
                        </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Message 
                        negative 
                        size='massive'
                >
                    <Message.Header>Error Code {props.StatusCode}</Message.Header>
                    <p>{props.StatusText}</p>
                </Message>
                <Button 
                        primary  
                        onClick={handleClick}
                >
                    Try Again
                </Button>
        </Container>
    )
}
