import './App.css';
import ListOfPlayers from "./ListOfPlayers";
import ListOfTournaments from "./ListOfTournaments";
import {Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
      <>

              <div className={"app-container"}>

                    <Routes>

                        <Route path={"/"} element = {<ListOfTournaments/>}></Route>
                        <Route path={"/listOfTournaments"} element = {<ListOfTournaments/>}></Route>
                        <Route path={"/listOfPlayers"} element = {<ListOfPlayers/>}></Route>

                    </Routes>

              </div>

      </>
  )
}

export default App;
