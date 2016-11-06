import React from 'react';
import TaskList from './tasklist.js';
import CreateTask from './createtask.js';

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
            <div className="app-surround">
                <CreateTask createTask={this.createTask.bind(this)} />
                <TaskList 
                    tasks={this.state.tasks}
                    toggleTask={this.toggleTask.bind(this)} 
                    saveTask={this.saveTask.bind(this)} />
                <div className="icon-credit">icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </div>
        );
    }

    /*
    //toggles isCompleted for a task
    */
    toggleTask(taskDesc){
        function findTaskObj(task) {
            //get the object with the description we're looking for
            return task.description === taskDesc;
        }

        console.log("we are in the top level toggle task");
        
        //this refers to the component
        var foundTaskObj = this.state.tasks.find(findTaskObj);
        foundTaskObj.isCompleted = !foundTaskObj.isCompleted;
        console.log(foundTaskObj);
        this.setState({ tasks: this.state.tasks });
    }

    /*
    //this method is at this level because it needs access to const tasks
    */
    createTask(desc) {
        var theDate = new Date();
        var m = theDate.getMonth();
        theDate.setMonth(m+1);

        var newTask = {
            ID: 4,
            description: desc,
            timeCreated: theDate,
            isCompleted: false,
            isExpired: false
        };

        this.state.tasks.push(newTask);
        this.setState({ tasks: this.state.tasks });

    }

    /*
    //changes a task description and saves it
    */
    saveTask(oldTaskDesc, newTaskDesc){
        function findTaskObj(task) {
            //get the object with the description we're looking for
            return task.description === oldTaskDesc;
        }
        
        var foundTaskObj = this.state.tasks.find(findTaskObj);
        foundTaskObj.description = newTaskDesc;
        this.setState({ tasks: this.state.tasks });
    }
}