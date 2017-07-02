import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.jobs.length !== 0 ? <p id="header">Drag and drop resume to search</p> : <span></span>}        
      </div>
    );
  }
}

export default Header;