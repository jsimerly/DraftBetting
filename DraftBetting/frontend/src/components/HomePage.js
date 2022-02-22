import React, { Component } from "react";
import RegisterPage from "./RegisterPage";
import PickPage from "./PickPlayer";
import CreateLeaguePage from "./CreateLeage";
import LoginPage from "./Login"
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="center">
                <Router>
                    <Routes>
                        <Route exact path='/' element={<h1>This is the Home Page tt</h1>}/>                   
                        <Route path='/register' element={ <RegisterPage /> }/>
                        <Route path='/login' element={ <LoginPage /> }/>
                        <Route path='/pick-a-player' element={ <PickPage /> }/>
                        <Route path='/create-league' element={ <CreateLeaguePage />} />
                    </Routes>
                </Router>
            </div>
            
        );
    }
}