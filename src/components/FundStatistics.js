import React from 'react';
import ColumnGraphs from './ColumnGraphs';
import { Grid } from 'semantic-ui-react';
import PieCharts from './PieCharts';
import StackedColumnGraphs from './StackedColumnGraphs';

export default function FundStatistics(props) {
    let Funds = props.FundList, Clients = props.ClientList; 
    let ActiveFunds=0,InActiveFunds=0,ActiveClients=0,InActiveClients=0;
    let ActiveInActiveFundsOptions ={}, ActiveInActiveClientsOptions = {}, TotalNumberOfActiveFundsOptions={}, NewClosedFundsOptions={};
    let map = new Map();
    let categories = [], Count = [];
    let Timeline = props.TimeLine;
    
    Funds.map(fund=>{
        if(parseInt(fund.isActive)===1){
            ActiveFunds++;
        }
        else{
            InActiveFunds++;
        }
        return '';
    });

    Clients.map(client=>{
        if(parseInt(client.isActive)===1){
            ActiveClients++;
        }
        else{
            InActiveClients++;
        }
        return '';
    }); 

    Funds.map(fund=>{
        if(parseInt(fund.isActive)===1){
            let year = parseInt(fund.startDateOnFAS.substring(0,4));
            if(map.get(year)===undefined){
                map.set(year,1);
            }
            else{
                map.set(year,map.get(year)+1);
            }
        }
        return '';
    });

    map.forEach((value,key) => {
        categories.push(key);
        Count.push(value);
    });

    TotalNumberOfActiveFundsOptions={
        Title:"Total Number Of Active Funds",
        Categories: categories,
        Data:Count,
        YAxisTitle: "Number Of Funds",
        XAxisTitle: "Year",
        TimeLine: Timeline,
        Color:"#A301C8"
    };

    ActiveInActiveFundsOptions = {
        Title: "Active/InActive Funds",
        Data:[
            {
                y:ActiveFunds,
                name: "Active",
                color:"#0d56f2"
            },
            {
                y:InActiveFunds,
                name:"InActive",
                color:"#68869b"
            }
        ],
        TimeLine:Timeline
    };

    ActiveInActiveClientsOptions = {
        Title: "Active/InActive Clients",
        Data:[
            {
                y:ActiveClients,
                name: "Active",
                color:  "#002060"

            },
            {
                y:InActiveClients,
                name:"InActive",
                color:  "#FF0000"
            }
        ],
        TimeLine:Timeline
    };

    NewClosedFundsOptions={
        Title: "New/Closed Funds",
        XAxisTitle: "Year",
        XAxisLabels:[2012,2013,2016,2017,2018,2020],
        YAxisTitle:"Number Of Funds",
        UpperStackName:"New Funds",
        UpperStackData:[5, 3, 4, 7, 2],
        UpperStackColor:"#003464",
        LowerStackName:"Closed Funds",
        LowerStackData:[2, 2, 3, 2, 1],
        LowerStackColor:"#FDFF00",
        TimeLine:Timeline

    };

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <PieCharts Options={ActiveInActiveFundsOptions}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <PieCharts Options={ActiveInActiveClientsOptions}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column floated="left" width={7}>
                        <ColumnGraphs Options={TotalNumberOfActiveFundsOptions}/>
                    </Grid.Column>
                    <Grid.Column floated="right" width={7}>
                        <StackedColumnGraphs Options={NewClosedFundsOptions}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
