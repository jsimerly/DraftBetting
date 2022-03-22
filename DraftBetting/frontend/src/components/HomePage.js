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

    useEffect(() => {
        const url = '/account/current-user/';
        let expectedPayload = {
            email: "simerly81@gmail.com",
            name: "Jacob",
            isLoggedIn: true,
        };
        setUser(expectedPayload);
        // fetch(url)
        //     .then((response) => setUser(response.json()))
        //     // .then((response) => response.json())
        //     // .then((json) => console.log(json['user']))
        //     // .then((json) => setUser(json['user']))
        //     .catch((error) => console.log(error));
    }, []);
    

    return (
        <div>
            {console.log(user.name)}
            {console.log(user.isLoggedIn)}
            <NavBar 
                user={user}
                crsftoken={csrftoken}
            />
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

const rootDiv = document.getElementById("root")
render(<HomePage />, rootDiv)