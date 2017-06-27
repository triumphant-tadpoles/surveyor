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
    console.log('search component technology=', this.state.technology);
    this.props.onSearch(this.state.technology);
  }

  render() {
    return (
      <div>
        <input placeholder="technology.." onChange={(e)=> {this.setState({technology: e.target.value})}} type="text"/>
        <button onClick={this.search}>Search</button>
      </div>
    );
  }
};
//asjlkdfaksdfjalsjd

export default Search;