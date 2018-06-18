import React, { Component } from 'react';
import SelectedGroup from './SelectedGroup.js';

class SelectedGroups extends Component {
  render() {
    return (
      <div>
        <button id= 'clear-filter' onClick = {this.props.clearFilter}>All Groups</button>
        {this.props.groups.map( (group) => {
            return <SelectedGroup
                    key = {group.name}
                    taskStateLookup = {this.props.taskStateLookup}
                    data ={group}
                    toggleTaskCompletion = {this.props.toggleTaskCompletion}/>
        })}
      </div>
    );
  }
}

export default SelectedGroups;
