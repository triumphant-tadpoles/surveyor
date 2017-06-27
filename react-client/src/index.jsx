import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import JobList from './components/JobList.jsx';
import JobListItem from './components/JobListItem.jsx';
import Loading from './components/Loading.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      technology: '',
      view: 'search'
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(tech) {
    this.setState({
      view: 'loading'
    })


    console.log('onSearch..');
    fetch('/', {
      method: 'POST',
      body: tech
    })
    .then((response) => {
      return response.json();
    }).then(result => {
      if (result.error) {
        throw err;
      }

      console.log('Client: Data from server: ', result);
      this.setState({
        jobs: result.results,
        view: 'jobs'
      });
    })
    .catch((err) => {
      this.setState({
        view: 'search'
      })
      console.log('ERROR');
    })
    // get the data, set jobs state
    // render list component

  }







  componentDidMount(props) {
  }

  render () {
    return (
      <div>
        <div> <h1> Surveyor </h1></div>
        {this.state.view === 'loading'
          ? <Loading/>
          : this.state.view === 'search' 
          ? <Search onSearch = {this.onSearch}/>
          : this.state.view === 'jobs'
          ? <JobList jobList = {this.state.jobs}/>
          : null
        }
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));