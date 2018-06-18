import React, { Component } from 'react';
import TaskGroup from './TaskGroup.js';
import SelectedGroups from './SelectedGroups.js';
import payload from './sample-payload.json';
import './App.css';

function groupByGroup(tasks){
    const groupToTasks = {};
    tasks.forEach((taskData)=> {
        if(!(taskData.group in groupToTasks)){ groupToTasks[taskData.group] = []}
        groupToTasks[taskData.group].push(taskData)
    }, {});
    return Object.keys(groupToTasks).reduce((acc, key)=> {
        return acc.concat([{name: key, tasks: groupToTasks[key]}]);
    }, []);
}

function markLockedTasks(tasks){
    const incompleteTasks = new Set();
    tasks.forEach((task)=> {
        if(task.completedAt===null){
            incompleteTasks.add(task.id);
        }
    })
    return tasks.map( (task) => {
        const isLocked = task.dependencyIds.reduce((acc, val)=> {
            return acc || incompleteTasks.has(val);
        }, false);
        return {...task, locked: isLocked}
    })
}

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          tasks: markLockedTasks(payload),
          selectedGroup: null //TODO: Should probs be an id and not a string
      }
    }
    render() {
        const setSelectedGroup = (group)=> {
            this.setState({...this.state, selectedGroup: group})
        }
        const taskGroups = groupByGroup(this.state.tasks);
        const filteredGroups =
            this.state.selectedGroup === null? taskGroups :
                taskGroups.filter( (groupData) => groupData.name === this.state.selectedGroup)

        return (
          <div className="App">
            <h1> Things To Do </h1>
            {
                taskGroups.map((group) => {
                    return <TaskGroup
                        name = {group.name}
                        tasks = {group.tasks}
                        setSelectedGroup = {setSelectedGroup}
                        />
                })
            }
          <SelectedGroups
            clearFilter = {() => {setSelectedGroup(null)}}
            groups = {filteredGroups}
            />
          </div>

        );
    }
}

export default App;
