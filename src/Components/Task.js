import React, { Component } from 'react';
import { Status } from '../logic/status.js';
import { getStatus } from '../logic/task.js';

class Task extends Component {
  render() {
    const {task, incompleteTasks, handleClick} = this.props;
    const status = getStatus(task,incompleteTasks);
    const {imgSrc, className} = getStyles(status);
    return (
      <div className="row">
        <div className='icon-container'>
            <img
                src={imgSrc}
                alt='checkbox'
                className='checkbox'
                onClick = {()=> {handleClick(task.id)}}/>
            </div>
        <div className={[className, 'icon-label-container'].join(' ')}>
            {task.task}
        </div>
      </div>
    );
  }
}

function getStyles(status){
    if(status === Status.locked){
        return {className: 'locked', imgSrc: 'images/Locked.svg'};
    }
    if(status === Status.incomplete){
        return {className: 'incomplete', imgSrc: 'images/Incomplete.svg'};
    }
    if(status === Status.completed){
        return {className: 'completed', imgSrc: 'images/Completed.svg'};
    }
}


export default Task;
