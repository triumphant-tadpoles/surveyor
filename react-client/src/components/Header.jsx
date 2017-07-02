import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.jobs.length !== 0 ? <p>Drop resume to search</p> : <span></span>}        
      </div>
      //test
    );
  }
}

export default Header;