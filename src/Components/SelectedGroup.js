import React, { Component } from 'react';
import Task from './Task.js';

class SelectedGroup extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.data.name}</h2>
        {this.props.data.tasks.map((task)=>{
            return <Task
                key = {task.id}
                status = {this.props.taskStateLookup[task.id]}
                data ={task}
                toggleTaskCompletion = {this.props.toggleTaskCompletion}/>
        })}
      </div>
    );
  }
}

export default SelectedGroup;