import React, { Component } from 'react';
import TaskGroup from './Components/TaskGroup.js';
import SelectedGroups from './Components/SelectedGroups.js';
import axios from 'axios';
import { groupBy } from './utils';
import Loading from './Components/Loading.js';
import { Status } from './status.js';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = { tasks: null, selectedGroup: null }
    }
    componentDidMount(){
        axios.get('./data/sample-payload.json')
        .then( (res) => { this.setState({...this.state, tasks: res.data}) })
    }
    render() {
        const { tasks } = this.state;
        if(!tasks){ return <Loading/> };
        const taskStateLookup = getTaskStateLookup(this.state.tasks);
        const taskGroups = groupBy(tasks, "group",
            (k,v)=> {return {name: k, tasks: v}})
        return (
          <div className="App">
            <div className='panel'>
                <h1> Things To Do </h1>
                {
                    this.state.tasks.length?
                        taskGroups.map((group) => {
                            return <TaskGroup
                                key = {group.name}
                                name = {group.name}
                                tasks = {group.tasks}
                                setSelectedGroup = {setSelectedGroup.bind(this)}
                                />
                        })
                        : <div>No tasks</div>

                }
            </div>
            <div className='panel'>
              <SelectedGroups
                taskStateLookup = {taskStateLookup}
                clearFilter = {setSelectedGroup.bind(this, null)}
                groups = {filterTaskGroups.call(this, taskGroups)}
                toggleTaskCompletion = {toggleTaskCompletion.bind(this, tasks, taskStateLookup)}
                />
            </div>
          </div>

        );
    }
}

function getTaskStateLookup(tasks){
    const incompleteTasks = new Set();
    tasks.forEach((task)=> {
        if(task.completedAt===null){
            incompleteTasks.add(task.id);
        }
    });
    return tasks.reduce( (acc, task) => {
        return {...acc, [task.id]: getState(task, incompleteTasks)}
    }, {});
}

function getState(task, incompleteTasks){
    const locked = isLocked(task, incompleteTasks);
    if(locked) { return Status.locked; }
    return task.completedAt===null? Status.incomplete : Status.completed;
}
function isLocked(task, incompleteTasks){
    return task.dependencyIds.reduce((acc, val)=> {
        return acc || incompleteTasks.has(val);
    }, false)
}

function filterTaskGroups(taskGroups){
    return this.state.selectedGroup === null? taskGroups :
        taskGroups.filter( (groupData) => groupData.name === this.state.selectedGroup);
}

function setSelectedGroup(group){
    this.setState({...this.state, selectedGroup: group})
}

function toggleTaskCompletion(tasks, taskStateLookup, id){
    const updatedTasks =
        tasks.map( (taskData)=> {
            const state = taskStateLookup[taskData.id];
            if(taskData.id!==id || state === Status.locked) {return taskData};
            if(state === Status.incomplete){ return {...taskData, completedAt: Date.now()}}
            if(state === Status.complete){ return {...taskData, completedAt: null} }
        })
    this.setState({...this.state, tasks: updatedTasks})
}



export default App;
