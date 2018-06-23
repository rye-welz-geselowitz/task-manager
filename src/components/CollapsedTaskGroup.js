import React, { Component } from 'react';

class CollapsedTaskGroup extends Component {
  render() {
    const {tasks, handleClick, name} = this.props;

    const countCompleted = tasks
        .reduce((acc, val) => acc + (val.completedAt===null? 0 : 1), 0);

    return (
      <div className="row" onClick = {() => handleClick(name)}>
        <div className='icon-container'>
            <img src = 'images/Group.svg' alt='task-group' className='icon'/>
        </div>
        <div className = 'icon-label-container'>
            <div className='task-group-name'>{name}</div>
            <div className='count-completed'>
                {countCompleted} of {tasks.length} tasks complete
            </div>
        </div>
      </div>
    );
  }
}

export default CollapsedTaskGroup;
