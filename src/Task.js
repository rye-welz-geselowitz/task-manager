import React, { Component } from 'react';

class Task extends Component {
  render() {
    return (
      <div>
        <img src={getImage(this.props.data)}/>
        {this.props.data.task}
      </div>
    );
  }
}

function getImage(task){
    if(task.locked){
        return 'Locked.svg'
    }
    else if(task.completedAt===null){
        return 'Completed.svg'
    }
    else{
        return 'Incomplete.svg'
    }
}

export default Task;
