import React from 'react';
import { PropTypes } from 'prop-types';

import {
    GAME_STATE_PLAYING
} from "../Constants";

const Footer = ({onNewGameClick, onSuggestClick, gameState}) => {

    const renderButtons = () => {
        if (gameState === GAME_STATE_PLAYING) {
            return <button onClick={onSuggestClick}>Suggest</button>
        }

        return <button onClick={onNewGameClick}>New Game</button>
    }

    return (
        <div className="panel footer">
            {renderButtons()}
        </div>
    );
};

Footer.propTypes = {
    onNewGameClick: PropTypes.func.isRequired,
    onSuggestClick: PropTypes.func.isRequired,
    gameState: PropTypes.number.isRequired
}

export default Footer;