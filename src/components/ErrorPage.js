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
                            <Segment inverted>
                                <Header 
                                        as='h1' 
                                        textAlign='center' 
                                        inverted 
                                        color="blue"
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
                        positive 
                        fluid  
                        onClick={handleClick}
                >
                    Try Again
                </Button>
        </Container>
    )
}
