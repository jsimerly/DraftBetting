import React, { Component } from "react";

export default class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            players:[],
         }

        this.getPlayers();
    }


    getPlayers() {
        fetch('/draft/get-players')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                players: data,
            });
        });
    }

    render(){
        let players = this.state.players.map((player)=>{
            return(
                <div>
                    {player.name}
                </div>
            );
        }
        );
        return (
            <div>
                {players}
            </div>)
    }
}