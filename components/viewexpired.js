import React from 'react';

export default class ViewExpired extends React.Component {

    componentWillMount(){
    }

    render() {
        console.log(this.props.expiredTaskCount);
        return (
            <div className="move-div">
                <div className="move-text-container">
                    <span className="span-shim"></span>
                    <span className="header-text">View expired tasks </span>
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
                        onClick={this.handleMoveExpired.bind(this)} /> 
                    </button>
                </div>
                <div className="move-text-container">
                    <span className="span-shim"></span>
                    <span className="header-text">Mark expired tasks </span>
                </div>
                <div className="move-button-container">
                    <span className="span-shim"></span>
                    <button className="move-button">
                        <img src="../resources/images/skull.svg" 
                        className="expire-img"
                        alt="add" 
                        height="15" 
                        width="15"
                        onClick={this.handleMarkExpired.bind(this)} /> 
                    </button>
                </div>
                <div className="move-text-container">
                    <span className="span-shim"></span>
                    <span className="header-text">expired tasks - { this.props.expiredTaskCount }</span>
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

    handleMarkExpired(event) {
        this.props.markExpired('mark arg');
    }
}