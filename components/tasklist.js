import _ from 'lodash';
import React from 'react';
import TaskListItem from './tasklistitem.js';

export default class TaskList extends React.Component {
    renderItems () {
        var that = this;
        var toggleFunc = this.props.toggleTask;
        var saveFunc = this.props.saveTask;
        var deleteFunc = this.props.deleteTask;
        var taskList = this.props.tasks.map(function(task, index){
                        return <TaskListItem key={index} viewExpired={that.props.viewExpired} desc={task.description} dateCreated={task.timeCreated} isCompleted={task.isCompleted} toggleTask={toggleFunc} saveTask={saveFunc} deleteTask={deleteFunc} ID={task.ID}  />;
                      })

        return <div>{ taskList }</div>
    }
    render() {
        //console.log('tasklist.props.viewExpired' + this.props.viewExpired);
        if (this.props.viewExpired == false) {
            return (
                    <div className="task-list">
                        <div><span className="span-shim"></span><span className="header-text">Task List</span></div>
                        {this.renderItems()}
                    </div>
            );
        }

        return (
                    <div className="task-list">
                        <div><span className="span-shim"></span><span className="header-text">Expired Task List</span></div>
                        {this.renderItems()}
                    </div>
            );
    }
}