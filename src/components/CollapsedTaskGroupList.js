import React, { Component } from 'react';
import CollapsedTaskGroup from './CollapsedTaskGroup.js';

class CollapsedTaskGroupList extends Component {
  render() {
        const {groups, handleGroupClick} = this.props;
        return (
          <div>
              <div>
                <h1> Things To Do </h1>
              </div>
              {
                  groups.length?
                      groups.map((group) => {
                          return <CollapsedTaskGroup
                              key = {group.name}
                              name = {group.name}
                              tasks = {group.tasks}
                              handleClick = {(group) => handleGroupClick(group)}
                              />
                      })
                      : <div>No tasks</div>

              }
          </div>)

  }
}

export default CollapsedTaskGroupList;
