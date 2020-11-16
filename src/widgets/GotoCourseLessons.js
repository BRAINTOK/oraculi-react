import React, {Component,Fragment} from "react";
import { __ } from "../layouts/utilities/i18n";
import { NavLink } from 'react-router-dom'; 
import {withRouter} from "react-router";
import {compose} from "recompose";
import {Query, Mutation, withApollo} from "react-apollo";

class GotoCourseLessons extends Component
{
	render()
	{
		return this.props.is_member
			?
			<NavLink className="btn btn-primary mt-4" to={"/course-lessons/" + this.props.id}>
				{__("Continue training")}
			</NavLink>
			:
			this.props.is_closed
				?
				<div className="alert alert-danger my-3">
					{__("Course Leaders closed requests to add online.")}
				</div>
				:
				<div>
					<div className="btn btn-success btn-block mt-4" onClick={this.onAddRequest}>
						{__("Send request add to Course")}
					</div>
				</div>
	}
	onAddRequest = () =>
	{
		console.log("on add request");
	}
}
export default compose(
	withApollo
)(GotoCourseLessons);