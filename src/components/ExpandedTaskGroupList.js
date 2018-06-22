import React, { Component } from 'react';
import ExpandedTaskGroup from './ExpandedTaskGroup.js';

class ExpandedTaskGroupList extends Component {
  render() {
    const {incompleteTasks, handleTaskClick, groups} = this.props;
    return (
      <div>
        {groups.map( (group) => {
            return <ExpandedTaskGroup
                    key = {group.name}
                    incompleteTasks = {incompleteTasks}
                    group ={group}
                    handleTaskClick = {handleTaskClick}/>
        })}
      </div>
    );
  }
}

export default ExpandedTaskGroupList;
