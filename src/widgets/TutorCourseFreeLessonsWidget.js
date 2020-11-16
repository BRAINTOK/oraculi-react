import React,{Component} from "react";
import {__} from "../layouts/utilities/i18n";
import {AppToaster} from "../layouts/utilities/blueUtils";
import { Intent } from "@blueprintjs/core";
import {sprintf} from "../layouts/utilities/sprintf";
import { NavLink } from 'react-router-dom'; 

import {Query, withApollo} from "react-apollo";
import {compose} from "recompose";
import gql from 'graphql-tag';
import Loading from "../layouts/utilities/Loading";

class TutorCourseFreeLessonsWidget extends Component
{
	render()
	{
		const lessons = this.props.articles
			?
			this.props.articles
				.filter(e => e.is_free)
					.map((e, i) =>
					{ 
						return <NavLink key={i}
							to={ "/article/" + e.id }
							className=" "
						>
							<div className="lesson-thumbnail" style={{ backgroundImage:"url(" + e.thumbnail + ")" }}>
								<div className="">
									{e.post_title}
								</div>
							</div>
						</NavLink>
					})
			:
			null;
		
		console.log( lessons );
		return <div>
			<div className="aside-widget-title">
				{__("Free articles:")}
			</div>
			{
				lessons.length > 0
				?
				<div>
					{lessons}
				</div>
				:
				<div className="alert alert-secondary">
					{__("No articles exists")}
				</div>
			}
		</div>;
	}
}
export default TutorCourseFreeLessonsWidget;