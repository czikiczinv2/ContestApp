import React, {useRef, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";

export default function PopUpButtonTournament(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[tournamentName, setTournamentName] = useState("")
    const[tournamentStatus, setTournamentStatus] = useState(1)
    const[tournamentDistancesAmount, setTournamentDistancesAmount] = useState(5)
    const[tournamentPlayerIds, setTournamentPlayerIds] = useState([])


    const[isInvalid, setIsInvalid] = useState(false)



   function postTournament() {


       if(tournamentName.trim().length === 0){
           setIsInvalid(true)
           return
       }

        axios.post("https://localhost:7051/api/Tournament", {
            name: tournamentName,
            creationDate: new Date(),
            status: tournamentStatus,
            distancesAmount: tournamentDistancesAmount,
            playerIds: tournamentPlayerIds,
        }).then(() => props.getRequest())
            .catch(error => console.log(error))

       setShow(false)
       setTournamentName("")
   }

   function tournamentNameOnChange(event) {
       setTournamentName(event.target.value)

       if(event.target.value.trim().length > 0){
           setIsInvalid(false)
       }

   }



    return (
        <>
            <Button variant="primary" onClick={handleShow} className={"m-3"}>
                Create a new Tournament
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a tournament</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <InputGroup hasValidation className={"mb-3"}>
                            <Form.Control
                                type="text"
                                isInvalid={isInvalid}
                                placeholder="Name"
                                value={tournamentName}
                                onChange={tournamentNameOnChange}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Tournament Name.
                            </Form.Control.Feedback>
                        </InputGroup>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Please choose the number of distances</Form.Label>
                            <Form.Select
                                type={"number"}
                                value={tournamentDistancesAmount}
                                onChange={(event) => setTournamentDistancesAmount(event.target.value)}
                            >
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>

                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={postTournament}>
                        Create tournament
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}