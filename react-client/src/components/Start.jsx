import React from 'react';

class Start extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="dropzone">
        {this.props.errMsg.length > 0
         ? <h3> There was an error analyzing your resume. Please try again.</h3>
         : null
        }
        <h3>Drag Resume Here</h3>
      </div>
    );
  }
};

export default Start;