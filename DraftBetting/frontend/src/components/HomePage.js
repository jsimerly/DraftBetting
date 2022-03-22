import React, { Component } from "react";
import { render } from "react-dom"
import RegisterPage from "./RegisterPage";
import PickPage from "./PickPlayer";
import NavBar from "./NavBar";
import CreateLeaguePage from "./CreateLeage";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

export default class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoggedIn: true,
            user: {
                    email: "simerly81@gmail.com",
                    name: "Steve"
                }
        }
    }


    render(){
        return (
            <div>
                <NavBar isLoggedIn={this.state.isLoggedIn} user={this.state.user}/>
                <div className="center">
                    <BrowserRouter>
                        <Routes>
                            <Route exact path='/' element={<LandingPage/>}/>                   
                            <Route path='/register' element={ <RegisterPage /> }/>
                            <Route path='/login' element={ <LoginPage text="home"/> }/>
                            <Route path='/pick-a-player' element={ <PickPage /> }/>
                            <Route path='/create-league' element={ <CreateLeaguePage />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

const rootDiv = document.getElementById("root")
render(<HomePage />, rootDiv)