import React from 'react';
import TaskList from './tasklist.js';
import CreateTask from './createtask.js';
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

    //set up database listeners in this method, which occurs after render()    
    componentDidMount(){
        //object should be off the root
        const dbRefObject = firebase.database().ref().child('object');

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
    //Add a task to the list
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