import React from 'react';
import JobListItem from './JobListItem.jsx';

class JobList extends React.Component {
	constructor(props) {
		super(props);
		console.log('jobList..', this.props.jobList);
	}

	render() {
		return (
			<div>
				{this.props.jobList.map(item => <JobListItem jobListItem = {item}/>)}
			</div>
		);
	};
};

export default JobList;
