import React from 'react';
import FacebookLogin from 'react-facebook-login';

class Save extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div>
          Save your search with Facebook Login
        </div>
        <FacebookLogin
          appId='134148277165166'
          autoLoad={true}
          fields='name, email, picture'
          callback={this.props.saveQuery}
        />
      </div>
    )
  }
}

export default Save;