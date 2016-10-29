import React from 'react';

export default class TaskListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <span className="task-item-desc right">{this.props.monthCreated}/{this.props.dateCreated} 
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
            <span className="task-item-desc right">{this.props.monthCreated}/{this.props.dateCreated}  
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
                    <span className="task-item-desc">{this.props.desc}</span>
                    {this.renderActionsSection()}
                </div>
            </div>
        );
    }

    /* 
    // handler for the edit-pencil click
    */
    onEditClick() {
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
}