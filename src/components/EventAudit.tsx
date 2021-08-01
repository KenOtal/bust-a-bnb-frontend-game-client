import React, { useState, ReactElement } from 'react'
import { Button, Container, Input } from 'rsuite'
import reportService from '../services/report.service'

const EventAudit = (): ReactElement => {
    const [roundNumber, setRoundNumber] = useState(null)
    const [events, setEvents] = useState([])

    const getReport = async () => {
        const { data } = await reportService.getEvents(roundNumber)
        setEvents(data)
    }

    return (
        <Container>
            <div>
                <h1>Check game events for round</h1>
                <Input
                    onChange={(e): void => {
                        setRoundNumber(e)
                    }}
                    placeholder="Round number"
                    type="text"
                />
            </div>
            <Button
                style={{ margin: '10px 0' }}
                onClick={(): void => {
                    getReport()
                }}
            >
                Get events
            </Button>

            <div style={{ maxWidth: '100vw', overflow: 'scroll', height: 600 }}>
                <table>
                    <tr>
                        <th>State</th>
                        <th>Data</th>
                    </tr>
                    {events.map(x => {
                        return (
                            <tr>
                                <th style={{ background: '#dddddd' }}>
                                    {x.state}
                                </th>
                                <th>{JSON.stringify(x.data)}</th>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </Container>
    )
}

export default EventAudit
