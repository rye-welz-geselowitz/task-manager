import React, { Component } from 'react';
import SelectedGroup from './SelectedGroup.js';

class SelectedGroups extends Component {
  render() {
    return (
      <div>
        <span onClick = {this.props.clearFilter}>All Groups</span>
        {this.props.groups.map( (group) => {
            return <SelectedGroup data ={group}/>
        })}
      </div>
    );
  }
}

export default SelectedGroups;
