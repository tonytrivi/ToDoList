import React from 'react';
import TaskList from './tasklist.js';
import CreateTask from './createtask.js';
import * as firebase from 'firebase';

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
            //, testTask: null
        };
    }

    componentWillMount(){
    }

    //set up database listeners in this method, which occurs after render()    
    componentDidMount(){
        //object should be off the root
        //when I wrote this, object had a couple test objects under it
        const dbRefObject = firebase.database().ref().child('object');
        
        var newTask = {
            ID: 26,
            description: 'sand the floor',
            timeCreated: "2016-11-22",
            isCompleted: true,
            isExpired: false
        }
        //dbRefObject.push(newTask);

        //do data sync on the value event type
        dbRefObject.on('value', snapshot => {
            //console.log(this.state.testTask); //null
            //this.setState({
                //testTask: snapshot.val()
            //});
        });  
    }

    render() {
        return (
            <div className="app-surround">
                <CreateTask createTask={this.createTask.bind(this)} />
                <TaskList 
                    tasks={this.state.tasks}
                    toggleTask={this.toggleTask.bind(this)} 
                    saveTask={this.saveTask.bind(this)} />
                <div className="icon-credit">Icons <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
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
        const firebaseRefObject = firebase.database().ref().child('object');

        var theDate = new Date();
        var m = theDate.getMonth();
        theDate.setMonth(m+1);

        var newTask = {
            ID: this.state.tasks.length + 1,
            description: desc,
            timeCreated: theDate.toISOString(),
            isCompleted: false,
            isExpired: false
        };

        firebaseRefObject.push(newTask);
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