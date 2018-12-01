import React from 'react';
import './GameCover.scss';

function GameCover (props) {
    return (
        <div className="gameCover-container" style={props.isList ? {backgroundImage: 'url('+props.gameCover.coverImageUrl+')'} : {backgroundImage: 'url('+props.gameCover.coverImageUrlSmall+')'}}>
            <div className="gameCover-overlay" />
            <div className="players-online">
                <div className="status-circle" />
                <p className="totalOnline-text">{props.gameCover.playersOnline} Online</p>
            </div>
            <div className="game-logo" style={{backgroundImage: 'url('+props.gameCover.gameLogoUrl+')'}}/>
        </div>
        );
    }
  export default GameCover;