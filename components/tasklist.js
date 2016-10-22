import React from 'react';

export default class TaskList extends React.Component {
    renderItems () {
        var taskList = this.props.tasks.map(function(task){
                        return <div className="task-item-container" key={task.ID}>
                            <div className="task-item">
                            <span className="task-item-desc">{task.description}</span>
                            </div>
                        </div>;
                      })

        return  <ul>{ taskList }</ul>
    }
    render() {
        console.log(this.props.tasks);

        return (
            <div>
                <div><span className="header-text">Task List</span></div>
                <ul>
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}