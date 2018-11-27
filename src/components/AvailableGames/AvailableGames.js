import React, { Component } from 'react';
import './AvailableGames.scss';
import GameCover from './GameCover/GameCover';

class AvailableGames extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameCovers: [
        {gameName: "Counter Strike: Global Offensive", coverImageUrl: "./csgo.jpg", coverImageUrlSmall: "./csgo-small.jpg", playersOnline: "798", gameLogoUrl: "./csgo-logo.png"},
        {gameName: "Counter Strike: Global Offensive", coverImageUrl: "./fortnite.jpg", coverImageUrlSmall: "./fortnite-small.jpg", playersOnline: "798", gameLogoUrl: "./fortnite-logo.png"},
        {gameName: "Counter Strike: Global Offensive", coverImageUrl: "./fifa.jpg", coverImageUrlSmall: "./fifa-small.jpg", playersOnline: "798", gameLogoUrl: "./fifa-logo.png"},
        {gameName: "Counter Strike: Global Offensive", coverImageUrl: "./rocketleague.jpg", coverImageUrlSmall: "./rocketleague-small.jpg", playersOnline: "798", gameLogoUrl: "./rocketleague-logo.png"},
        {gameName: "Counter Strike: Global Offensive", coverImageUrl: "./overwatch.jpg", coverImageUrlSmall: "./overwatch-small.jpg", playersOnline: "798", gameLogoUrl: "./overwatch-logo.png"},
        {gameName: "Counter Strike: Global Offensive", coverImageUrl: "./leagueoflegends.jpg", coverImageUrlSmall: "./leagueoflegends-small.jpg", playersOnline: "798", gameLogoUrl: "./leagueoflegends-logo.png"}
      ],
      isList: ""
    }
    this.checkScreenSize = this.checkScreenSize.bind(this);
    this.calculateTotalPlayers = this.calculateTotalPlayers.bind(this);
  }

  componentDidMount() {
    this.checkScreenSize({target: { innerWidth: window.innerWidth}});
    window.addEventListener("resize", this.checkScreenSize);
  }

  calculateTotalPlayers() {
    var nrOfPlayers = 0
    this.state.gameCovers.forEach(element => {
      nrOfPlayers = nrOfPlayers + parseInt(element.playersOnline);
    });
    return nrOfPlayers;
  }

  checkScreenSize(e) {
    this.setState({
      isList: e.target.innerWidth > 767,
    })
  }

  render() {
    return (
      <div className="availableGames-container">
        <div className="background-picture"></div>
        <div className="content-container">
          <div className="title-container">
            <p className="title-text">Upcoming games</p>
          </div>
          <div className="totalOnline-container">
            <div className="status-circle"></div>
            <p className="totalOnline-text">{this.calculateTotalPlayers()} Online</p>
          </div>
          <div className="supportedGames-container">
            {this.state.gameCovers.map((gameCover, index) => {
              return <GameCover key={index} gameCover={gameCover} isList={this.state.isList}/>
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
  