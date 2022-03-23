import React, { useState, useEffect } from "react";
import { render } from "react-dom"
import RegisterPage from "./RegisterPage";
import PickPage from "./PickPlayer";
import NavBar from "./NavBar";
import CreateLeaguePage from "./CreateLeage";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken')

export default function HomePage(props) {
    const [user, setUser] = useState({
        email: "",
        name: "",
        isLoggedIn: null,
    })

    function childSetUserHandler(userFromChild) {
        console.log('this came from the childSetUserHandler')
        console.log(userFromChild)
        setUser(userFromChild);
    }

    useEffect(() => {
        const url = '/account/current-user/';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // setUser(data);
                // console.log(data)
            })
            .catch((error) => console.log(error));
    });
    

    return (
        <div>
            <NavBar 
                user={user}
                csrftoken={csrftoken}
            />
            <div className="center">
                <h1>{user.email}</h1>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<LandingPage/>}/>                   
                        <Route path='/register' element={ <RegisterPage /> }/>
                        <Route path='/login' element={ <LoginPage user={user} handler={childSetUserHandler}/> }/>
                        <Route path='/pick-a-player' element={ <PickPage /> }/>
                        <Route path='/create-league' element={ <CreateLeaguePage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

const rootDiv = document.getElementById("root")
render(<HomePage />, rootDiv)