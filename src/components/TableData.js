import React from 'react'
import { Table } from 'semantic-ui-react'


const MonthMap = {'jan':1,'feb':2,'mar':3,'apr':4,'may':5,'jun':6,'jul':7,'aug':8,'sept':9,'oct':10,'nov':11,'dec':12};
const DayMap = {'Day 1':1,'Day 2':2,'Day 3':3,'Day 4':4,'Day 5':5,'Day 6':6,'Day 7':7,'Day 8':8,'Day 9':9,'Day 10':10,'Day 11':11,'Day 12':12,
                'Day 13':13,'Day 14':14,'Day 15':15,'Day 16':16,'Day 17':17,'Day 18':18,'Day 19':19,'Day 20':20,'Day 21':21,'Day 22':22,'Day 23':23,
                'Day 24':24,'Day 25':25,'Day 26':26,'Day 27':27,'Day 28':28,'Day 29':29,'Day 30':30,'Day 31':31};
                

export default function TableData(props) {
    console.log(props);
    let TableHeader = (
        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Start Date On FAS</Table.HeaderCell>
                            <Table.HeaderCell>Renewal Period</Table.HeaderCell>
                            <Table.HeaderCell>Fund Type</Table.HeaderCell>
                          </Table.Row>
        </Table.Header>
    );
    

    if(props.Title === "Active/InActive Funds"){
        let state = (props.PartName === "Active")?1:0;
        return (
            <div>
                <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                    if(element.isActive === state)
                                        return (
                                        <Table.Row>
                                            <Table.Cell>{element.fundId}</Table.Cell>
                                            <Table.Cell>{element.fundName}</Table.Cell>
                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                            <Table.Cell>{element.fundType}</Table.Cell>
                                        </Table.Row>
                                        );
            
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
            </div>
        )
    }
    else if(props.Title === "Active/InActive Clients"){
        let state = (props.PartName === "Active")?1:0;
        return (
            <div>
                <Table striped celled>
                    <Table.Header>
                        <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Start Date On FAS</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                    if(element.isActive === state)
                                        return (
                                        <Table.Row>
                                            <Table.Cell>{element.clientId}</Table.Cell>
                                            <Table.Cell>{element.clientName}</Table.Cell>
                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                        </Table.Row>
                                        );
            
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
            </div>
        )
    }
    else if(props.Title === "Period Wise Funds"){
        let SectionName = props.PartName;
        return(
            <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                    if(element.renewalPeriod === SectionName)
                                        return (
                                            <Table.Row>
                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                <Table.Cell>{element.fundType}</Table.Cell>
                                            </Table.Row>
                                        );
            
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
        );

    }

    else if(props.Title === "Year Wise Fund Types"){
        console.log(props);
        let Time = props.XAxisPoint;
        let SectionName = props.PartName;
        SectionName = SectionName.split(" ").join("");
        console.log(SectionName);
        return(
            <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                            if(element.startDateOnFAS.substring(0,4) === Time){
                                                if(element.fundType === SectionName){
                                                    return (
                                                        <Table.Row>
                                                            <Table.Cell>{element.fundId}</Table.Cell>
                                                            <Table.Cell>{element.fundName}</Table.Cell>
                                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                            <Table.Cell>{element.fundType}</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                }
                                                return '';
                                            }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
        );
    }
    else if(props.Title === "Total Active Funds"){
        console.log(props);
        let Time = props.XAxisPoint;
        if(props.Timeline==="Year"){
            return(
                <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(element.startDateOnFAS.substring(0,4) === Time){
                                            if(element.isActive === 1){
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell>{element.fundId}</Table.Cell>
                                                        <Table.Cell>{element.fundName}</Table.Cell>
                                                        <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                        <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                        <Table.Cell>{element.fundType}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
            );
        }
        else if(props.Timeline==="Months"){
            let CurrentYear = new Date().getFullYear();
            let Month = MonthMap[props.XAxisPoint];
            return (
                <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== Month){
                                                if(element.isActive === 1){
                                                    console.log("Data");
                                                    return (
                                                        <Table.Row>
                                                            <Table.Cell>{element.fundId}</Table.Cell>
                                                            <Table.Cell>{element.fundName}</Table.Cell>
                                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                            <Table.Cell>{element.fundType}</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
            );
        }
        else if(props.Timeline === "Weeks"){
            let Time = props.XAxisPoint;
            let CurrentYear = new Date().getFullYear();
            let PreviousMonth = new Date().getMonth();
            let numberOfDays = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
            if(Time === 'Week 1'){
                return(
                    <Table striped celled>
                        {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                if(Day >=1 && Day <=7){
                                                    if(element.isActive === 1){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
                );
            }
            else if(Time === 'Week 2'){
                return(
                    <Table striped celled>
                        {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                if(Day >=8 && Day <=15){
                                                    if(element.isActive === 1){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
                );
            }
            else if(Time === 'Week 3'){
                return(
                    <Table striped celled>
                        {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                if(Day >=15 && Day <=21){
                                                    if(element.isActive === 1){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
                );
            }
            else if(Time === 'Week 4'){
                return(
                    <Table striped celled>
                        {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                if(Day >=22 && Day <=numberOfDays){
                                                    if(element.isActive === 1){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
                );
            }
        }
        else if(props.Timeline === "Days"){
            let CurrentYear = new Date().getFullYear();
            let Month = new Date().getMonth();
            let Day = DayMap[props.XAxisPoint];
            console.log(Month);
            return(
                <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== Month){
                                                if(parseInt(element.startDateOnFAS.substring(8,10))=== Day){
                                                    if(element.isActive === 1){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
            );
        }
    }
    else if(props.Title === "New/Closed Funds"){
        let Time = props.XAxisPoint;
        let SectionName = (props.PartName === "New Funds")?1:0;
        let CurrentYear = new Date().getFullYear();
        let Month = MonthMap[props.XAxisPoint];
        if(props.Timeline ==="Year"){
            return(
                <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(element.startDateOnFAS.substring(0,4) === Time){
                                            if(element.isActive === SectionName){
                                                return (
                                                    <Table.Row>
                                                        <Table.Cell>{element.fundId}</Table.Cell>
                                                        <Table.Cell>{element.fundName}</Table.Cell>
                                                        <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                        <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                        <Table.Cell>{element.fundType}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
            );
        }
        else if(props.Timeline === "Months"){
            return(
                <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== Month){
                                                if(element.isActive === SectionName){
                                                    return (
                                                        <Table.Row>
                                                            <Table.Cell>{element.fundId}</Table.Cell>
                                                            <Table.Cell>{element.fundName}</Table.Cell>
                                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                            <Table.Cell>{element.fundType}</Table.Cell>
                                                        </Table.Row>
                                                    );
                                                }
                                                return '';
                                            }
                                            
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
            );
        }
        else if(props.Timeline === "Weeks"){
            let Time = props.XAxisPoint;
            let CurrentYear = new Date().getFullYear();
            let PreviousMonth = new Date().getMonth();
            let numberOfDays = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
            let SectionName = (props.PartName === "New Funds")?1:0;
            if(Time === 'Week 1'){
                return(
                    <Table striped celled>
                        {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                if(Day >=1 && Day <=7){
                                                    if(element.isActive === SectionName){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
                );
            }
            else if(Time === 'Week 2'){
                return(
                    <Table striped celled>
                        {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                if(Day >=8 && Day <=15){
                                                    if(element.isActive === SectionName){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
                );
            }
            else if(Time === 'Week 3'){
                return(
                    <Table striped celled>
                        {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                if(Day >=15 && Day <=21){
                                                    if(element.isActive === SectionName){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
                );
            }
            else if(Time === 'Week 4'){
                return(
                    <Table striped celled>
                        {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                if(Day >=22 && Day <=numberOfDays){
                                                    if(element.isActive === SectionName){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                                return '';
                                            }
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
                );
            }
        }
        else if(props.Timeline === "Days"){
            let SectionName = (props.PartName === "New Funds")?1:0;
            let CurrentYear = new Date().getFullYear();
            let Month = new Date().getMonth();
            let Day = DayMap[props.XAxisPoint];
            return(
                <Table striped celled>
                {TableHeader}
                    <Table.Body>
                                    {props.Data.map((element)=>{
                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== Month){
                                                if(parseInt(element.startDateOnFAS.substring(8,10))=== Day){
                                                    if(element.isActive === SectionName){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                }
                                            }
                                            
                                            return '';
                                        }
                                        return '';
                                    })}
                    </Table.Body>
                </Table>
            );
        }
    }
        else if(props.Title==="Fund Performance"){
            let Time = props.XAxisPoint;
            console.log(Time);
                if(props.SelectedFund === ""){
                    if(props.Timeline ==="Year"){
                        return(
                            <Table striped celled>
                            {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.startDateOnFAS.substring(0,4) === Time){
                                                        console.log("Data");
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                        );
                    }
                    else if(props.Timeline === "Months"){
                        let CurrentYear = new Date().getFullYear();
                        let Month = MonthMap[props.XAxisPoint];
                        return(
                            <Table striped celled>
                            {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                        if(parseInt(element.startDateOnFAS.substring(5,7))=== Month){
                                                            return (
                                                                <Table.Row>
                                                                    <Table.Cell>{element.fundId}</Table.Cell>
                                                                    <Table.Cell>{element.fundName}</Table.Cell>
                                                                    <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                    <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                    <Table.Cell>{element.fundType}</Table.Cell>
                                                                </Table.Row>
                                                            );
                                                        }
                                                        
                                                        return '';
                                                    }
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                        );
                    }
                    else if(props.Timeline === "Weeks"){
                        let Time = props.XAxisPoint;
                        let CurrentYear = new Date().getFullYear();
                        let PreviousMonth = new Date().getMonth();
                        let numberOfDays = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
                        if(Time === 'Week 1'){
                            return(
                                <Table striped celled>
                                    {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                        if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                            let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                            if(Day >=1 && Day <=7){
                                                                return (
                                                                    <Table.Row>
                                                                        <Table.Cell>{element.fundId}</Table.Cell>
                                                                        <Table.Cell>{element.fundName}</Table.Cell>
                                                                        <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                        <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                        <Table.Cell>{element.fundType}</Table.Cell>
                                                                    </Table.Row>
                                                                );
                                                            
                                                            }
                                                            return '';
                                                        }
                                                        return '';
                                                    }
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                            );
                        }
                        else if(Time === 'Week 2'){
                            return(
                                <Table striped celled>
                                    {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                        if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                            let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                            if(Day >=8 && Day <=15){
                                                                return (
                                                                    <Table.Row>
                                                                        <Table.Cell>{element.fundId}</Table.Cell>
                                                                        <Table.Cell>{element.fundName}</Table.Cell>
                                                                        <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                        <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                        <Table.Cell>{element.fundType}</Table.Cell>
                                                                    </Table.Row>
                                                                );
                                                                
                                                            }
                                                            return '';
                                                        }
                                                        return '';
                                                    }
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                            );
                        }
                        else if(Time === 'Week 3'){
                            return(
                                <Table striped celled>
                                    {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                        if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                            let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                            if(Day >=15 && Day <=21){
                                                                return (
                                                                    <Table.Row>
                                                                        <Table.Cell>{element.fundId}</Table.Cell>
                                                                        <Table.Cell>{element.fundName}</Table.Cell>
                                                                        <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                        <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                        <Table.Cell>{element.fundType}</Table.Cell>
                                                                    </Table.Row>
                                                                );
                                                                
                                                            }
                                                            return '';
                                                        }
                                                        return '';
                                                    }
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                            );
                        }
                        else if(Time === 'Week 4'){
                            return(
                                <Table striped celled>
                                    {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                        if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                            let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                            if(Day >=22 && Day <=numberOfDays){
                                                                return (
                                                                    <Table.Row>
                                                                        <Table.Cell>{element.fundId}</Table.Cell>
                                                                        <Table.Cell>{element.fundName}</Table.Cell>
                                                                        <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                        <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                        <Table.Cell>{element.fundType}</Table.Cell>
                                                                    </Table.Row>
                                                                );
                                                                
                                                            }
                                                            return '';
                                                        }
                                                        return '';
                                                    }
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                            );
                        }
                    }
                    else if(props.Timeline === "Days"){
                        let CurrentYear = new Date().getFullYear();
                        let Month = new Date().getMonth();
                        let Day = DayMap[props.XAxisPoint];
                        return(
                            <Table striped celled>
                            {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                        if(parseInt(element.startDateOnFAS.substring(5,7))=== Month){
                                                            if(parseInt(element.startDateOnFAS.substring(8,10))=== Day){
                                                                return (
                                                                    <Table.Row>
                                                                        <Table.Cell>{element.fundId}</Table.Cell>
                                                                        <Table.Cell>{element.fundName}</Table.Cell>
                                                                        <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                        <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                        <Table.Cell>{element.fundType}</Table.Cell>
                                                                    </Table.Row>
                                                                );
                                                            }
                                                        }
                                                        
                                                        return '';
                                                    }
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                        );
                    }
                }
                else{
                    if(props.Timeline ==="Year"){
                        return(
                            <Table striped celled>
                            {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.fundId === props.SelectedFund){
                                                        if(element.startDateOnFAS.substring(0,4) === Time){
                                                            return (
                                                                <Table.Row>
                                                                    <Table.Cell>{element.fundId}</Table.Cell>
                                                                    <Table.Cell>{element.fundName}</Table.Cell>
                                                                    <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                    <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                    <Table.Cell>{element.fundType}</Table.Cell>
                                                                </Table.Row>
                                                            );
                                                        }
                                                        return '';
                                                    }
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                        );
                    }
                    else if(props.Timeline === "Months"){
                        let CurrentYear = new Date().getFullYear();
                        let Month = MonthMap[props.XAxisPoint];
                        return(
                            <Table striped celled>
                            {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.fundId === props.SelectedFund){
                                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== Month){
                                                                return (
                                                                    <Table.Row>
                                                                        <Table.Cell>{element.fundId}</Table.Cell>
                                                                        <Table.Cell>{element.fundName}</Table.Cell>
                                                                        <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                        <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                        <Table.Cell>{element.fundType}</Table.Cell>
                                                                    </Table.Row>
                                                                );
                                                            }
                                                            
                                                            return '';
                                                        }
                                                    }
                                                    
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                        );
                    }
                    else if(props.Timeline === "Weeks"){
                        let Time = props.XAxisPoint;
                        let CurrentYear = new Date().getFullYear();
                        let PreviousMonth = new Date().getMonth();
                        let numberOfDays = new Date(new Date().getFullYear(),new Date().getMonth(), 0).getDate();
                        if(Time === 'Week 1'){
                            return(
                                <Table striped celled>
                                    {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.fundId === props.SelectedFund){
                                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                                if(Day >=1 && Day <=7){
                                                                    return (
                                                                        <Table.Row>
                                                                            <Table.Cell>{element.fundId}</Table.Cell>
                                                                            <Table.Cell>{element.fundName}</Table.Cell>
                                                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                            <Table.Cell>{element.fundType}</Table.Cell>
                                                                        </Table.Row>
                                                                    );
                                                                }
                                                                return '';
                                                            }
                                                            return '';
                                                        }
                                                    }
                                                    
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                            );
                        }
                        else if(Time === 'Week 2'){
                            return(
                                <Table striped celled>
                                    {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.fundId === props.SelectedFund){
                                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                                if(Day >=8 && Day <=15){
                                                                    return (
                                                                        <Table.Row>
                                                                            <Table.Cell>{element.fundId}</Table.Cell>
                                                                            <Table.Cell>{element.fundName}</Table.Cell>
                                                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                            <Table.Cell>{element.fundType}</Table.Cell>
                                                                        </Table.Row>
                                                                    );
                                                                    
                                                                }
                                                                return '';
                                                            }
                                                            return '';
                                                        }
                                                    }
                                                    
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                            );
                        }
                        else if(Time === 'Week 3'){
                            return(
                                <Table striped celled>
                                    {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.fundId === props.SelectedFund){
                                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                                if(Day >=15 && Day <=21){
                                                                    return (
                                                                        <Table.Row>
                                                                            <Table.Cell>{element.fundId}</Table.Cell>
                                                                            <Table.Cell>{element.fundName}</Table.Cell>
                                                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                            <Table.Cell>{element.fundType}</Table.Cell>
                                                                        </Table.Row>
                                                                    );
                                                                    
                                                                }
                                                                return '';
                                                            }
                                                            return '';
                                                        }
                                                    }
                                                    
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                            );
                        }
                        else if(Time === 'Week 4'){
                            return(
                                <Table striped celled>
                                    {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.fundId === props.SelectedFund){
                                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== PreviousMonth){
                                                                let Day = parseInt(element.startDateOnFAS.substring(8,10))
                                                                if(Day >=22 && Day <=numberOfDays){
                                                                    return (
                                                                        <Table.Row>
                                                                            <Table.Cell>{element.fundId}</Table.Cell>
                                                                            <Table.Cell>{element.fundName}</Table.Cell>
                                                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                            <Table.Cell>{element.fundType}</Table.Cell>
                                                                        </Table.Row>
                                                                    );
                                                                    
                                                                }
                                                                return '';
                                                            }
                                                            return '';
                                                        }
                                                    }
                                                    
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                            );
                        }
                    }
                    else if(props.Timeline === "Days"){
                        let CurrentYear = new Date().getFullYear();
                        let Month = new Date().getMonth();
                        let Day = DayMap[props.XAxisPoint];
                        return(
                            <Table striped celled>
                            {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.fundId === props.SelectedFund){
                                                        if(parseInt(element.startDateOnFAS.substring(0,4)) === CurrentYear){
                                                            if(parseInt(element.startDateOnFAS.substring(5,7))=== Month){
                                                                if(parseInt(element.startDateOnFAS.substring(8,10))=== Day){
                                                                    return (
                                                                        <Table.Row>
                                                                            <Table.Cell>{element.fundId}</Table.Cell>
                                                                            <Table.Cell>{element.fundName}</Table.Cell>
                                                                            <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                            <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                            <Table.Cell>{element.fundType}</Table.Cell>
                                                                        </Table.Row>
                                                                    );
                                                                }
                                                            }
                                                            
                                                            return '';
                                                        }
                                                    }
                                                    
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
                        );
                    }
                }
        }
        else if(props.Title==="Sign-Off Details"){
            return(
                <Table striped celled>
                            {TableHeader}
                                <Table.Body>
                                                {props.Data.map((element)=>{
                                                    if(element.fundId === props.SelectedFund){
                                                        return (
                                                            <Table.Row>
                                                                <Table.Cell>{element.fundId}</Table.Cell>
                                                                <Table.Cell>{element.fundName}</Table.Cell>
                                                                <Table.Cell>{element.startDateOnFAS}</Table.Cell>
                                                                <Table.Cell>{element.renewalPeriod}</Table.Cell>
                                                                <Table.Cell>{element.fundType}</Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                    
                                                    return '';
                                                })}
                                </Table.Body>
                            </Table>
            );
        }
        
    return <h1>No Data Available</h1>
    
}
