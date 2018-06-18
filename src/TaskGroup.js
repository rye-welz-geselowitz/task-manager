import React, { Component } from 'react';

class TaskGroup extends Component {
  render() {
    const countCompleted =
        this.props.tasks
        .reduce((acc, val) => acc + (val.completedAt===null? 0 : 1), 0)
    return (
      <div className="task-group" onClick = {() => this.props.setSelectedGroup(this.props.name)}>
        <div>
            <img src = 'Group.svg'></img>
            <span>{this.props.name}</span>
        </div>
        <div>
            <span>{countCompleted} of {this.props.tasks.length} tasks completed</span>
        </div>
      </div>
    );
  }
}

export default TaskGroup;
