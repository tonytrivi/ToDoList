import React from 'react';

export default class TaskListItem extends React.Component {
    render() {
        return (
            <div className="task-item-container">
                <div className="task-item">
                    <span className="task-item-desc">{this.props.desc}</span>
                    <span className="task-item-desc right">{this.props.time.getMonth()}/{this.props.time.getDate()}</span>
                </div>
            </div>
        );
    }
}