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
          textButton='Save results'
          fields='name'
          callback={this.props.saveQuery}
        />
      </div>
    )
  }
}

export default Save;