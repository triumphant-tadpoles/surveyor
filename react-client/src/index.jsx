import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import JobList from './components/JobList.jsx';
import JobListItem from './components/JobListItem.jsx';
import Save from './components/Save.jsx';
import Load from './components/Load.jsx';
import Loading from './components/Loading.jsx';
import Dropzone from 'react-dropzone';
import Header from './components/Header.jsx';
import Start from './components/Start.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      technology: '',
      view: 'search',
      files: [],
      dropzoneActive: false,
      loadingPrevious: false,
      errMsg: ''
    };
    this.onSearch = this.onSearch.bind(this);
    this.saveQuery = this.saveQuery.bind(this);
    this.onTechnologyChange = this.onTechnologyChange.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onTechnologyChange(query) {
    this.setState({
      technology: query
    })
  }

  onSearch(query) {
    this.setState({
      view: 'loading'
    });

    var that = this;
    setTimeout(function() {
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: query})
      })
      .then((response) => {
        return response.json();
      })
      .then(result => {
        if (result.error) {
          throw err;
        }
        that.setState({
          jobs: result.results,
          view: 'jobs',
          loadingPrevious: false
        });
      })
      .catch(err => {
        that.setState({
          view: 'search',
          loadingPrevious: false,
          errMsg: err + ''
        })
      });
    }, 4000)
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    this.setState({
      view: 'loading'
    });
    let formData = new FormData();
    this.setState({
      files,
      dropzoneActive: false
    });
    formData.append('file', files[0]);
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      if (result.error) {
        throw err;
      }
      var query = result.join(', ');
      this.setState({
        technology: query
      });
      this.onSearch(query);
    })
    .catch(err => {
      this.setState({
        view: 'search',
        errMsg: err + ''
      });
    })
  }

  saveQuery(loginData) {
    fetch('/saveQuery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: loginData.id,
        query: this.state.technology
      }),
    });
  }

  onLoad(loginData) {
    fetch('/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: loginData.id
      })
    })
    .then(response => {
      return response.text()
    })
    .then(query => {
      if (query) {
        this.setState({
          loadingPrevious: true
        })
        this.onSearch(query);
      }
    });
  }

  componentDidMount(props) {
  }

  render () {
    const { accept, files, dropzoneActive } = this.state;
    return (
      <Dropzone
        disableClick
        style={{}}
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div className="overlay">Release to Search</div> }
        <div>
          <Header jobs={this.state.jobs}/>
          <div> <h1 id="title"> Surveyor  &#x1F50D; </h1></div>
            {this.state.view === 'search'
              ? this.state.errMsg === ''
                ? <Start errMsg=''/>
                : <Start errMsg={this.state.errMsg}/>
              : this.state.view === 'loading'
              ? <Loading loadingPrevious={this.state.loadingPrevious}/>
              : this.state.view === 'jobs'
              ? <JobList jobList={this.state.jobs} saveQuery={this.saveQuery}/>
              : null
            }
        </div>
        <div hidden>
          <Load onLoad={this.onLoad}/>
        </div>
      </Dropzone>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
