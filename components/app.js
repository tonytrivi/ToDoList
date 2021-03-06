import React from 'react';
import TaskList from './tasklist.js';
import CreateTask from './createtask.js';
import ViewExpired from './viewexpired.js';
import Timer from './timer.js';
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
                var inflatedTask = {
                ID: data.val().ID,
                description: data.val().description,
                timeCreated: data.val().timeCreated,
                isCompleted: data.val().isCompleted,
                isExpired: data.val().isExpired
                }

                inflatedTasks.push(inflatedTask);
       
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
                    <div className="app-box">
                        <div className="top-title"><span className="title-content">Task Manager</span></div>
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
                                        moveExpired={this.moveExpired.bind(this)}
                                        markExpired={this.markExpired.bind(this)} />
                            <div className="icon-credit">Icons <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">cc 3.0 by</a></div>
                        </div>
                    </div>
            );
        }

        return (
                <div className="app-box">
                    <div className="top-title"><span className="title-content">Task Manager</span></div>
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
                                     moveExpired={this.moveExpired.bind(this)}
                                     markExpired={this.markExpired.bind(this)} />
                        <div className="icon-credit">Icons <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> and licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">cc 3.0 by</a></div>
                    </div>
                </div>
        );
    }

    /*
    //mark a task as completed
    */
    toggleTask(taskDesc){
        const firebaseRef = firebase.database().ref().child('object');
        //console.log('viewExpired was: ' + this.state.viewExpired);

        function findTaskObj(task) {
            //get the object with the description we're looking for
            return task.description === taskDesc;
        }

        //replace the UI collection
        var arrCopiedTasks = [];

        //replace with a splice
        for(var i=0;i<this.state.tasks.length;i++){
            arrCopiedTasks.push(this.state.tasks[i]);
        }
        
        var foundTaskObj = arrCopiedTasks.find(findTaskObj);
        foundTaskObj.isCompleted = !foundTaskObj.isCompleted;
        console.log(foundTaskObj);

        //overwrite the database tasks
        firebaseRef.set(arrCopiedTasks);
        //refresh tasks
        this.setState({ tasks: arrCopiedTasks,
                        viewExpired: false });
    }

    /*
    // set to view expired tasks
    */
    viewExpired() {
        console.log("componentWillUpdate viewExpired was " + this.state.viewExpired);
        var firebaseRef;
        
        //you want to do the opposite of the current state
        if (!this.state.viewExpired){
            firebaseRef = firebase.database().ref().child('expired');
        }
        else {
            firebaseRef = firebase.database().ref().child('object');
        }
        
        var that = this;
        var inflatedTasks = [];
        
        //do data sync
        firebaseRef.on('value', snapshot => {
            
            
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

                
            });
            //attach the tasks to state
            that.setState({
                tasks: inflatedTasks,
                viewExpired: !that.state.viewExpired
            });
        });
    }

    /*
    // check tasks and set to expired
    */
    markExpired() {
        var firebaseRef = firebase.database().ref().child('object');
        var that = this;

        //replace the UI collection
        var arrCopiedTasks = [];

        for(var i=0;i<this.state.tasks.length;i++){
            arrCopiedTasks.push(this.state.tasks[i]);
        }

        //loop through the non-expired
        for (var i=0; i<arrCopiedTasks.length; i++){
            var createdDate = new Date(arrCopiedTasks[i].timeCreated);

            if (this.getDateAge(createdDate) > 60) {
                arrCopiedTasks[i].isExpired = true;

                console.log("set to expired " + arrCopiedTasks[i].description);
            }
        };

        //overwrite the database tasks
        firebaseRef.set(arrCopiedTasks);
        //refresh tasks
        this.setState({ tasks: arrCopiedTasks,
                        viewExpired: false });
    }

    /*
    // shift completed and expired tasks to the expired list
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

            if (this.getDateAge(createdDate) > 60) {
                //move the task to expired
                var taskToMove = {
                    ID:             taskIdentifier,
                    description:    taskDescription,
                    timeCreated:    createdDate.toISOString(),
                    isCompleted:    that.state.tasks[i].isCompleted,
                    isExpired:      true
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
        //var m = theDate.getMonth();
        //theDate.setMonth(m+1);

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

        //replace the UI task collection
        var copiedTasks = [];

        for(var i=0;i<this.state.tasks.length;i++){
            copiedTasks.push(this.state.tasks[i]);
        }

        function findTaskObj(task) {
            //get the object with the description we're looking for
            return task.description === oldTaskDesc;
        }
        
        var foundTaskObj = copiedTasks.find(findTaskObj);
        foundTaskObj.description = newTaskDesc;

        //overwrite the database tasks
        firebaseRefObject.set(copiedTasks);

        this.setState({ tasks: copiedTasks,
            viewExpired: false
        });
    }

    /*
    // deletes a task
    */
    deleteTask(ID){
        const firebaseRefObject = firebase.database().ref().child('object');

        //replace the UI task collection
        var copiedTasks = [];

        for(var i=0;i<this.state.tasks.length;i++){
            copiedTasks.push(this.state.tasks[i]);
        }
        
        //iterate and delete one
        for (var i=0; i<copiedTasks.length; i++){
            if (copiedTasks[i].ID == ID){
                //remove item at this position
                console.log("remove the item with description " + copiedTasks[i].description );
                copiedTasks.splice(i, 1);
            };
        };

        //overwrite the database tasks
        firebaseRefObject.set(copiedTasks);

        this.setState({ tasks: copiedTasks,
                        viewExpired: false
        });
    }

    /*
    // sets tasks to expired
    */
    expireTasks(){
        const firebaseRefObject = firebase.database().ref().child('object');
        var that = this;

        //replace the UI task collection
        var copiedTasks = [];

        for(var i=0;i<this.state.tasks.length;i++){
            copiedTasks.push(this.state.tasks[i]);
        }

        //iterate and delete one
        for (var i=0; i<copiedTasks.length; i++){
            var createdDate  = new Date(copiedTasks[i].timeCreated);
            if (that.getDateAge(createdDate) > 60) {
                //set expired property
                copiedTasks[i].isExpired = true;
                //remove from the active list
                console.log("set to expired " + copiedTasks[i].description);
            }
        };

        //overwrite the database tasks
        firebaseRefObject.set(copiedTasks);

        this.setState({ tasks: copiedTasks,
                        viewExpired: false
        });

    }

    /*
    // return the seconds between now and a passed in date
    */
    getDateAge(taskDate){
        var incomingDate = new Date(taskDate);
        var now = new Date();

        var difference = now.getTime() - incomingDate.getTime();
        return Math.round(difference / 1000);
    }


}