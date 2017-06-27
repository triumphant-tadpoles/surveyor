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
    // $.ajax({
    //   url: '/testdb',
    //   type: 'GET',
    //   success: (data) => {
    //     console.log(data)
    //   },
    //   error: () => {
    //     console.log('error in getting data');
    //   }
    // });
  }

  componentDidMount(props) {
    this.testdb();
    // $.ajax({
    //   url: '/',
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));