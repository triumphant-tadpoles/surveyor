import React from 'react';

class JobListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="card">
				<div className="content">
					<div className="header">
						<a href={this.props.jobListItem.url}>
							{this.props.jobListItem.jobtitle}
						</a>
					</div>
					<div className="content">
						<div className="header">
							<b>{this.props.jobListItem.company}</b> &nbsp;&nbsp;&nbsp;&nbsp;
									<span className="meta">{this.props.jobListItem.formattedLocation} </span>
						</div>
						<div className="description">
							{this.props.jobListItem.snippet}
						</div>
						<div className="meta">
							{this.props.jobListItem.formattedRelativeTime} 
						</div>
					</div>
				</div>
			</div>
		);
	};
};

export default JobListItem;