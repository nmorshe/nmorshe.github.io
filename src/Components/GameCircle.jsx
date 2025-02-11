import  React from 'react';
import { PropTypes } from 'prop-types';
import '../Game.css';


const GameCircle = ({ id, children, className, onCircleClicked }) => {

    return (
        <div className={`gameCircle player_0 ${className}`} onClick={() => onCircleClicked(id)}>
            {children}
        </div>
    );

}

GameCircle.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.node,
    className: PropTypes.string.isRequired,
    onCircleClicked: PropTypes.func.isRequired
}

export default GameCircle;