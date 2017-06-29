import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import JobList from './components/JobList.jsx';
import JobListItem from './components/JobListItem.jsx';
import Loading from './components/Loading.jsx';
import Dropzone from 'react-dropzone';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      technology: '',
      view: 'search',
      dropzoneActive: false
    };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(tech) {
    this.setState({
      view: 'loading'
    })

    fetch('/', {
      method: 'POST',
      body: tech
    })
    .then((response) => {
      return response.json();
    })
    .then(result => {
      if (result.error) {
        throw err;
      }
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
      console.log('files...', files);
      let formData  = new FormData();
      formData.append('file', files[0]);
      this.setState({
        dropzoneActive: false
      });
      fetch('/resume/jobs', {
        method: 'POST',
        body: formData
        //body: JSON.stringify(files[0])
      })
      .then(response => {
        console.log('RESPONSE', response);
        return response.json();
      })
      .then(result => {
        if (result.error) {
          throw err;
        }
        this.setState({
          jobs: result.results,
          view: 'jobs'
        });
      })
      .catch(err => {
        console.log('ERROR:', err);
      })
  }

  componentDidMount(props) {
    fetch('/testDB', {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(rjson => {
      console.log(rjson);
    })
  }

  render () {
    const { accept, dropzoneActive } = this.state;
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
          <div> <h1> Surveyor </h1></div>
          <Search onSearch = {this.onSearch}/>
          {this.state.view === 'loading'
            ? <Loading/>
            : this.state.view === 'jobs'
            ? <JobList jobList = {this.state.jobs}/>
            : null
          }
        </div>
      </Dropzone>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));