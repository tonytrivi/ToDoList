import React from 'react';
import TaskList from './tasklist.js';
import CreateTask from './createtask.js';
import MoveExpired from './moveexpired.js';
import * as firebase from 'firebase';

var d = new Date();

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: []
        };
    }

    componentWillMount(){
        const firebaseRefObject = firebase.database().ref().child('object');
        var that = this;

        //do data sync
        firebaseRefObject.on('value', snapshot => {
            var inflatedTasks = [];
            
            //loop over database objects - prepare for display
            snapshot.forEach(function(data){
                var inflatedTask = {
                    ID: data.val().ID,
                    description: data.val().description,
                    timeCreated: data.val().timeCreated,
                    isCompleted: data.val().isCompleted,
                    isExpired: data.val().isExpired
                }

                inflatedTasks.push(inflatedTask);
                //set state to the tasks from the database
                that.setState({
                    tasks: inflatedTasks
                });
            });
        });
    }
  
    componentDidMount(){
    }

    render() {
        return (
            <div className="app-surround">
                <CreateTask createTask={this.createTask.bind(this)} />
                <TaskList 
                    tasks={this.state.tasks}
                    toggleTask={this.toggleTask.bind(this)} 
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)} />
                <MoveExpired moveExpired={this.moveExpired.bind(this)} />
                <div className="icon-credit">Icons <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">cc 3.0 by</a></div>
            </div>
        );
    }

    /*
    //mark a task as completed
    */
    toggleTask(taskDesc){
        const firebaseRefObject = firebase.database().ref().child('object');

        function findTaskObj(task) {
            //get the object with the description we're looking for
            return task.description === taskDesc;
        }
        
        //this refers to the component
        var foundTaskObj = this.state.tasks.find(findTaskObj);
        foundTaskObj.isCompleted = !foundTaskObj.isCompleted;
        console.log(foundTaskObj);

        //overwrite the database tasks
        firebaseRefObject.set(this.state.tasks);
        //refresh tasks
        this.setState({ tasks: this.state.tasks });
    }

    /*
    // Moves expired tasks to sub list
    */
    moveExpired(arg) {
        console.log(arg);
    }

    /*
    //Add a task to the list
    */
    createTask(desc) {
        const firebaseRefObject = firebase.database().ref().child('object');

        var theDate = new Date();
        var m = theDate.getMonth();
        theDate.setMonth(m+1);

        var newTask = {
            ID: this.state.tasks.length + (Math.floor(Math.random() * 100000) + 1),
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
    // changes a task description and saves it
    */
    saveTask(oldTaskDesc, newTaskDesc){
        const firebaseRefObject = firebase.database().ref().child('object');

        function findTaskObj(task) {
            //get the object with the description we're looking for
            return task.description === oldTaskDesc;
        }
        
        var foundTaskObj = this.state.tasks.find(findTaskObj);
        foundTaskObj.description = newTaskDesc;

        //overwrite the database tasks
        firebaseRefObject.set(this.state.tasks);

        this.setState({ tasks: this.state.tasks });
    }

    /*
    // deletes a task
    */
    deleteTask(ID){
        const firebaseRefObject = firebase.database().ref().child('object');
        
        for (var i=0; i<this.state.tasks.length; i++){
            if (this.state.tasks[i].ID == ID){
                //remove item at this position
                console.log("Here, remove the item with description " + this.state.tasks[i].description );
                this.state.tasks.splice(i, 1);
            };
        };

        //overwrite the database tasks
        firebaseRefObject.set(this.state.tasks);

        //this.setState({ tasks: this.state.tasks });
    }
}