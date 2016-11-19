import React from 'react';

export default class TaskListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection() {
        var taskDesc = this.props.desc;

        const taskStyle = {
            color: this.props.isCompleted ? 'green' : 'red',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <div className="task-item-desc-container">
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input className="task-item-input" 
                            ref="descInput"
                            defaultValue={this.props.desc} />
                    </form>
                </div>
            );

        }
        return (
            <div className="task-item-desc-container">
                <span className="task-item-desc" 
                  style={taskStyle}
                  onClick={this.handleToggle.bind(this)}
                  ref="descSpan" >
                  {this.props.desc}</span>
            </div>
        );
    }

    renderActionsSection() {
        var createdDate = new Date(this.props.dateCreated);
        if (this.props.viewExpired) {
            return (
                <span className="task-item-date right">{createdDate.getMonth()}/{createdDate.getDate()}   
                        <span> </span>
                        <img src="../resources/images/edit.svg" 
                            className="edit-img"
                            alt="edit" 
                            height="15" 
                            width="15" /> 
                        <span> </span>
                        <img src="../resources/images/x.svg" 
                            className="delete-img"
                            alt="delete" 
                            height="14" 
                            width="14" />
                </span>
            );
        }

        if (this.state.isEditing) {
            return (
                <span className="task-item-date right">{createdDate.getMonth()}/{createdDate.getDate()} 
                        <span> </span>
                        <img src="../resources/images/edit_gn.svg" 
                            className="edit-img"
                            alt="edit" 
                            height="15" 
                            width="15"
                            onClick={this.onSaveClick.bind(this)} /> 
                        <span> </span>
                        <img src="../resources/images/revert.svg" 
                            className="delete-img"
                            alt="delete" 
                            height="14" 
                            width="14"
                            onClick={this.onRevertClick.bind(this)} />
                </span>
            );
        }

        return (
            <span className="task-item-date right">{createdDate.getMonth()}/{createdDate.getDate()}   
                        <span> </span>
                        <img src="../resources/images/edit.svg" 
                            className="edit-img"
                            alt="edit" 
                            height="15" 
                            width="15"
                            onClick={this.onEditClick.bind(this)} /> 
                        <span> </span>
                        <img src="../resources/images/x.svg" 
                            className="delete-img"
                            alt="delete" 
                            height="14" 
                            width="14"
                            onClick={this.onDeleteClick.bind(this)} />
            </span>
        );
    }
    
    
    render() {
            return (
                <div className="task-item-container">
                    <div className="task-item">
                        {this.renderTaskSection()}
                        {this.renderActionsSection()}
                    </div>
                </div>
            );
    }

    /* 
    // handler for the edit-pencil click
    // in most cases you'd want to handle setting state in the top-level component
    */
    onEditClick() {
        console.log('you clicked edit - viewExpired is ' + this.props.viewExpired);
        //this refers to the component
        this.setState({ isEditing: true });
        
    }

    /* 
    // handler for clicking the delete X
    */
    onDeleteClick() {
        //call up to the function in app.js
        this.props.deleteTask(this.props.ID);
    }

    /* 
    // handler for the revert click
    */
    onRevertClick() {
        this.setState({ isEditing: false });
    }

    /* 
    // when item descripton is clicked - sends the toggle call up to app.js
    */
    handleToggle(event) {
        this.props.toggleTask(this.refs.descSpan.innerHTML);
    }

    /* 
    // handles clicking the image to save an edited description
    */
    onSaveClick(event) {
        event.preventDefault();
        this.props.saveTask(this.props.desc, this.props.ID, this.refs.descInput.value);

        this.setState({ isEditing: false });
    }
}