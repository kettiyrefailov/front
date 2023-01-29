import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LiveResult from "./pages/LiveResult";
import LeaguesTable from "./pages/LeaguesTable";
import LeaguesTableLive from "./pages/LeaguesTableLive";import NavBar from "./components/NavBar";
import UserPage from "./pages/UserPage";


function App() {

  return (
      <>
          <BrowserRouter>
              <NavBar/>
              <Routes>
                  <Route exact path={"/"} element={<LiveResult/>}/>
                  <Route exact path={"/leagues-table"} element={<LeaguesTable/>}/>
                  <Route exact path={"/leagues-table-live"} element={<LeaguesTableLive/>}/>
                  <Route exact path={"/login"} element={<UserPage/>}/>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
