import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
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
      loadingPrevious: false
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
      .catch((err) => {
        that.setState({
          view: 'search',
          loadingPrevious: false
        })
        console.log('ERROR');
      });
    }, 3000)
  }

  onDragEnter() {
    console.log('enter')
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    console.log('leave')
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    console.log(files[0]);
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
      console.log('RESPONSE', response);
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
    });
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
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };
    return (
      <Dropzone
        disableClick
        style={{}}
        accept={accept}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
        <div>
          <Header jobs={this.state.jobs}/>
          <div> <h1 id="title"> Surveyor </h1></div>
            {this.state.view === 'search'
              ? <Start/>
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
