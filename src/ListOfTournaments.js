import {useEffect, useState} from "react";
import axios from 'axios'
import {Table, Nav} from 'react-bootstrap';
import PopUpButtonTournament from './PopUpButtonTournament'
import {useNavigate} from 'react-router-dom'

export default function ListOfTournaments(props) {

    const[tournaments, setTournaments] = useState([])

    const navigation = useNavigate()


    const getTournaments = () => {
            axios
                .get("https://localhost:7051/api/Tournament")
                .then(response => setTournaments(response.data))
                .catch(error => console.log(error))
    }


    useEffect(() => {
            getTournaments()
        }, [])

    function correctStatusName(status) {

            switch (status) {
                case 1:
                    return "Not Started"
                case 2:
                    return "Active"
                case 3:
                    return "Finished"
            }
        }

        const compareTournamentDate = (a,b) => {
            return new Date(b.creationDate) - new Date(a.creationDate)
        }



    return (
        <div>
            <h1 className={"d-flex justify-content-center text-white"}>List of Tournaments</h1>

            <div className={"d-flex justify-content-end"}>
            <PopUpButtonTournament getRequest={getTournaments}/>
            </div>

        <Table striped bordered hover variant="secondary">
            <thead>
            <tr>
                <td>Tournament Name</td>
                <td>Number of distances</td>
                <td>Number of players</td>
                <td>Status</td>
                <td>Date of creation</td>
            </tr>
            </thead>
            <tbody>
            {tournaments.sort(compareTournamentDate).map((tournament) => (
                    <tr key={tournament.id}>
                        <Nav.Link onClick={() => navigation("/listOfPlayers", {state: tournament}) }>{tournament.name}</Nav.Link>
                        <td>{tournament.distancesAmount}</td>
                        <td>{tournament.playerIds.length}</td>
                        <td>{correctStatusName(tournament.status)}</td>
                        <td>{new Date(tournament.creationDate).getDate() + "." + parseInt(new Date(tournament.creationDate).getMonth() + 1)
                             + "." + new Date(tournament.creationDate).getFullYear()}</td>
                    </tr>
            ))}
            </tbody>
        </Table>

        </div>
    );
}
