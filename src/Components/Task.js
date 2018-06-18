import React, { Component } from 'react';
import { Status } from '../status.js';

class Task extends Component {
  render() {
    return (
      <div className="row" onClick = {()=> this.props.toggleTaskCompletion(this.props.data.id)}>
        <img src={getImage(this.props.status)}/>
        {this.props.data.task}
      </div>
    );
  }
}

function getImage(status){
    if(status === Status.locked){
        return 'images/Locked.svg'
    }
    if(status === Status.incomplete){
        return 'images/Incomplete.svg'
    }
    if(status === Status.completed){
        return 'images/Completed.svg'
    }
}

export default Task;
