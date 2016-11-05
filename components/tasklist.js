import _ from 'lodash';
import React from 'react';
import TaskListItem from './tasklistitem.js';

export default class TaskList extends React.Component {
    renderItems () {
        var toggleFunc = this.props.toggleTask;
        var taskList = this.props.tasks.map(function(task, index){
                        return <TaskListItem key={index} desc={task.description} monthCreated={task.timeCreated.getMonth()} dateCreated={task.timeCreated.getDate()} isCompleted={task.isCompleted} toggleTask={toggleFunc} />;
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