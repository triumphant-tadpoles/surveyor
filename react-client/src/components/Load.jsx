import React from 'react';
import FacebookLogin from 'react-facebook-login';

class Load extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div>
          This is load, not login
        </div>
        <FacebookLogin
          appId='134148277165166'
          autoLoad={true}
          fields='name, email, picture'
          callback={this.props.onLoad}
        />
      </div>
    )
  }
}

export default Load;