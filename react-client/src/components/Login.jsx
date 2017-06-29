import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <form action="/auth/facebook">
        <input type="submit" value="Log In" onClick={this.props.onLogin}></input>
      </form>
    )
  }
}

export default Login;