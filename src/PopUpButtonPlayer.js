import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Modal} from 'react-bootstrap';
import axios from "axios";

export default function PopUpButtonPlayer(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[playerFirstName, setPlayerFirstName] = useState("")
    const[playerLastName, setPlayerLastName] = useState("")
    const[playerGroup, setPlayerGroup] = useState("A")
    const[playerDistanceIds, setPlayerDistanceIds] = useState([])

    const[isInvalid, setIsInvalid] = useState(false)

    const getPlayers = () => {
        axios
            .get("https://localhost:7051/api/Player")
            .catch(error => console.log(error))
    }

    let playerNumber = 1

    useEffect(() => {
        getPlayers()
        const interval = setInterval(() => getPlayers() , 3000)
        return () => {
            clearInterval(interval)
        };

    }, [])

    const incrementPlayerStartNumber = () => props.playersInTournament.length + 1


    function postPlayer(event) {
        event.preventDefault()

        if(playerFirstName.trim().length === 0 || playerLastName.trim().length === 0) {
            setIsInvalid(true)
            return
        }

        axios.post("https://localhost:7051/api/Player", {
            firstName: playerFirstName,
            lastName: playerLastName,
            group: correctPlayerGroupNumber(),
            startNumber: incrementPlayerStartNumber(),
            tournamentId: props.tournament.id,
            distanceIds: playerDistanceIds,
        }).then(() => props.getRequest())
            .catch(error => console.log(error))

        setShow(false)
        setPlayerFirstName("")
        setPlayerLastName("")
    }

    function playerFirstNameOnChange(event) {

        if(event.target.value.trim().length > 0){
            setIsInvalid(false)
        }

        setPlayerFirstName(event.target.value)
    }

    function playerLastNameOnChange(event) {

        if(event.target.value.trim().length > 0){
            setIsInvalid(false)
        }

        setPlayerLastName(event.target.value)
    }


    function correctPlayerGroupNumber() {

        if(playerGroup === "A") {
            playerNumber = 1
        }

        if(playerGroup === "B") {
            playerNumber = 2
        }

        if(playerGroup === "C") {
            playerNumber = 3
        }

        return playerNumber;

    }



    return (
        <>
            <Button variant="primary" onClick={handleShow} className={"create-player-button"}>
                Create a new Player
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={isInvalid}>
                        <InputGroup className={"mb-3"}>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                required
                                value={playerFirstName}
                                onChange={playerFirstNameOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a First Name.
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup className={"mb-3"}>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                required
                                value={playerLastName}
                                onChange={playerLastNameOnChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Last Name.
                            </Form.Control.Feedback>
                        </InputGroup>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Please choose a group</Form.Label>
                            <Form.Select
                                type={"number"}
                                value={playerGroup}
                                onChange={(event) => setPlayerGroup(event.target.value) }
                            >
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>

                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={postPlayer}>
                        Create player
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}