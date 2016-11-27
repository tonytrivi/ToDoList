import React from 'react';
import TaskList from './tasklist.js';
import CreateTask from './createtask.js';
import ViewExpired from './viewexpired.js';
import * as firebase from 'firebase';

var d = new Date();

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tasks: [],
            expiredTaskCount: 0,
            viewExpired: false
        };
    }

    componentWillMount(){
        //console.log('in componentwillmount');
        //console.log(this.getExpiredCount());
        //list tasks
        const firebaseRef = firebase.database().ref().child('object');
        const firebaseRefEx = firebase.database().ref().child('expired');
        var exTaskCount = 0;
        var inflatedTasks = [];
    
        var that = this;

        //do data sync
        firebaseRef.on('value', snapshot => {
            //loop over database objects - prepare for display
            snapshot.forEach(function(data){
                //get the tasks that haven't expired
                //if (data.val().isExpired == that.state.viewExpired) {
                    var inflatedTask = {
                    ID: data.val().ID,
                    description: data.val().description,
                    timeCreated: data.val().timeCreated,
                    isCompleted: data.val().isCompleted,
                    isExpired: data.val().isExpired
                    }

                    inflatedTasks.push(inflatedTask);
                //}
                
               
                //console.log("componentWillMount - viewExpired " + that.state.viewExpired);
            });

            
            
        });

        firebaseRefEx.on('value', snapshot => {
            snapshot.forEach(function(data){
                exTaskCount++;
            });

            //console.log(inflatedTasks);
            that.setState({
                tasks: inflatedTasks,
                expiredTaskCount: exTaskCount
            });
                
        });
        
        //attach the tasks to state
        
    }

    render() {
        if (this.state.viewExpired) {
            return (
                    <div className="app-surround">
                        <TaskList 
                            tasks={this.state.tasks}
                            toggleTask={this.toggleTask.bind(this)} 
                            saveTask={this.saveTask.bind(this)}
                            deleteTask={this.deleteTask.bind(this)}
                            viewExpired={this.state.viewExpired} />
                        <ViewExpired 
                                     expiredTaskCount={this.state.expiredTaskCount}
                                     viewExpired={this.viewExpired.bind(this)}
                                     moveExpired={this.moveExpired.bind(this)} />
                        <div className="icon-credit">Icons <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">cc 3.0 by</a></div>
                    </div>
            );
        }

        return (
                    <div className="app-surround">
                        <CreateTask createTask={this.createTask.bind(this)} />
                        <TaskList 
                            tasks={this.state.tasks}
                            toggleTask={this.toggleTask.bind(this)} 
                            saveTask={this.saveTask.bind(this)}
                            deleteTask={this.deleteTask.bind(this)}
                            viewExpired={this.state.viewExpired} />
                        <ViewExpired 
                                     expiredTaskCount={this.state.expiredTaskCount}
                                     viewExpired={this.viewExpired.bind(this)}
                                     moveExpired={this.moveExpired.bind(this)} />
                        <div className="icon-credit">Icons <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">cc 3.0 by</a></div>
                    </div>
        );
    }

    /*
    //mark a task as completed
    */
    toggleTask(taskDesc){
        const firebaseRef = firebase.database().ref().child('object');

        function findTaskObj(task) {
            //get the object with the description we're looking for
            return task.description === taskDesc;
        }
        
        //this refers to the component
        var foundTaskObj = this.state.tasks.find(findTaskObj);
        foundTaskObj.isCompleted = !foundTaskObj.isCompleted;
        console.log(foundTaskObj);

        //overwrite the database tasks
        firebaseRef.set(this.state.tasks);
        //refresh tasks
        this.setState({ tasks: this.state.tasks });
    }

    /*
    // set to view expired tasks
    */
    viewExpired() {
        //console.log("componentWillUpdate viewExpired was " + this.state.viewExpired);
        var firebaseRef;
        
        //you want to do the opposite of the current state
        if (!this.state.viewExpired){
            firebaseRef = firebase.database().ref().child('expired');
        }
        else {
            firebaseRef = firebase.database().ref().child('object');
        }
        
        var that = this;

        //do data sync
        firebaseRef.on('value', snapshot => {
            var inflatedTasks = [];
            
            //loop over database objects - prepare for display
            snapshot.forEach(function(data){
                //toggle which tasks to view
                //if (data.val().isExpired == !that.state.viewExpired) {
                    var inflatedTask = {
                    ID: data.val().ID,
                    description: data.val().description,
                    timeCreated: data.val().timeCreated,
                    isCompleted: data.val().isCompleted,
                    isExpired: data.val().isExpired
                    }

                    inflatedTasks.push(inflatedTask);
                //}
                
                //attach the tasks to state
                that.setState({
                    tasks: inflatedTasks,
                    viewExpired: !that.state.viewExpired
                });
            });
        });
    }

    /*
    // shift tasks to the expired list
    */
    moveExpired() {
        var firebaseRef = firebase.database().ref().child('object');
        var firebaseRefExpired = firebase.database().ref().child('expired');
        var that = this;
        var expiredTaskCount = 0;

        //loop through the non-expired
        for (var i=0; i<this.state.tasks.length; i++){
            //add to expired and remove from current task list
            var createdDate     = new Date(that.state.tasks[i].timeCreated);
            var taskIdentifier  = that.state.tasks[i].ID;
            var taskDescription = that.state.tasks[i].description;

            if (createdDate.getSeconds() > 19) {
                //move the task to expired
                var taskToMove = {
                    ID:             taskIdentifier,
                    description:    taskDescription,
                    timeCreated:    createdDate,
                    isCompleted:    that.state.tasks[i].isCompleted,
                    isExpired:      that.state.tasks[i].isExpired
                }
                firebaseRefExpired.push(taskToMove);

                //remove from the active list
                console.log("remove the item with description " + taskDescription);
                //that.state.tasks.splice(i, 1);
                that.state.tasks[i] = null;
            }

        };

        //create a new list
        var paredTaskList = [];
        for (var i=0; i<that.state.tasks.length; i++){
            if(that.state.tasks[i] !== null) {
                paredTaskList.push(that.state.tasks[i]);
            }
        }

        console.log('pared task list');
        console.log(paredTaskList);
        firebaseRef.set(paredTaskList);

        //reset the UI
        expiredTaskCount = this.getExpiredCount();

        this.setState({ 
            tasks: paredTaskList,
            expiredTaskCount: expiredTaskCount,
            viewExpired: false
        });

        //do data sync
        //firebaseRef.on('value', snapshot => {
            //var inflatedTasks = [];
            
            //loop over database objects
        //    snapshot.forEach(function(data){
        //        var createdDate = new Date(data.val().timeCreated);
        //        var taskIdentifier = data.val().ID;
        //        var taskDescription = data.val().description;

                //moving condition
        //        if (createdDate.getSeconds() > 19) {
        //            var inflatedTask = {
        //            ID: data.val().ID,
        //            description: data.val().description,
        //            timeCreated: data.val().timeCreated,
        //            isCompleted: data.val().isCompleted,
        //            isExpired: data.val().isExpired
        //        }
                    
                    //move it
        //            firebaseRefExpired.push(inflatedTask);

                    //take it out of the non-expired items
        //            for (var i=0; i<that.state.tasks.length; i++){
        //                if (that.state.tasks[i].ID == taskIdentifier){
                            //remove item at this position
        //                    console.log("remove the item with description " + taskDescription);
        //                    that.state.tasks.splice(i, 1);
        //                };
        //            };
                    
        //        }
                //overwrite the database tasks
        //        firebaseRef.set(that.state.tasks);
                    
        //        that.setState({ 
        //            tasks: that.state.tasks,
                    //expired: expiredTaskCount,
        //            viewExpired: false
        //        });

                
        //    });
        //});

    }

    /*
    // get a count of expired tasks
    */
    getExpiredCount() {
        var firebaseRefExpired = firebase.database().ref().child('expired');
        var exCount = 0;

        firebaseRefExpired.on('value', snapshot => {
            exCount = snapshot.numChildren();
            //snapshot.forEach(function(data){
            //    exCount++;
            //});
        });

        return exCount;

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
 
        //replace the UI collection
        var arrCopiedTasks = [];

        //replace with a splice
        for(var i=0;i<this.state.tasks.length;i++){
            arrCopiedTasks.push(this.state.tasks[i]);
        }

        arrCopiedTasks.push(newTask);
        //if you move this up, it can interfere with state
        firebaseRefObject.push(newTask);

        this.setState({ 
            tasks: arrCopiedTasks,
            viewExpired: false
        });
    }

    /*
    // changes a task description and saves it
    */
    saveTask(oldTaskDesc, taskID, newTaskDesc){
        const firebaseRefObject = firebase.database().ref().child('object');

        function findTaskObj(task) {
            //get the object with the description we're looking for
            return task.description === oldTaskDesc;
        }
        
        var foundTaskObj = this.state.tasks.find(findTaskObj);
        foundTaskObj.description = newTaskDesc;

        //overwrite the database tasks
        firebaseRefObject.set(this.state.tasks);

        this.setState({ tasks: this.state.tasks,
            viewExpired: false
        });
    }

    /*
    // deletes a task
    */
    deleteTask(ID){
        const firebaseRefObject = firebase.database().ref().child('object');
        
        for (var i=0; i<this.state.tasks.length; i++){
            if (this.state.tasks[i].ID == ID){
                //remove item at this position
                console.log("remove the item with description " + this.state.tasks[i].description );
                this.state.tasks.splice(i, 1);
            };
        };

        //overwrite the database tasks
        firebaseRefObject.set(this.state.tasks);

        this.setState({ tasks: this.state.tasks,
                        viewExpired: false
        });
    }
}