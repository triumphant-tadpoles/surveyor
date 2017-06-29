import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <input type="submit" value="Log In" onClick={this.props.onLogin}></input>
      </div>
    )
  }
}

export default Login;