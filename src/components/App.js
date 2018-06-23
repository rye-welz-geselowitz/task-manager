import React, { Component } from 'react';
import CollapsedTaskGroupList from './CollapsedTaskGroupList';
import ExpandedTaskGroupList from './ExpandedTaskGroupList';
import TopBar from './TopBar'
import axios from 'axios';
import { toggleTaskInList, getTaskGroups,
    filterTaskGroups, getIncompleteTaskSet } from '../logic/task'

class App extends Component {
    // React Lifecycle Methods
    constructor(props) {
      super(props);
      this.state = { tasks: null, selectedGroup: null }
    }
    componentDidMount(){
        axios.get('./data/sample-payload.json')
        .then( (res) => {
            this.setState({...this.state, tasks: res.data})
        })
    }
    render() {
        const { tasks } = this.state;
        if(!tasks){ return <div> Loading... </div> };
        const taskGroups = getTaskGroups(tasks);
        const incompleteTasks = getIncompleteTaskSet(tasks);
        return (
            <div className="App">
                <TopBar showAllGroups = {() =>
                    {this.setSelectedGroup(null)}} />
                <div>
                    <div className='panel'>
                        <CollapsedTaskGroupList
                            groups = {taskGroups}
                            handleGroupClick = {(group) =>
                                {this.setSelectedGroup(group)}}
                            />
                    </div>
                    <div className='panel'>
                      <ExpandedTaskGroupList
                        groups = {
                            filterTaskGroups(taskGroups,
                                this.state.selectedGroup)}
                        incompleteTasks = {incompleteTasks}
                        handleTaskClick = {
                            (id) => this.toggleTaskCompletion(tasks, id)}
                        />
                    </div>
                  </div>
            </div>
        )
    }
    // Methods to pass to children components
    setSelectedGroup(group){
        this.setState({...this.state, selectedGroup: group})
    }
    toggleTaskCompletion(tasks, id){
        this.setState({...this.state, tasks: toggleTaskInList(tasks, id)})
    }
}



export default App;
