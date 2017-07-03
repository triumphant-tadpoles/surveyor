import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.jobs.length !== 0 ? <span></span> : <span></span>}        
      </div>
    );
  }
}

export default Header;