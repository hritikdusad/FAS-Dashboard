import React from 'react';
import ColumnGraphs from './ColumnGraphs';
import { Grid } from 'semantic-ui-react';


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
                let FundPerformanceYearWiseMap = {};
                Funds.map(fund=>{
                        let Year = parseInt(fund.startDateOnFAS.substring(0,4));
                        if(FundPerformanceYearWiseMap[Year]===undefined){
                            FundPerformanceYearWiseMap[Year] = [];
                        }
                        FundPerformanceYearWiseMap[Year].push(fund.fundPerformanceTime);
                    return '';
                });

                for(const key in FundPerformanceYearWiseMap){
                    XAxisLabel.push(key);
                    let YearWiseFundPerformanceArray = FundPerformanceYearWiseMap[key];
                    let TotalFundPerformanceTime=0,YearWiseAverageFundPerformanceTime;
                    for(let i=0;i<YearWiseFundPerformanceArray.length;i++){
                        TotalFundPerformanceTime += YearWiseFundPerformanceArray[i];
                    }
                    YearWiseAverageFundPerformanceTime = TotalFundPerformanceTime/YearWiseFundPerformanceArray.length;
                    AverageFundPerformanceTime.push(YearWiseAverageFundPerformanceTime);
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
            let FundPerformanceMapMonthsWise = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[]};
            let CurrentYear = new Date().getFullYear();
            if(SelectedFundId === ""){
                Funds.map(fund=>{
                    if(parseInt(fund.startDateOnFAS.substring(0,4)) === CurrentYear){
                        let Month = parseInt(fund.startDateOnFAS.substring(5,7));
                        FundPerformanceMapMonthsWise[Month].push(fund.fundPerformanceTime);
                    }
                    return '';    
                });
                for(const key in FundPerformanceMapMonthsWise){
                    let MonthWiseFundPerformanceArray = FundPerformanceMapMonthsWise[key];
                    let TotalFundPerformanceTime=0,MonthWiseAverageFundPerformance;
                    for(let i=0;i<MonthWiseFundPerformanceArray.length;i++){
                        TotalFundPerformanceTime += MonthWiseFundPerformanceArray[i];
                    }
                    MonthWiseAverageFundPerformance = TotalFundPerformanceTime/MonthWiseFundPerformanceArray.length;
                    if(isNaN(MonthWiseAverageFundPerformance)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(MonthWiseAverageFundPerformance);
                    }
                }
            }
            /* When a Fund is Selected */
            else{
                Funds.forEach(element => {
                    if(element.fundId === SelectedFundId){
                        if(parseInt(element.startDateOnFAS.substring(0,4))=== CurrentYear){
                            let Month = parseInt(element.startDateOnFAS.substring(5,7));
                            FundPerformanceMapMonthsWise[Month].push(element.fundPerformanceTime);
                        }
                    }
                });
                for(const key in FundPerformanceMapMonthsWise){
                    let MonthWiseFundPerformanceArray = FundPerformanceMapMonthsWise[key];
                    let TotalFundPerformanceTime=0,MonthWiseAverageFundPerformance;
                    for(let i=0;i<MonthWiseFundPerformanceArray.length;i++){
                        TotalFundPerformanceTime += MonthWiseFundPerformanceArray[i];
                    }
                    MonthWiseAverageFundPerformance = TotalFundPerformanceTime/MonthWiseFundPerformanceArray.length;
                    if(isNaN(MonthWiseAverageFundPerformance)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(MonthWiseAverageFundPerformance);
                    }
                }
            }
        }

        else if(XAxisTitle === "Weeks"){
            let FundPerformanceMapWeekWise = {'Week 1':[],'Week 2': [],'Week 3':[],'Week 4':[]}
            let CurrentYear = new Date().getFullYear();
            let PreviousMonth = new Date().getMonth();
            let NumberOfDaysPreviousMonth = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
            XAxisLabel = ['Week 1','Week 2','Week 3','Week 4']; 
            if(SelectedFundId === ""){
                Funds.forEach(element => {
                    if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                        if(parseInt(element.startDateOnFAS.substring(5,7)) === PreviousMonth){
                            let day = parseInt(element.startDateOnFAS.substring(8,10));
                            if(day>=1 && day<=7){
                                FundPerformanceMapWeekWise['Week 1'].push(element.fundPerformanceTime);
                            }   
                            else if(day>=8 && day <=14){
                                FundPerformanceMapWeekWise['Week 2'].push(element.fundPerformanceTime);
                            }
                            else if(day>=15 && day <=21){
                                FundPerformanceMapWeekWise['Week 3'].push(element.fundPerformanceTime);
                            }
                            else if(day>=22 && day <=NumberOfDaysPreviousMonth){
                                FundPerformanceMapWeekWise['Week 4'].push(element.fundPerformanceTime);
                            }
                        }
                        
                    }
                });
                for(const key in FundPerformanceMapWeekWise){
                    let WeekWiseFundPerformanceArray = FundPerformanceMapWeekWise[key];
                    let TotalFundPerformanceTime=0,WeekWiseAverageFundPerformance;
                    for(let i=0;i<WeekWiseFundPerformanceArray.length;i++){
                        TotalFundPerformanceTime += WeekWiseFundPerformanceArray[i];
                    }
                    WeekWiseAverageFundPerformance = TotalFundPerformanceTime/WeekWiseFundPerformanceArray.length;
                    if(isNaN(WeekWiseAverageFundPerformance)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(WeekWiseAverageFundPerformance);
                    }
                }
            }
            else{
                Funds.forEach(element => {
                    if(element.fundId === SelectedFundId){
                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                            if(parseInt(element.startDateOnFAS.substring(5,7)) === PreviousMonth){
                                let day = parseInt(element.startDateOnFAS.substring(8,10));
                                if(day>=1 && day<=7){
                                    FundPerformanceMapWeekWise['Week 1'].push(element.fundPerformanceTime);
                                }   
                                else if(day>=8 && day <=14){
                                    FundPerformanceMapWeekWise['Week 2'].push(element.fundPerformanceTime);
                                }
                                else if(day>=15 && day <=21){
                                    FundPerformanceMapWeekWise['Week 3'].push(element.fundPerformanceTime);
                                }
                                else if(day>=22 && day <=NumberOfDaysPreviousMonth){
                                    FundPerformanceMapWeekWise['Week 4'].push(element.fundPerformanceTime);
                                }
                            }
                            
                        }
                    } 
                });
                for(const key in FundPerformanceMapWeekWise){
                    let WeekWiseFundPerformanceArray = FundPerformanceMapWeekWise[key];
                    let TotalFundPerformanceTime=0,WeekWiseAverageFundPerformance;
                    for(let i=0;i<WeekWiseFundPerformanceArray.length;i++){
                        TotalFundPerformanceTime += WeekWiseFundPerformanceArray[i];
                    }
                    WeekWiseAverageFundPerformance = TotalFundPerformanceTime/WeekWiseFundPerformanceArray.length;
                    if(isNaN(WeekWiseAverageFundPerformance)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(WeekWiseAverageFundPerformance);
                    }
                }
            }

        }
        /*When The Selected Timeline is Daily */
        else if(XAxisTitle ==="Days"){
            let NumberOfDaysPreviousMonth = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
            let FundPerformanceMapDayWise={};
            for(let i=1;i<=NumberOfDaysPreviousMonth;i++){
                let XAxisPoint = "Day "+i;
                XAxisLabel.push(XAxisPoint);
                FundPerformanceMapDayWise[i] = []; 
            }
            
            if(SelectedFundId === ""){
                Funds.forEach(element => {
                    if(parseInt(element.startDateOnFAS.substring(5,7)) === new Date().getMonth()){
                        let day = parseInt(element.startDateOnFAS.substring(8,10));
                        FundPerformanceMapDayWise[day].push(element.fundPerformanceTime);
                    }
                });
                for(const key in FundPerformanceMapDayWise){
                    let DayWiseFundPerformanceArray = FundPerformanceMapDayWise[key];
                    let TotalFundPerformanceTime=0,DayWiseAverageFundPerformanceTime;
                    for(let i=0;i<DayWiseFundPerformanceArray.length;i++){
                        TotalFundPerformanceTime += DayWiseFundPerformanceArray[i];
                    }
                    DayWiseAverageFundPerformanceTime = TotalFundPerformanceTime/DayWiseFundPerformanceArray.length;
                    if(isNaN(DayWiseAverageFundPerformanceTime)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(DayWiseAverageFundPerformanceTime);
                    }
                }
            }

            else{
                Funds.forEach(element => {
                    if(element.fundId === SelectedFundId){
                        if(parseInt(element.startDateOnFAS.substring(5,7)) === new Date().getMonth()){
                            let day = parseInt(element.startDateOnFAS.substring(8,10));
                            FundPerformanceMapDayWise[day].push(element.fundPerformanceTime);
                        }
                    }
                });
                console.log(FundPerformanceMapDayWise);
                for(const key in FundPerformanceMapDayWise){
                    let DayWiseFundPerformanceArray = FundPerformanceMapDayWise[key];
                    let TotalFundPerformanceTime=0,DayWiseAverageFundPerformanceTime;
                    for(let i=0;i<DayWiseFundPerformanceArray.length;i++){
                        TotalFundPerformanceTime += DayWiseFundPerformanceArray[i];
                    }
                    DayWiseAverageFundPerformanceTime = TotalFundPerformanceTime/DayWiseFundPerformanceArray.length;
                    if(isNaN(DayWiseAverageFundPerformanceTime)){
                        AverageFundPerformanceTime.push(0);
                    }
                    else{
                        AverageFundPerformanceTime.push(DayWiseAverageFundPerformanceTime);
                    }
                }
                console.log(AverageFundPerformanceTime);
            }
        }
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

    FundPerformanceOptions={
        Title:"Fund Performance",
        XAxisTitle: XAxisTitle,
        XAxisLabel: XAxisLabel,
        YAxisTitle: "Average Fund Performance Time(sec)",
        YAxisTickInterval: 2,
        Data:AverageFundPerformanceTime,
        Color: "#424C96",
        Header:"Fund Performance Details",
        TimeLine: XAxisTitle,
        DataList:Funds,
        selectedFund:SelectedFundId
    };


   
    SignOffDetailsOptions={
        Title: "Sign-Off Details",
        XAxisTitle: "Ideal Sign Off Dates",
        XAxisLabel:XAxixDates,
        YAxisTitle: "Delay (In Days)",
        YAxisTickInterval:1,
        Data:Delays,
        Color: "#fa1e1e",
        Header:"Delay Details",
        TimeLine: Timeline,
        DataList:Funds,
        selectedFund:SignOffDetailsTobeExtracted
    };

    return (
        <Grid stackable>
            <Grid.Row columns={2}>
                <Grid.Column width={7}
                                className="TotalActiveFunds">
                        <ColumnGraphs 
                                        
                                        Options={FundPerformanceOptions}
                        />
                </Grid.Column>
                <Grid.Column width={7}>
                        <ColumnGraphs 
                                    Options={SignOffDetailsOptions}
                        />
                </Grid.Column>
            </Grid.Row>
        </Grid>                
    )
}
