import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="cssload-loader">
        <div className="cssload-inner cssload-one"></div>
        <div className="cssload-inner cssload-two"></div>
        <div className="cssload-inner cssload-three"></div>
      </div>
    )
  }
}


export default Loading;