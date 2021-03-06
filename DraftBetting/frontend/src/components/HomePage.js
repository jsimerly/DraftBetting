import React, { useState, useEffect } from "react";
import { render } from "react-dom"
import RegisterPage from "./RegisterPage";
import PickPage from "./PickPlayer";
import NavBar from "./NavBar";
import CreateLeaguePage from "./CreateLeage";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import ManageLeagues from "./ManageLeagues";
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

export default function HomePage(props) {
    const [user, setUser] = useState({
        email: "",
        name: "",
        isLoggedIn: null,
    })
    const [csrftoken, setCsrftoken] = useState(getCookie('csrftoken'));
    const [leagues, setLeagues] = useState(null);
    const [currentLeague, setCurrentLeague] = useState(
        JSON.parse(localStorage.getItem('currentLeague')) || ''
    );
 
    function childSetUserHandler(userFromChild) {
        setUser(userFromChild);
        setCsrftoken(getCookie('csrftoken'))
    }

    function currentLeagueHandler(league) {
        setCurrentLeague(league)
    }

    useEffect(() => {
        const url = '/account/current-user/';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setCsrftoken(getCookie('csrftoken'))
            })
            .catch((error) => console.log(error));

        getLeagues()
    }, []);

    const getLeagues = () => {
        fetch('/draft/get-user-leagues')
            .then((response) => response.json())
            .then((data) => {
                setLeagues(data)
            })
    }

    return (
        <div>
            <BrowserRouter>
                <NavBar 
                    user={user} 
                    csrftoken={csrftoken}
                    leagues={leagues}
                    currentLeague={currentLeague}
                    currentLeagueHandler={currentLeagueHandler}
                />
                <div className="center">
                    <Routes>
                        <Route exact path='/' element={<LandingPage/>}/>                   
                        <Route path='/register' element={ <RegisterPage /> }/>
                        <Route path='/login' element={ <LoginPage user={user} handler={childSetUserHandler}/> }/>
                        <Route 
                            path='/pick-a-player' 
                            element={ <PickPage 
                                        currentLeague={currentLeague} 
                                        csrftoken={csrftoken}
                                        user={user}
                                    /> }/>
                        <Route path='/create-league' element={ <CreateLeaguePage />} />
                        <Route path='/manage-leagues' element={ <ManageLeagues leagues={leagues}/>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

const rootDiv = document.getElementById("root")
render(<HomePage />, rootDiv)