import React from 'react'

export default function Table(props) {
    return(
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Distances Amount</th>
                <th>Year</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>{props.name}</td>
                <td>{props.status}</td>
                <td>{props.distancesAmount}</td>
                <td>{props.year}</td>
            </tr>
            </tbody>
        </Table>
    )
}