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
        return (
            <span className="task-item-desc" 
                  style={taskStyle}
                  onClick={this.handleToggle.bind(this)}
                  ref="descSpan" >
                  {this.props.desc}</span>
        );
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <span className="task-item-date right">{this.props.monthCreated}/{this.props.dateCreated} 
                        <span> </span>
                        <img src="../resources/images/edit_gn.svg" 
                            className="edit-img"
                            alt="edit" 
                            height="15" 
                            width="15" /> 
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
            <span className="task-item-date right">{this.props.monthCreated}/{this.props.dateCreated}  
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
        //this refers to the component
        this.setState({ isEditing: true });
    }

    /* 
    // handler for the delete-pencil click
    */
    onDeleteClick() {
        //add logic for delete
        console.log('you clicked delete');
    }

    /* 
    // handler for the revert click
    */
    onRevertClick() {
        this.setState({ isEditing: false });
    }

    handleToggle(event) {
        this.props.toggleTask(this.refs.descSpan.innerHTML);
    }
}