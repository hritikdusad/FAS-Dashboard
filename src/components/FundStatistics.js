import React from 'react';
import ColumnGraphs from './ColumnGraphs';
import { Grid, Segment } from 'semantic-ui-react';
import PieCharts from './PieCharts';
import StackedColumnGraphs from './StackedColumnGraphs';
import LineGraphs from './LineGraphs';


export default function FundStatistics(props) {
    let Funds = props.FundList, XAxisTitle,Timeline = props.TimeLine;
    let ActiveFunds=0,InActiveFunds=0,YearlyRenewalFunds=0,QuarterlyRenewalFunds=0,MonthlyRenewalFunds=0,WeeklyRenewalFunds=0;
    let ActiveInActiveFundsOptions ={}, TotalNumberOfActiveFundsOptions={}, NewClosedFundsOptions={}, PeriodWiseFundsOptions={}, YearWiseFundTypesOptions={};
    let XAxisLabel = [], TotalActiveFunds = [], newFunds = [], closedFunds = [];
    let Clients = props.ClientList,ActiveClients=0,InActiveClients=0, ActiveInActiveClientsOptions = {};
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

    /* PeriodWise Funds*/

    Funds.map(fund=>{
        if(fund.renewalPeriod === "Yearly"){
            YearlyRenewalFunds++;
        }
        else if(fund.renewalPeriod === "Quarterly"){
            QuarterlyRenewalFunds++;
        }
        else if(fund.renewalPeriod === "Monthly"){
            MonthlyRenewalFunds++;
        }
        else if(fund.renewalPeriod === "Weekly"){
            WeeklyRenewalFunds++;
        }
        return '';
    })


    /* When Selected Timeline is Defult/Year */

    if(XAxisTitle === "Year"){
        let ActiveFundmap = {};
        Funds.map(fund=>{
            let year = parseInt(fund.startDateOnFAS.substring(0,4));
                if(ActiveFundmap[year]===undefined){
                    ActiveFundmap[year]=0;
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
                    closedFundmap[year]=0;
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

    else if(XAxisTitle === "Weeks"){
        let newWeekMap = {'Week 1':0,'Week 2':0,'Week 3':0,'Week 4':0}, closedWeekMap ={'Week 1':0,'Week 2':0,'Week 3':0,'Week 4':0};
        let currentYear = new Date().getFullYear();
        let PreviousMonth = new Date().getMonth();
        let numberOfDays = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
        Funds.map(fund=>{
            if(parseInt(fund.startDateOnFAS.substring(0,4)) === currentYear){
                let Month = parseInt(fund.startDateOnFAS.substring(5,7));
                if(PreviousMonth === Month){
                    let day = parseInt(fund.startDateOnFAS.substring(8,10));
                    if(day>=1 && day<=7){
                        if(parseInt(fund.isActive)===1){
                            newWeekMap['Week 1'] = newWeekMap['Week 1']+1;
                        }
                        else if(parseInt(fund.isActive)===0){
                            closedWeekMap['Week 1'] = closedWeekMap['Week 1']+1;
                        }
                    }
                    else if(day>=8 && day <=14){
                        if(parseInt(fund.isActive)===1){
                            newWeekMap['Week 2'] = newWeekMap['Week 2']+1;
                        }
                        else if(parseInt(fund.isActive)===0){
                            closedWeekMap['Week 2'] = closedWeekMap['Week 2']+1;
                        }
                    }
                    else if(day>=15 && day <=21){
                        if(parseInt(fund.isActive)===1){
                            newWeekMap['Week 3'] = newWeekMap['Week 3']+1;
                        }
                        else if(parseInt(fund.isActive)===0){
                            closedWeekMap['Week 3'] = closedWeekMap['Week 3']+1;
                        }
                    }
                    else if(day>=22 && day <=numberOfDays){
                        if(parseInt(fund.isActive)===1){
                            newWeekMap['Week 4'] = newWeekMap['Week 4']+1;
                        }
                        else if(parseInt(fund.isActive)===0){
                            closedWeekMap['Week 4'] = closedWeekMap['Week 4']+1;
                        }
                    }
                }
                
            } 
            return '';
        });

        for(const key in newWeekMap){
            TotalActiveFunds.push(newWeekMap[key]);
            newFunds.push(newWeekMap[key]);
        }
        
        for(const key in closedWeekMap){
            closedFunds.push(closedWeekMap[key]);
        }

        XAxisLabel=['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    }

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


    /* Year Wise Fund Types */
    let MasterFeederData=[],CapitalCallData=[],RegularData=[],ModalData=[],XAxisLabelYearWiseFunds=[];
    let MasterFeederDataMap={},CapitalCallDataMap={},RegularDataMap={},ModalDataMap={};

    Funds.map((fund)=>{
        let year = parseInt(fund.startDateOnFAS.substring(0,4));
        if(MasterFeederDataMap[year]===undefined){
            MasterFeederDataMap[year]=0;
        }
        if(CapitalCallDataMap[year]===undefined){
            CapitalCallDataMap[year]=0;
        }
        if(RegularDataMap[year]===undefined){
            RegularDataMap[year]=0;
        }
        if(ModalDataMap[year]===undefined){
            ModalDataMap[year]=0;
        }

        if(fund.fundType === "MasterFeeder"){
            MasterFeederDataMap[year] +=1; 
        }
        else if(fund.fundType === "CapitalCall"){
            CapitalCallDataMap[year]+=1;
        }
        else if(fund.fundType === "RegularCall"){
            RegularDataMap[year]+=1;
        }
        else if(fund.fundType === "ModalCall"){
            ModalDataMap[year]+=1;
        }
        return '';
    });

    for(const key in MasterFeederDataMap){
        XAxisLabelYearWiseFunds.push(key);
        MasterFeederData.push(MasterFeederDataMap[key]);
    }

    for(const key in CapitalCallDataMap){
        CapitalCallData.push(CapitalCallDataMap[key]);
    }

    for(const key in RegularDataMap){
       RegularData.push(RegularDataMap[key]);
    }

    for(const key in ModalDataMap){
        ModalData.push(ModalDataMap[key]);
    }


    ActiveInActiveFundsOptions = {
        Title: "Active/InActive Funds",
        Data:[
            {
                y:ActiveFunds,
                name: "Active",
                color:"#3859FF"
            },
            {
                y:InActiveFunds,
                name:"InActive",
                color:"#24BAFF"
            }
        ],
        Header:"Fund Details",
        TimeLine:'',
        DataList:Funds,
        selectedFund:''
    };

    ActiveInActiveClientsOptions = {
        Title: "Active/InActive Clients",
        Data:[
            {
                y:ActiveClients,
                name: "Active",
                color:  "#FC3995"

            },
            {
                y:InActiveClients,
                name:"InActive",
                color:  "#FFAE00"
            }
        ],
        Header:"Client Details",
        TimeLine:'',
        DataList:Clients,
        selectedFund:''
    };

    PeriodWiseFundsOptions={
        Title: "Period Wise Funds",
        Data:[
            {
                y:YearlyRenewalFunds,
                name: "Yearly",
                color:  "#FC3995"

            },
            {
                y:QuarterlyRenewalFunds,
                name:"Quarterly",
                color:  "#3859FF"
            },
            {
                y:MonthlyRenewalFunds,
                name:"Monthly",
                color:  "#FFAE00"
            },
            {
                y:WeeklyRenewalFunds,
                name:"Weekly",
                color:  "#24BAFF"
            }
        ],
        Header:"Period Wise Fund Details",
        TimeLine:'',
        DataList:Funds,
        selectedFund:''
    };

    YearWiseFundTypesOptions={
        Title: "Year Wise Fund Types",
        YAxisTitle: "Number Of Funds",
        YAxisTickInterval:2,
        XAxisTitle: "Year",
        XAxisLabel:XAxisLabelYearWiseFunds,
        XAxisTickInterval:1,
        Data:[
            {
                name:"Master Feeder",
                data:MasterFeederData,
                color:"#2CD9C5"
            },
            {
                name:"Capital Call",
                data:CapitalCallData,
                color:"#FC5661"
            },
            {
                name:"Regular Call",
                data:RegularData,
                color:"#FC4A9E"
            },
            {
                name:"Modal Call",
                data:ModalData,
                color:"#F5A623"
            },
        ],
        Header:"Fund Types Details",
        TimeLine:'',
        DataList:Funds,
        selectedFund:''
    }

    TotalNumberOfActiveFundsOptions={
        Title:"Total Active Funds",
        XAxisTitle: XAxisTitle,
        XAxisLabel: XAxisLabel,
        YAxisTitle: "Number Of Funds",
        YAxisTickInterval: 3,
        Data:TotalActiveFunds,
        Color:"#424C96",
        Header:"Active Fund Details",
        TimeLine: XAxisTitle,
        DataList:Funds,
        selectedFund:''
    };


    NewClosedFundsOptions={
        Title: "New/Closed Funds",
        XAxisTitle: XAxisTitle,
        XAxisLabels:XAxisLabel,
        YAxisTitle:"Number Of Funds",
        YAxisTickInterval:4,
        UpperStackName:"New Funds",
        UpperStackData:newFunds,
        UpperStackColor:"#24BAFF",
        LowerStackName:"Closed Funds",
        LowerStackData:closedFunds,
        LowerStackColor:"#3859FF",
        Header:"New/Closed Fund Details",
        TimeLine:XAxisTitle,
        DataList:Funds,
        selectedFund:''

    };
    return (
        <>
            <Grid stackable>
                <Grid.Row columns={4}>
                    <Grid.Column width={3}>
                        
                            <PieCharts 
                                        Options={ActiveInActiveFundsOptions}
                            />
                        
                    </Grid.Column>
                    <Grid.Column width={3}>
                        
                            <PieCharts 
                                        Options={ActiveInActiveClientsOptions}
                            />
                        
                    </Grid.Column>
                    <Grid.Column width={3}>
                        
                            <PieCharts 
                                        Options={PeriodWiseFundsOptions}
                            />
                        
                    </Grid.Column>
                    <Grid.Column width={7}>
                        
                            <LineGraphs
                                        Options={YearWiseFundTypesOptions}
                            />
                        
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column  width={7}
                                className="TotalActiveFunds">
                        
                            <ColumnGraphs 
                                            Options={TotalNumberOfActiveFundsOptions}
                            />
                        
                    </Grid.Column>
                    <Grid.Column width={7}>
                        
                            <StackedColumnGraphs 
                                                    Options={NewClosedFundsOptions}
                            />
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
