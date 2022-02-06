import React, { Component } from "react";
import RegisterPage from "./RegisterPage";
import PickPage from "./PickPlayer";
import CreateLeaguePage from "./CreateLeage";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Router>
                <Routes>
                    <Route path='' element={<h1>This is the Home Page tt</h1>}/>                   
                    <Route path='/register' element={ <RegisterPage /> }/>
                    <Route path='/pick-a-player' element={ <PickPage /> }/>
                    <Route path='/create-league' element={ <CreateLeaguePage />} />
                </Routes>
            </Router>
        );
    }
}