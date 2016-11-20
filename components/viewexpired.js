import React from 'react';

export default class ViewExpired extends React.Component {
    render() {
        return (
            <div className="move-div">
                <div className="move-text-container">
                    <span className="span-shim"></span>
                    <span className="header-text">Toggle expired tasks </span>
                </div>
                <div className="move-button-container">
                    <span className="span-shim"></span>
                    <button className="move-button">
                        <img src="../resources/images/add.svg" 
                        className="move-img"
                        alt="add" 
                        height="15" 
                        width="15"
                        onClick={this.handleViewExpired.bind(this)} /> 
                    </button>
                </div>
                <div className="move-text-container">
                    <span className="span-shim"></span>
                    <span className="header-text">Move to expired </span>
                </div>
                <div className="move-button-container">
                    <span className="span-shim"></span>
                    <button className="move-button">
                        <img src="../resources/images/add.svg" 
                        className="move-img"
                        alt="add" 
                        height="15" 
                        width="15"
                        onClick={this.handleMoveExpired.bind(this)} /> 
                    </button>
                </div>
            </div>
        );
    }

    handleViewExpired(event) {
        this.props.viewExpired('a big arg');
    }

    handleMoveExpired(event) {
        this.props.moveExpired('move arg');
    }
}