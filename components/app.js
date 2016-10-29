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
                <div className="icon-credit">Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </div>
        );
    }
}