import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      technology: ''
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(tech) {
    fetch('/', {
      method: 'POST',
      body: tech
    })
    .then((response) => {
      return response.json();
    }).then(result => {
      console.log('Client: Data from server: ', result);
      console.log(result);
    })
    .catch((err) => {
      console.log('ERROR:', err);
    })
    // get the data, set jobs state
    // render list component
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
    return (
      <div>
        <Search onSearch = {this.onSearch}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));