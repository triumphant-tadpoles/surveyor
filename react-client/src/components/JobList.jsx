import React from 'react';
import JobListItem from './JobListItem.jsx';

class JobList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="ui cards">
				{this.props.jobList.map(item => <JobListItem jobListItem = {item}/>)}
			</div>
		);
	};
};

export default JobList;
