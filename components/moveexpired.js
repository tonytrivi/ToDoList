import React from 'react';

export default class MoveExpired extends React.Component {
    render() {
        return (
            <div className="move-div">
                <div className="move-text-container">
                    <span className="span-shim"></span>
                    <span className="header-text">Move expired tasks </span>
                </div>
                <div className="move-button-container">
                    <span className="span-shim"></span>
                    <button className="move-button">
                        <img src="../resources/images/add.svg" 
                        className="move-img"
                        alt="add" 
                        height="15" 
                        width="15"
                        onClick={this.handleTaskMove.bind(this)} /> 
                    </button>
                </div>
            </div>
        );
    }

    handleTaskMove(event) {
        console.log('we are in handleTaskMove');
        this.props.moveExpired('a big arg');
    }
}