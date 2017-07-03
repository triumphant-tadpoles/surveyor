import React from 'react';
import FacebookLogin from 'react-facebook-login';

class Save extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id="login">
        <FacebookLogin
          appId='134148277165166'
          autoLoad={true}
          size='small'
          textButton='Save results with facebook'
          callback={this.props.saveQuery}
        /> <span className="another">or drop another resume</span>
      </div>
    )
  }
}

export default Save;