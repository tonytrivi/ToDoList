import React from 'react';
import TaskList from './tasklist.js';

const tasks = [
    {
        ID: 1,
        description: 'paint the fence',
        timeCreated: Date.now(),
        isCompleted: false,
        isExpired: false
    },
    {
        ID: 2,
        description: 'wax the car',
        timeCreated: Date.now(),
        isCompleted: false,
        isExpired: false
    },
    {
        ID: 3,
        description: 'sand the floor',
        timeCreated: Date.now(),
        isCompleted: true,
        isExpired: false
    }
];

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: tasks
        };
    }

    render() {
        return (
            <div>
                <TaskList tasks={this.state.tasks}/>
            </div>
        );
    }
}