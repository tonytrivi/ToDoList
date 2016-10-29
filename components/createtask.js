import React from 'react';

export default class CreateTask extends React.Component {
    render() {
        return (
            <div>
                <span className="header-text">Create</span>
                <form onSubmit={this.handleCreate.bind(this)}>
                    <input type="text" placeholder="What to do?" ref="createInput" />
                    <span> </span>
                    <button>
                        <img src="../resources/images/add.svg" 
                        className="add-img"
                        alt="add" 
                        height="14" 
                        width="14" /> 
                    </button>
                </form>
                <br></br>
            </div>
        );
    }

    handleCreate(event) {
        event.preventDefault();
        this.props.createTask(this.refs.createInput.value);
    }
}