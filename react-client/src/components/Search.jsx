import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technology: ''
    };
    this.search = this.search.bind(this);
  }

  search(e) {
    e.preventDefault();
    this.props.onSearch(this.state.technology);
  }

  render() {
    return (
      <div>
      <div> &nbsp; </div>
      <div> &nbsp; </div>
        <form className="ui form">
        <div className="inline fields">
          <div className="five wide field">
            <input placeholder="technology.." onChange={(e)=> {this.setState({technology: e.target.value})}} type="text"/>
            <button className="ui blue button small" onClick={this.search}>Search</button>
          </div>
        </div>
        </form>
      </div>
    );
  }
};

export default Search;