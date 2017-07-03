import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        { 
          this.props.loadingPrevious ? <div>You have previously saved your last search, please wait while we reload your results...</div> : <div></div>
        }
      <div className="cssload-loader">
        <div className="cssload-inner cssload-one"></div>
        <div className="cssload-inner cssload-two"></div>
        <div className="cssload-inner cssload-three"></div>
      </div>
      </div>
    )
  }
}


export default Loading;