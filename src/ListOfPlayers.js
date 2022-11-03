import React from 'react'
import {useEffect, useState} from "react";
import axios from "axios";
import PopUpButtonPlayer from "./PopUpButtonPlayer";
import {Nav, Table, ButtonGroup, ToggleButton, Button, InputGroup, Form} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import PopUpButtonDistance from "./PopUpButtonDistance";
import {TbSearch} from "react-icons/tb";

export default function ListOfPlayers(props) {

    const { state } = useLocation()
    const[players, setPlayers] = useState([])
    const[tournament, setTournament] = useState({})

    const[playerSearchValue, setPlayerSearchValue] = useState("")
    const [radioValue, setRadioValue] = useState('0');
    const[distanceValue, setDistanceValue] = useState(99)


    const radios = [
        { name: 'Group A', value: '1' },
        { name: 'Group B', value: '2' },
        { name: 'Group C', value: '3' },
    ];

    let playerPlace = 0

    const getPlayers = () => {
        axios
            .get("https://localhost:7051/api/Player")
            .then(response => setPlayers(response.data))
            .catch(error => console.log(error))
    }

    const getTournament = () => {
        axios
            .get("https://localhost:7051/api/Tournament/" + state.id)
            .then(response => setTournament(response.data))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getPlayers()
        getTournament()
        const interval = setInterval(() => { getPlayers(); getTournament() }, 3000)
            return () => {
                clearInterval(interval)
            };

        }, [])

    const playersInTournament = players.filter((player) => {
        return player.tournamentId === state.id
    })

    function PlayersFromGroup(group) {
        switch (group) {
            default:
                if(playerSearchValue !== "") {
                    return playersInTournament.filter(player => player.startNumber === parseInt(playerSearchValue))
                }

                return playersInTournament
            case '1':
                if(playerSearchValue !== "") {
                    return playersInTournament.filter((player) => {
                        return player.group === 1
                    }).filter(player => player.startNumber === parseInt(playerSearchValue))
                }

                return playersInTournament.filter((player) => {
                    return player.group === 1
                })
            case '2':
                if(playerSearchValue !== "") {
                    return playersInTournament.filter((player) => {
                        return player.group === 2
                    }).filter(player => player.startNumber === parseInt(playerSearchValue))
                }

                return playersInTournament.filter((player) => {
                    return player.group === 2
                })
            case '3':
                if(playerSearchValue !== "") {
                    return playersInTournament.filter((player) => {
                        return player.group === 3
                    }).filter(player => player.startNumber === parseInt(playerSearchValue))
                }

                return playersInTournament.filter((player) => {
                    return player.group === 3
                })
        }

    }

    function DistancesAmount(props) {
        if(props.number <= state.distancesAmount) {
            switch(props.number) {
                case 1:
                    return <td>{props.number + "st distance"}</td>
                case 2:
                    return <td>{props.number + "nd distance"}</td>
                case 3:
                    return <td>{props.number + "rd distance"}</td>
                default:
                    return <td>{props.number + "th distance"}</td>
            }
        }

    }

    function DistancesValue(props) {
        if(props.number <= state.distancesAmount) {
            if(props.player.distancePenaltyPoints[props.number - 1] === 1) {
                return <td>{props.player.distancePenaltyPoints[props.number - 1] !== undefined ? props.player.distancePenaltyPoints[props.number - 1] + " point" : " "}</td>
            }
            return <td>{props.player.distancePenaltyPoints[props.number - 1] !== undefined ? props.player.distancePenaltyPoints[props.number - 1] + " points" : " "}</td>
        }

    }

    const PenaltyPointsInTotal = (props) => {
        let count = 0
        for (let i = 0; i < props.player.distancePenaltyPoints.length; i++) {
            count += props.player.distancePenaltyPoints[i]
        }
        return count
    }

    function comparePlayerDistancesLengthAndPlayerPenaltyPointsInTotal(a,b) {
        let countB = 0
        let countA = 0

        for (let i = 0; i < b.distancePenaltyPoints.length; i++) {
            countB += b.distancePenaltyPoints[i]
        }
        for (let i = 0; i < a.distancePenaltyPoints.length; i++) {
            countA += a.distancePenaltyPoints[i]
        }

        if(b.distancePenaltyPoints.length !== a.distancePenaltyPoints.length) {
            return b.distancePenaltyPoints.length - a.distancePenaltyPoints.length
        }

         return countA - countB

    }

    function startTournament() {
        axios.put("https://localhost:7051/api/Tournament/" + state.id, {
            id: state.id,
            status: 2
        }).then(() => getTournament())
            .catch(error => console.log(error))
    }
    function endTournament() {

        axios.put("https://localhost:7051/api/Tournament/" + state.id, {
            id: state.id,
            status: 3
        }).then(() => getTournament())
            .catch(error => console.log(error))


        playersInTournament.map((player) => {
            if(state.distancesAmount > player.distancePenaltyPoints.length) {
                axios.put("https://localhost:7051/api/Player/" + player.id, {
                    id: player.id,
                    isDisqualified: true
                }).then(() => getPlayers())
                    .catch(error => console.log(error))
            }

        })

    }



    const fillButton1Value = () =>  setDistanceValue(0)
    const fillButton2Value = () =>  setDistanceValue(1)
    const fillButton3Value = () =>  setDistanceValue(2)
    const fillButton4Value = () =>  setDistanceValue(3)
    const fillButton5Value = () =>  setDistanceValue(4)
    const fillButton6Value = () =>  setDistanceValue(5)
    const fillButton7Value = () =>  setDistanceValue(6)
    const fillButton8Value = () =>  setDistanceValue(7)
    const fillButton9Value = () =>  setDistanceValue(8)
    const fillButton10Value = () =>  setDistanceValue(9)
    const fillAllPlayersButtonValue = () =>  { setDistanceValue(99); setRadioValue('0')}


    return (
        <>

            <h1 className={"d-flex justify-content-center text-white"}>{state.name}</h1>

            <div className={"d-flex"}>
                <div className={"justify-content-start p-4"}>


                    {tournament.status !== 1 ? <InputGroup className={"mb-3"}>

                        <Button variant={"light"} disabled><TbSearch/></Button><Form.Control
                            type="text"
                            placeholder="Search a player"
                            value={playerSearchValue}
                            onChange={(e) => setPlayerSearchValue(e.target.value)}
                        />

                    </InputGroup> : <PopUpButtonPlayer tournament={state} getRequest={getPlayers}/>}





                </div>


                <div className="w-100 d-flex justify-content-end h-25 p-4">
                    {tournament.status !== 1 ? <Button onClick={fillAllPlayersButtonValue} className={"distance-button"}>All players</Button>: ""}


                    {tournament.status === 1 ? <Button variant="primary" onClick={startTournament} className={"start-end-button"}>
                        Start tournament
                    </Button>: ""}


                    {tournament.status === 2 ? <Button variant="primary" onClick={endTournament} className={"start-end-button"}>
                        End tournament
                    </Button> : ""}

                    {tournament.status !== 1 ? <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant="outline-primary"
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                                onClick={PlayersFromGroup}
                            >
                                {radio.name}
                            </ToggleButton>

                        ))}

                    </ButtonGroup>: ""}
                </div>



            </div>

            <div className="w-100 d-flex justify-content-end h-25 p-3">

            {tournament.status === 2 ? state.distancesAmount >= 1 ? <Button onClick={fillButton1Value} className={"distance-button"}>Distance 1</Button>: "" : ""}
            {tournament.status === 2 ? state.distancesAmount >= 2 ? <Button onClick={fillButton2Value} className={"distance-button"}>Distance 2</Button>: "": ""}
            {tournament.status === 2 ? state.distancesAmount >= 3 ? <Button onClick={fillButton3Value} className={"distance-button"}>Distance 3</Button>: "": ""}
            {tournament.status === 2 ? state.distancesAmount >= 4 ? <Button onClick={fillButton4Value} className={"distance-button"}>Distance 4</Button>: "": ""}
            {tournament.status === 2 ? state.distancesAmount >= 5 ? <Button onClick={fillButton5Value} className={"distance-button"}>Distance 5</Button>: "": ""}
            {tournament.status === 2 ? state.distancesAmount >= 6 ? <Button onClick={fillButton6Value} className={"distance-button"}>Distance 6</Button>: "": ""}
            {tournament.status === 2 ? state.distancesAmount >= 7 ? <Button onClick={fillButton7Value} className={"distance-button"}>Distance 7</Button>: "": ""}
            {tournament.status === 2 ? state.distancesAmount >= 8 ? <Button onClick={fillButton8Value} className={"distance-button"}>Distance 8</Button>: "": ""}
            {tournament.status === 2 ? state.distancesAmount >= 9 ? <Button onClick={fillButton9Value} className={"distance-button"}>Distance 9</Button>: "": ""}
            {tournament.status === 2 ? state.distancesAmount >= 10 ? <Button onClick={fillButton10Value} className={"distance-button"}>Distance 10</Button>: "": ""}

            </div>

            <Table striped bordered hover variant="secondary">
                <thead>
                <tr>
                    <td>#</td>
                    <td>Full Name</td>
                    <td>Start Number</td>
                    <td>Penalty Points in Total</td>
                    <DistancesAmount number={1}/>
                    <DistancesAmount number={2}/>
                    <DistancesAmount number={3}/>
                    <DistancesAmount number={4}/>
                    <DistancesAmount number={5}/>
                    <DistancesAmount number={6}/>
                    <DistancesAmount number={7}/>
                    <DistancesAmount number={8}/>
                    <DistancesAmount number={9}/>
                    <DistancesAmount number={10}/>
                    {tournament.status === 2 ?<td></td> : ""}
                </tr>
                </thead>
                <tbody>
                {PlayersFromGroup(radioValue).filter((player) => {
                    if(distanceValue === 99) {
                        return player
                    }
                return player.distanceIds.length === distanceValue

                })
                    .sort(comparePlayerDistancesLengthAndPlayerPenaltyPointsInTotal).map((player) => (
                    player.isDisqualified ? ""
                        :
                        <tr key={player.id}>
                            <td>{playerPlace = playerPlace + 1}</td>
                            <td>{player.firstName + " " + player.lastName}</td>
                            <td>{player.startNumber}</td>
                            <td><PenaltyPointsInTotal player={player}/></td>

                            <DistancesValue number={1} player={player}/>
                            <DistancesValue number={2} player={player}/>
                            <DistancesValue number={3} player={player}/>
                            <DistancesValue number={4} player={player}/>
                            <DistancesValue number={5} player={player}/>
                            <DistancesValue number={6} player={player}/>
                            <DistancesValue number={7} player={player}/>
                            <DistancesValue number={8} player={player}/>
                            <DistancesValue number={9} player={player}/>
                            <DistancesValue number={10} player={player}/>
                            {tournament.status === 2 ? <td><PopUpButtonDistance player={player} getRequest={getPlayers} tournament={state}/></td> : ""}


                        </tr>

                ))}

                </tbody>
            </Table>

            {tournament.status === 3 ? <h4 className={"text-white"}>Disqualified players:</h4> : ""}
            {tournament.status === 3 ? <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <td>Full Name</td>
                    <td>Start Number</td>
                    <td>Penalty Points in Total</td>
                    <DistancesAmount number={1}/>
                    <DistancesAmount number={2}/>
                    <DistancesAmount number={3}/>
                    <DistancesAmount number={4}/>
                    <DistancesAmount number={5}/>
                    <DistancesAmount number={6}/>
                    <DistancesAmount number={7}/>
                    <DistancesAmount number={8}/>
                    <DistancesAmount number={9}/>
                    <DistancesAmount number={10}/>
                </tr>
                </thead>
                <tbody>
                {PlayersFromGroup(radioValue).map((player) => (
                    player.isDisqualified ? <tr key={player.id}>
                            <td>{player.firstName + " " + player.lastName}</td>
                            <td>{player.startNumber}</td>
                            <td><PenaltyPointsInTotal player={player}/></td>

                            <DistancesValue number={1} player={player}/>
                            <DistancesValue number={2} player={player}/>
                            <DistancesValue number={3} player={player}/>
                            <DistancesValue number={4} player={player}/>
                            <DistancesValue number={5} player={player}/>
                            <DistancesValue number={6} player={player}/>
                            <DistancesValue number={7} player={player}/>
                            <DistancesValue number={8} player={player}/>
                            <DistancesValue number={9} player={player}/>
                            <DistancesValue number={10} player={player}/>


                        </tr>
                        : ""

                ))}

                </tbody>
            </Table> : ""}
        </>
    );

}