import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="loading-box">
        <div className="cssload-loader">
          <span></span>
        </div>
        { 
          this.props.loadingPrevious ? 
            <div className="loading-text">Remembering your last resume</div> 
            : <div className="loading-text">Analyzing your resume</div>
        }
        <p></p>
      </div>
    )
  }
}


export default Loading;