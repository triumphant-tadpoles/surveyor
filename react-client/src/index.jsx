import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import JobList from './components/JobList.jsx';
import JobListItem from './components/JobListItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      technology: '',
      showJobs: false,
      showSearch: false,
      view: 'search'
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(tech) {
    console.log('onSearch..');
    fetch('/', {
      method: 'POST',
      body: tech
    })
    .then((response) => {
      return response.json();
    }).then(result => {
      console.log('Client: Data from server: ', result);
      this.setState({
        jobs: result.results,
        showJobs: true,
        showSearch: false,
        view: 'jobs'
      });
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
        <div> <h1> Surveyor </h1></div>
        {this.state.view === 'search' 
          ? <Search onSearch = {this.onSearch}/>
          : this.state.view === 'jobs'
          ? <JobList jobList = {this.state.jobs}/>
          : null
        }
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));