import React from 'react';
import { PropTypes } from 'prop-types';

import {
    GAME_STATE_DRAW,
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
} from "../Constants";

const Header = ({gameState, currentPlayer, winPlayer}) => {

    const renderLabel = () => {
        switch (gameState) {
            case GAME_STATE_PLAYING:
                return <div className="player-header-text">Player {currentPlayer} Turn</div>

            case GAME_STATE_WIN:
                return <div className="player-header-text">Player {winPlayer} Wins</div>

            case GAME_STATE_DRAW:
                return <div className="player-header-text">Game is a Draw</div>

            default: 
        }
    }

    return (
        <div className="panel header">
            <div className="header-text">{renderLabel()}</div>
        </div>
    );
};

Header.propTypes = {
    gameState: PropTypes.number.isRequired,
    currentPlayer: PropTypes.number.isRequired,
    winPlayer: PropTypes.number.isRequired
    
}

export default Header;