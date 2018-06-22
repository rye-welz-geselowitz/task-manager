import React, { Component } from 'react';

class TopBar extends Component {
  render() {
        const {showAllGroups} = this.props;
        return (
            <div class = 'header'>
                <button id= 'clear-filter'
                    onClick = {showAllGroups}>
                    All Groups</button>
            </div>)

  }
}

export default TopBar;
