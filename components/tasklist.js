import React from 'react';

export default class TaskList extends React.Component {
    renderItems () {
        var taskList = this.props.tasks.map(function(task){
                        return <li key={task.ID}>{task.description}</li>;
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