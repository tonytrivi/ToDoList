import React from 'react';
import TaskListItem from './tasklistitem.js';

export default class TaskList extends React.Component {
    renderItems () {
        var taskList = this.props.tasks.map(function(task, index){
                        return <TaskListItem key={index} desc={task.description} time={task.timeCreated}  />;
                      })

        return <div>{ taskList }</div>
    }
    render() {
        //you can add extra code here - like console logging in this case
        console.log(this.props.tasks);

        return (
            <div>
                <div><span className="span-shim"></span><span className="header-text">Task List</span></div>
                {this.renderItems()}
            </div>
        );
    }
}