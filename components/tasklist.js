import _ from 'lodash';
import React from 'react';
import TaskListItem from './tasklistitem.js';

export default class TaskList extends React.Component {
    renderItems () {
        var toggleFunc = this.props.toggleTask;
        var saveFunc = this.props.saveTask;
        var taskList = this.props.tasks.map(function(task, index){
                        return <TaskListItem key={index} desc={task.description} dateCreated={task.timeCreated} isCompleted={task.isCompleted} toggleTask={toggleFunc} saveTask={saveFunc}  />;
                      })

        return <div>{ taskList }</div>
    }
    render() {
        //you can add extra code here - like console logging in this case
        //console.log(this.props.tasks);

        return (
            <div className="task-list">
                <div><span className="span-shim"></span><span className="header-text">Task list</span></div>
                {this.renderItems()}
            </div>
        );
    }
}