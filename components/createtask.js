import React from 'react';

export default class CreateTask extends React.Component {
    render() {
        return (
            <div>
                <span className="span-shim"></span>
                <span className="header-text">Create a task</span>
                <form onSubmit={this.handleCreate.bind(this)}>
                    <span className="span-shim"></span>
                    <input type="text" placeholder="What to do?" ref="createInput" />
                    <span> </span>
                    <button>
                        <img src="../resources/images/add.svg" 
                        className="add-img"
                        alt="add" 
                        height="15" 
                        width="15" /> 
                    </button>
                </form>
                <br></br>
            </div>
        );
    }

    handleCreate(event) {
        event.preventDefault();
        //createTask is up in the app component
        this.props.createTask(this.refs.createInput.value);
        this.refs.createInput.value = '';
    }
}