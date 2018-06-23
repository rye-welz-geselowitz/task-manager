import React, { Component } from 'react';
import Task from './Task.js';

class ExpandedTaskGroup extends Component {
  render() {
    const {group, incompleteTasks, handleTaskClick} = this.props;
    return (
      <div>
        <h1>{group.name}</h1>
        {group.tasks.map((task)=>{
            return <Task
                key = {task.id}
                task ={task}
                incompleteTasks = {incompleteTasks}
                handleClick = {handleTaskClick}/>
        })}
      </div>
    );
  }
}

export default ExpandedTaskGroup;
