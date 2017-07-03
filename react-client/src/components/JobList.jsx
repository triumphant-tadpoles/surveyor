import React from 'react';
import JobListItem from './JobListItem.jsx';
import Save from './Save.jsx';

class JobList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="job-list">
				<div>
					<Save saveQuery={this.props.saveQuery}/>
				</div>
				<div className="ui cards">
					{this.props.jobList.map(item => <JobListItem jobListItem = {item}/>)}
				</div>
			</div>
		);
	};
};

export default JobList;
