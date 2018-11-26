import React, { Component } from 'react';
import './AvailableGames.scss';
import GameCover from './GameCover/GameCover';

class AvailableGames extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameCovers: [
        {gameName: "Counter Strike: Global Offensive", coverImageUrl: "./cs:go.jpg", playersOnline: "798", gameLogoUrl: "./cslogo.png"},
        {gameName: "World of Warcraft", coverImageUrl: "./worldofwarcraft.jpg", playersOnline: "637", gameLogoUrl: "./wowlogo.png"},
        {gameName: "Dota 2", coverImageUrl: "./dota2.jpg", playersOnline: "41", gameLogoUrl: "./dota2logo.png"},
        {gameName: "Counter Strike: Global Offensive", coverImageUrl: "./cs:go.jpg", playersOnline: "798", gameLogoUrl: "./cslogo.png"},
        {gameName: "World of Warcraft", coverImageUrl: "./worldofwarcraft.jpg", playersOnline: "637", gameLogoUrl: "./wowlogo.png"},
        {gameName: "Dota 2", coverImageUrl: "./dota2.jpg", playersOnline: "41", gameLogoUrl: "./dota2logo.png"}
      ] 
    }
    this.calculateTotalPlayers = this.calculateTotalPlayers.bind(this) 
  }

  calculateTotalPlayers() {
    var nrOfPlayers = 0
    this.state.gameCovers.forEach(element => {
      nrOfPlayers = nrOfPlayers + parseInt(element.playersOnline)
    });
    return nrOfPlayers;
  }

    render() {

      return (
        <div className="availableGames-container">
          <div className="background-picture"></div>
          <div className="content-container">
            <div className="title-container">
              <p className="title-text">Supported games</p>
            </div>
            <div className="totalOnline-container">
              <div className="status-circle"></div>
              <p className="totalOnline-text">{this.calculateTotalPlayers()} Online</p>
            </div>
            <div className="supportedGames-container">
              {this.state.gameCovers.map((gameCover, index) => {
                return <GameCover key={index} gameCover={gameCover}/>
              })}
              <div className="button-container">
            <button className="button">See all games</button>
          </div>
          </div>
        </div>
      </div>
      );
    }
  }
  
  export default AvailableGames;
  