import React, {useState} from 'react';
import {Button, Form, InputGroup, Modal} from 'react-bootstrap';
import axios from "axios";

export default function PopUpButtonDistance(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[distancePenaltyPoints, setDistancePenaltyPoints] = useState(0)
    const[isInvalid, setIsInvalid] = useState(false)

    function postDistance(event) {
        event.preventDefault()

        if(props.player.distancePenaltyPoints.length < props.tournament.distancesAmount) {
            axios.post("https://localhost:7051/api/Distance", {
                penaltyPoints: distancePenaltyPoints,
                playerId: props.player.id
            }).then(() => props.getRequest())
                .catch(error => console.log(error))

            setShow(false)
        } else {
            setIsInvalid(true)
        }
    }



    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Add penalty points
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add penalty points for {props.player.firstName + " " + props.player.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Please choose a group</Form.Label>
                            <Form.Select
                                type={"number"}
                                value={distancePenaltyPoints}
                                isInvalid={isInvalid}
                                onChange={(event) => setDistancePenaltyPoints(event.target.value) }
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                This player has already finished the competition.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={postDistance}>
                        Add penalty points
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}