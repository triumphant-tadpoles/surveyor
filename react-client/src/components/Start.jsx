import React from 'react';

class Start extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="dropzone">
        {this.props.errMsg.length > 0
         ? <h3> Error analysing Resume! Please try again later</h3>
         : null
        }
        <h3>Drag Resume Here</h3>
      </div>
    );
  }
};

export default Start;