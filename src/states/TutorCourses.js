import React, {Component} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import {sprintf} from "../layouts/utilities/sprintf";
import {Query} from "react-apollo";
import Loading from "../layouts/utilities/Loading";
import LazyLoading from "../layouts/utilities/LazyLoading";
import {getQueryArgs, getQueryName, queryCollection} from "../layouts/schema";
import $ from "jquery";
import {Dialog, Classes, Button, Intent} from "@blueprintjs/core"; 

import CourseCard from "./tutor/CourseCard";

class TutorCourses extends BasicState
{
	getRoute = () =>
	{
		return "all-courses";
	}
	addRender()
	{ 
		const query_name = getQueryName("Bio_Course");
		const query_args = getQueryArgs("Bio_Course");
		const query = queryCollection( "Bio_Course", query_name, query_args );
		
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
							return <CourseCard user={this.props.user} {...e} key={i} i={i} />
						});
						return [coursesList];
					}
				}
			}
			</Query>
		</div>
	}
}
export default (TutorCourses);