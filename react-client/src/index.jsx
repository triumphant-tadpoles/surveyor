import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  testdb() {
    console.log('testdb run');
    fetch('/testdb', {
      method: 'GET',
    }).then(response => {
      return response.json();
    }).then(rjson => {
      console.log(rjson);
    });
  }

  componentDidMount(props) {
    this.testdb();
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));