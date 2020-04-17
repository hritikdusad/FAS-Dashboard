import React from 'react';
import ColumnGraphs from './ColumnGraphs';
import { Grid } from 'semantic-ui-react';
import PieCharts from './PieCharts';
import StackedColumnGraphs from './StackedColumnGraphs';


export default function FundStatistics(props) {
    let Funds = props.FundList, Clients = props.ClientList,XAxisTitle,Timeline = props.TimeLine;
    let ActiveFunds=0,InActiveFunds=0,ActiveClients=0,InActiveClients=0;
    let ActiveInActiveFundsOptions ={}, ActiveInActiveClientsOptions = {}, TotalNumberOfActiveFundsOptions={}, NewClosedFundsOptions={};
    let XAxisLabel = [], TotalActiveFunds = [], newFunds = [], closedFunds = [];

    /* Condition For Labeling X Axis of the Graphs */
        if(Timeline === "" || Timeline === "Yearly"){
            XAxisTitle = "Year";
        }
        else if(Timeline === "Weekly"){
            XAxisTitle = "Weeks";
        }
        else if(Timeline === "Monthly"){
            XAxisTitle = "Months";
        }
        else{
            XAxisTitle = "Days";
        }

    /* Active InActive Funds Calculation */
    Funds.map(fund=>{
        if(parseInt(fund.isActive)===1){
            ActiveFunds++;
        }
        else{
            InActiveFunds++;
        }
        return '';
    });

    /*Active Inactive Client Calculation*/
    Clients.map(client=>{
        if(parseInt(client.isActive)===1){
            ActiveClients++;
        }
        else{
            InActiveClients++;
        }
        return '';
    }); 

    /* When Selected Timeline is Defult/Year */

    if(XAxisTitle === "Year"){
        let ActiveFundmap = {};
        Funds.map(fund=>{
            let year = parseInt(fund.startDateOnFAS.substring(0,4));
                if(ActiveFundmap[year]===undefined){
                    ActiveFundmap[year]=1;
                }
            if(parseInt(fund.isActive)===1){
                    ActiveFundmap[year]=ActiveFundmap[year]+1;
            }
            return '';
        });
    
        for(const key in ActiveFundmap){
            XAxisLabel.push(key);
            TotalActiveFunds.push(ActiveFundmap[key]);
            newFunds.push(ActiveFundmap[key]);
        }
        let closedFundmap = {};
        Funds.map(fund=>{
            let year = parseInt(fund.startDateOnFAS.substring(0,4));
                if(closedFundmap[year]===undefined){
                    closedFundmap[year]=1;
                }
            if(parseInt(fund.isActive)===0){
                    closedFundmap[year]=closedFundmap[year]+1;
            }
            return '';
        });
        for(const key in closedFundmap){
            closedFunds.push(closedFundmap[key]);
        }
    }
    
    /* When Selected Timeline is Months (Data collected for current year)*/ 
    else if(XAxisTitle === "Months"){
        let newmonthsmap = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
        let closedmonthsmap2 = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0};
        let currentYear = new Date().getFullYear();
        Funds.map(fund=>{
            if(parseInt(fund.startDateOnFAS.substring(0,4)) === currentYear){
                let Month = parseInt(fund.startDateOnFAS.substring(5,7));
                if(parseInt(fund.isActive)===1){
                    newmonthsmap[Month] = newmonthsmap[Month]+1;
                }
                else if(parseInt(fund.isActive)===0){
                    closedmonthsmap2[Month] = closedmonthsmap2[Month]+1;
                }
            } 
            return '';
        });
        for(const key in newmonthsmap){
            TotalActiveFunds.push(newmonthsmap[key]);
            newFunds.push(newmonthsmap[key]);
        }
        
        for(const key in closedmonthsmap2){
            closedFunds.push(closedmonthsmap2[key]);
        }
        XAxisLabel = ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'];
    }

    // else if(XAxisTitle === "Weeks"){
    //     XAxisLabel = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    // }

    else if(XAxisTitle ==="Days"){
        let days = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
        let newmonthsmap ={}, closedmonthsmap2 = {};
        for(let i=1;i<=days;i++){
            let s = "Day "+i;
            XAxisLabel.push(s);
            closedmonthsmap2[i] = 0;
            newmonthsmap[i] = 0; 
        }
        Funds.forEach(element => {
            if(parseInt(element.startDateOnFAS.substring(5,7)) === new Date().getMonth()){
                let day = parseInt(element.startDateOnFAS.substring(8,10));
                if(element.isActive === 1){
                    newmonthsmap[day] += 1;
                }
                else{
                    closedmonthsmap2[day] += 1;
                }
            }
        });
        for(const key in newmonthsmap){
            TotalActiveFunds.push(newmonthsmap[key]);
            newFunds.push(newmonthsmap[key]);
        }
        
        for(const key in closedmonthsmap2){
            closedFunds.push(closedmonthsmap2[key]);
        }
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
            <Grid stackable>
                <Grid.Row columns={2}>
                    <Grid.Column width={8}>
                        <PieCharts 
                                    Options={ActiveInActiveFundsOptions}
                                    Data={Funds}
                                    Table="Funds"
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <PieCharts 
                                    Options={ActiveInActiveClientsOptions}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column floated="left" width={7}>
                        <ColumnGraphs 
                                        Options={TotalNumberOfActiveFundsOptions}
                        />
                    </Grid.Column>
                    <Grid.Column floated="right" width={7}>
                        <StackedColumnGraphs 
                                                Options={NewClosedFundsOptions}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
