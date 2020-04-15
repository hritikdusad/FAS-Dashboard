import React from 'react';
import ColumnGraphs from './ColumnGraphs';
import { Grid } from 'semantic-ui-react';
import PieCharts from './PieCharts';
import StackedColumnGraphs from './StackedColumnGraphs';

const MonthMap = [[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0]];

export default function FundStatistics(props) {
    let Funds = props.FundList, Clients = props.ClientList;
    let ActiveFunds=0,InActiveFunds=0,ActiveClients=0,InActiveClients=0;
    let ActiveInActiveFundsOptions ={}, ActiveInActiveClientsOptions = {}, TotalNumberOfActiveFundsOptions={}, NewClosedFundsOptions={};
    let XAxisLabel = [], TotalActiveFunds = [], newFunds = [], closedFunds = [];
    let Timeline = props.TimeLine;
    let XAxisTitle;

        if(Timeline === "" || Timeline === "Yearly"){
            XAxisTitle = "Year";
        }else if(Timeline === "Weekly"){
            XAxisTitle = "Weeks";
        }else if(Timeline === "Monthly"){
            XAxisTitle = "Months";
        }else{
            XAxisTitle = "Days";
        }

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

    if(XAxisTitle === "Year"){
        let ActiveFundmap = new Map();
        Funds.map(fund=>{
            if(parseInt(fund.isActive)===1){
                let year = parseInt(fund.startDateOnFAS.substring(0,4));
                if(ActiveFundmap.get(year)===undefined){
                    ActiveFundmap.set(year,1);
                }
                else{
                    ActiveFundmap.set(year,ActiveFundmap.get(year)+1);
                }
            }
            return '';
        });
    
        ActiveFundmap.forEach((value,key) => {
            XAxisLabel.push(key);
            TotalActiveFunds.push(value);
            newFunds.push(value);
        });

        Funds.map(fund=>{
            let closedFundmap = new Map();
            if(parseInt(fund.isActive)===0){
                let year = parseInt(fund.startDateOnFAS.substring(0,4));
                if(closedFundmap.get(year)===undefined){
                    closedFundmap.set(year,1);
                }
                else{
                    closedFundmap.set(year,closedFundmap.get(year)+1);
                }
            }
        });

        ActiveFundmap.forEach((value,key) => {
            closedFunds.push(value);
        });
    }
    else if(XAxisTitle === "Months"){
        let monthsmap = new Map(MonthMap);
        let monthsmap2 = new Map(MonthMap);
        let currentYear = new Date().getFullYear();
        Funds.map(fund=>{
            if(parseInt(fund.startDateOnFAS.substring(0,4)) === currentYear){
                if(parseInt(fund.isActive)===1){
                    let Month = parseInt(fund.startDateOnFAS.substring(5,7));
                    monthsmap.set(Month,monthsmap.get(Month)+1);
                }
                else if(parseInt(fund.isActive)===0){
                    let Month = parseInt(fund.startDateOnFAS.substring(5,7));
                    monthsmap2.set(Month,monthsmap2.get(Month)+1);
                }
            }
            return '';
        });
        monthsmap.forEach((value,key) => {
            TotalActiveFunds.push(value);
            newFunds.push(value);
        });
        monthsmap2.forEach((value,key) => {
            closedFunds.push(value);
        });
        XAxisLabel = ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'];
    }
    
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
        Header:"Fund Details",
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
        Header:"Client Details",
        TimeLine:Timeline
    };


    TotalNumberOfActiveFundsOptions={
        Title:"Total Active Funds",
        XAxisTitle: XAxisTitle,
        XAxisLabel: XAxisLabel,
        YAxisTitle: "Number Of Funds",
        YAxisTickInterval: 1,
        Data:TotalActiveFunds,
        Color:"#A301C8",
        Header:"Active Fund Details",
        TimeLine: Timeline
    };


    NewClosedFundsOptions={
        Title: "New/Closed Funds",
        XAxisTitle: XAxisTitle,
        XAxisLabels:XAxisLabel,
        YAxisTitle:"Number Of Funds",
        YAxisTickInterval:1,
        UpperStackName:"New Funds",
        UpperStackData:newFunds,
        UpperStackColor:"#003464",
        LowerStackName:"Closed Funds",
        LowerStackData:closedFunds,
        LowerStackColor:"#FDFF00",
        Header:"New/Closed Fund Details",
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
                        <PieCharts Options={ActiveInActiveClientsOptions} />
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
