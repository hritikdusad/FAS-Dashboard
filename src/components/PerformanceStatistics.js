import React from 'react';
import LineGraphs from './LineGraphs';
import ColumnGraphs from './ColumnGraphs';
import { Grid, Segment } from 'semantic-ui-react';


export default function PerformanceStatistics(props) {
    let XAxisTitle,Funds = props.FundList, SelectedFundId = props.SelectedFundId,Timeline = props.TimeLine,SignOffDetails = props.SignOffDetails; 
    let AverageFundPerformanceTime = [],XAxisLabel=[];
    let FundPerformanceOptions = {},SignOffDetailsOptions = {};

        /* Setting X-Axis Title Based on Selection of Timeline */
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

        /* When the Timeline Selected is Default/Year */
        if(XAxisTitle === "Year"){
            /*If no particular Fund is Selected*/
            if(SelectedFundId === ""){
                let FundPerformancemap = {};
                Funds.map(fund=>{
                        let year = parseInt(fund.startDateOnFAS.substring(0,4));
                        if(FundPerformancemap[year]===undefined){
                            FundPerformancemap[year] = [];
                        }
                            FundPerformancemap[year].push(fund.fundPerformanceTime);
                    return '';
                });

                for(const key in FundPerformancemap){
                    XAxisLabel.push(key);
                    let FundPerformance = FundPerformancemap[key];
                    let sum=0,average;
                    for(let i=0;i<FundPerformance.length;i++){
                        sum += FundPerformance[i];
                    }
                    average = sum/FundPerformance.length;
                    AverageFundPerformanceTime.push(average);
                }
            }
            /* If A fund is selected */
            else{
                Funds.forEach(element => {
                    if(element.fundId === SelectedFundId){
                        XAxisLabel.push(parseInt(element.startDateOnFAS.substring(0,4)));
                        AverageFundPerformanceTime.push(element.fundPerformanceTime);
                    }
                });   
            }
        }
        /*When The Selected Timeline is Months */
        else if(XAxisTitle === "Months"){
            XAxisLabel = ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'];
            let FundPerformancemap = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]};
            let currentYear = new Date().getFullYear();
            if(SelectedFundId === ""){
                Funds.map(fund=>{
                    if(parseInt(fund.startDateOnFAS.substring(0,4)) === currentYear){
                        let Month = parseInt(fund.startDateOnFAS.substring(5,7));
                        FundPerformancemap[Month].push(fund.fundPerformanceTime);
                    }
                    return '';    
                });
                for(const key in FundPerformancemap){
                    let FundPerformance = FundPerformancemap[key];
                    let sum=0,average;
                    for(let i=0;i<FundPerformance.length;i++){
                        sum += FundPerformance[i];
                    }
                    average = sum/FundPerformance.length;
                    if(isNaN(average)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(average);
                    }
                }
                console.log(FundPerformancemap);
            }
            /* When a Fund is Selected */
            else{
                Funds.forEach(element => {
                    if(element.fundId === SelectedFundId){
                        if(parseInt(element.startDateOnFAS.substring(0,4))=== currentYear){
                            let Month = parseInt(element.startDateOnFAS.substring(5,7));
                            FundPerformancemap[Month].push(element.fundPerformanceTime);
                        }
                    }
                });
                for(const key in FundPerformancemap){
                    let FundPerformance = FundPerformancemap[key];
                    let sum=0,average;
                    for(let i=0;i<FundPerformance.length;i++){
                        sum += FundPerformance[i];
                    }
                    average = sum/FundPerformance.length;
                    if(isNaN(average)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(average);
                    }
                }
            }
        }

        else if(XAxisTitle === "Weeks"){
            let WeekFundPerformance = {'Week 1':[],'Week 2': [],'Week 3':[],'Week 4':[]}
            let currentYear = new Date().getFullYear();
            let PreviousMonth = new Date().getMonth();
            let numberOfDays = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
            if(SelectedFundId === ""){
                Funds.forEach(element => {
                    if(parseInt(element.startDateOnFAS.substring(0,4)) === currentYear){
                        if(parseInt(element.startDateOnFAS.substring(5,7)) === PreviousMonth){
                            let day = parseInt(element.startDateOnFAS.substring(8,10));
                            if(day>=1 && day<=7){
                                WeekFundPerformance['Week 1'].push(element.fundPerformanceTime);
                            }   
                            else if(day>=8 && day <=14){
                                WeekFundPerformance['Week 2'].push(element.fundPerformanceTime);
                            }
                            else if(day>=15 && day <=21){
                                WeekFundPerformance['Week 3'].push(element.fundPerformanceTime);
                            }
                            else if(day>=22 && day <=numberOfDays){
                                WeekFundPerformance['Week 4'].push(element.fundPerformanceTime);
                            }
                        }
                        
                    }
                });
                for(const key in WeekFundPerformance){
                    let WeekFundPerformancearray = WeekFundPerformance[key];
                    let sum=0,average;
                    for(let i=0;i<WeekFundPerformancearray.length;i++){
                        sum += WeekFundPerformancearray[i];
                    }
                    average = sum/WeekFundPerformancearray.length;
                    if(isNaN(average)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(average);
                    }
                }
            }
            else{
                Funds.forEach(element => {
                    if(element.fundId === SelectedFundId){
                        if(parseInt(element.startDateOnFAS.substring(0,4)) === currentYear){
                            if(parseInt(element.startDateOnFAS.substring(5,7)) === PreviousMonth){
                                let day = parseInt(element.startDateOnFAS.substring(8,10));
                                if(day>=1 && day<=7){
                                    WeekFundPerformance['Week 1'].push(element.fundPerformanceTime);
                                }   
                                else if(day>=8 && day <=14){
                                    WeekFundPerformance['Week 2'].push(element.fundPerformanceTime);
                                }
                                else if(day>=15 && day <=21){
                                    WeekFundPerformance['Week 3'].push(element.fundPerformanceTime);
                                }
                                else if(day>=22 && day <=numberOfDays){
                                    WeekFundPerformance['Week 4'].push(element.fundPerformanceTime);
                                }
                            }
                            
                        }
                    } 
                });
                for(const key in WeekFundPerformance){
                    let WeekFundPerformancearray = WeekFundPerformance[key];
                    let sum=0,average;
                    for(let i=0;i<WeekFundPerformancearray.length;i++){
                        sum += WeekFundPerformancearray[i];
                    }
                    average = sum/WeekFundPerformancearray.length;
                    if(isNaN(average)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(average);
                    }
                }
            }
            XAxisLabel = ['Week 1','Week 2','Week 3','Week 4'];
        }
        /*When The Selected Timeline is Daily */
        else if(XAxisTitle ==="Days"){
            let days = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
            let FundPerformancemap={};
            for(let i=1;i<=days;i++){
                let s = "Day "+i;
                XAxisLabel.push(s);
                FundPerformancemap[i] = []; 
            }
            
            if(SelectedFundId === ""){
                Funds.forEach(element => {
                    if(parseInt(element.startDateOnFAS.substring(5,7)) === new Date().getMonth()){
                        let day = parseInt(element.startDateOnFAS.substring(8,10));
                        FundPerformancemap[day].push(element.fundPerformanceTime);
                    }
                });
                for(const key in FundPerformancemap){
                    let FundPerformance = FundPerformancemap[key];
                    let sum=0,average;
                    for(let i=0;i<FundPerformance.length;i++){
                        sum += FundPerformance[i];
                    }
                    average = sum/FundPerformance.length;
                    if(isNaN(average)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(average);
                    }
                }
            }

            else{
                Funds.forEach(element => {
                    if(element.fundId === SelectedFundId){
                        if(parseInt(element.startDateOnFAS.substring(5,7)) === new Date().getMonth()){
                            let day = parseInt(element.startDateOnFAS.substring(8,10));
                            FundPerformancemap[day].push(element.fundPerformanceTime);
                        }
                    }
                });
                console.log(FundPerformancemap);
                for(const key in FundPerformancemap){
                    let FundPerformance = FundPerformancemap[key];
                    let sum=0,average;
                    for(let i=0;i<FundPerformance.length;i++){
                        sum += FundPerformance[i];
                    }
                    average = sum/FundPerformance.length;
                    if(isNaN(average)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(average);
                    }
                }
                console.log(AverageFundPerformanceTime);
            }
        }

    FundPerformanceOptions={
        Title:"Fund Performance",
        XAxisTitle: XAxisTitle,
        XAxisLabel: XAxisLabel,
        YAxisTitle: "Average Fund Performance Time(sec)",
        YAxisTickInterval: 1,
        Data:AverageFundPerformanceTime,
        Color: "#420084",
        Header:"Fund Performance Details",
        TimeLine: XAxisTitle,
        DataList:Funds,
        selectedFund:SelectedFundId
    };


    /* Calculation Of SignOffDetails */
    let SignOffDetailsTobeExtracted = (SelectedFundId==="")?1:SelectedFundId;

    let XAxixDates = [],Delays=[];
    SignOffDetails.forEach(element => {
        if(element.fundId === SignOffDetailsTobeExtracted){
            XAxixDates.push(element.idealDate.substring(0,10));
            let actual = new Date(element.actualDate);
            let ideal = new Date(element.idealDate);
            let Delaydays = (actual.getTime()-ideal.getTime())/(3600*24*1000);
            Delays.push(Delaydays);
        }
    });

    SignOffDetailsOptions={
        Title: "Sign-Off Details",
        YAxisTitle: "Delay (In Days)",
        YAxisTickInterval:1,
        XAxisTitle: "Ideal Sign Off Dates",
        XAxisLabel:XAxixDates,
        Data:[{
            name:"Delay",
            data:Delays,
            color:"#f20000"
        }],
        
        Header:"Delay Details",
        TimeLine: Timeline,
        DataList:Funds,
        selectedFund:SignOffDetailsTobeExtracted
    };
    return (
        <Grid stackable>
            <Grid.Row columns={2}>
                <Grid.Column width={7} floated="left">
                    <Segment>
                        <ColumnGraphs 
                                        Options={FundPerformanceOptions}
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={7} floated="right">
                    <Segment>
                        <LineGraphs 
                                    Options={SignOffDetailsOptions}
                        />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>                
    )
}
