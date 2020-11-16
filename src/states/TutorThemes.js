import React, {Component} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import {sprintf} from "../layouts/utilities/sprintf";
import {Query} from "react-apollo";
import Loading from "../layouts/utilities/Loading"; 
import {getQueryArgs, getQueryName, queryCollection} from "../layouts/schema";
import $ from "jquery";
import {Dialog, Classes, Button, Intent} from "@blueprintjs/core"; 

import ThemeCard from "./tutor/ThemeCard";

class TutorThemes extends BasicState
{
	getRoute = () =>
	{
		return "themes";
	}
	addRender()
	{ 
		const query_name = getQueryName("Bio_Biology_Theme");
		const query_args = getQueryArgs("Bio_Biology_Theme");
		const query = queryCollection( "Bio_Biology_Theme", query_name, query_args );
		
		return <div className="course-card-list">
			<Query query={query}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <Loading/>;
					}
					if(data)
					{
						const current_course_id = this.props.user 
						? 
						this.props.user.current_course ? this.props.user.current_course.id: -1 
						: 
						-1;
						const current_course_title = this.props.user 
						? 
						this.props.user.current_course ? this.props.user.current_course.post_title: "" 
						: 
						"";	
						
						const courses = data[query_name].filter(e => e.parent == 0 || !e.parent);
						console.log(courses);
						let coursesList = courses.map((e, i) =>
						{
							return <ThemeCard user={this.props.user} {...e} key={i} i={i} />
						});
						return <div className="themes-card-list">
							{coursesList}
						</div>;
					}
				}
			}
			</Query>
		</div>
	}
}
export default (TutorThemes);