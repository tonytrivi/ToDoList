import React from 'react';
import TaskList from './tasklist.js';

var d = new Date();
const tasks = [
    {
        ID: 1,
        description: 'paint the fence',
        timeCreated: new Date(2016, 10, 11),
        isCompleted: false,
        isExpired: false
    },
    {
        ID: 2,
        description: 'wax the car',
        timeCreated: new Date(2016, 9, 14),
        isCompleted: false,
        isExpired: false
    },
    {
        ID: 3,
        description: 'sand the floor',
        timeCreated: new Date(2016, 11, 3),
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