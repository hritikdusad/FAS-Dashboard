import React from 'react'
import {Table} from 'semantic-ui-react';
export default function TableCell(props) {
    console.log(props);
    return (
                                        <Table.Row>
                                            <Table.Cell>{props.Element.fundId}</Table.Cell>
                                            <Table.Cell>{props.Element.fundName}</Table.Cell>
                                            <Table.Cell>{props.Element.startDateOnFAS.substring(0,10)}</Table.Cell>
                                            <Table.Cell>{props.Element.renewalPeriod}</Table.Cell>
                                            <Table.Cell>{props.Element.fundType}</Table.Cell>
                                        </Table.Row>
    )
}
