import React from 'react';

export default class TaskList extends React.Component {
    render() {
        console.log(this.props.tasks);

        return (
            <div>
                <div><span className="header-text">Task List</span></div>
                <ul></ul>
            </div>
        );
    }
}