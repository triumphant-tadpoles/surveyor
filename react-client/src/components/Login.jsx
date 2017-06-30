import React from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <FacebookLogin
          appId='134148277165166'
          fields='name, email, picture'
          callback={this.props.onLogin}
        />
      </div>
    )
  }
}

export default Login;