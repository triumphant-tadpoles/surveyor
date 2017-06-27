import React from 'react';

class JobListItem extends React.Component {
	constructor(props) {
		super(props);
		console.log('JobListItem..', this.props.jobListItem);
	}

	render() {
		return (
			<div>
				{this.props.jobListItem.jobtitle}
				{this.props.jobListItem.company}
				{this.props.jobListItem.snippet}
			</div>
		);
	};
};

export default JobListItem;