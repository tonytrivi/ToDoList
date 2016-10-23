import React from 'react';

export default class TaskList extends React.Component {
    renderItems () {
        var taskList = this.props.tasks.map(function(task){
                        return <div className="task-item-container" key={task.ID}>
                            <div className="task-item">
                                <span className="task-item-desc">{task.description}</span>
                                <span className="task-item-desc right">{task.timeCreated.getMonth()}/{task.timeCreated.getDate()}</span>
                            </div>
                        </div>;
                      })

        return <div>{ taskList }</div>
    }
    render() {
        console.log(this.props.tasks);

        return (
            <div>
                <div><span className="span-shim"></span><span className="header-text">Task List</span></div>
                {this.renderItems()}
            </div>
        );
    }
}