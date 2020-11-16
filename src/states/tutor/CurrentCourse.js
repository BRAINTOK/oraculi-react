import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import CourseArticleList from "./CourseArticleList"; 
import CourseTestList from "./CourseTestList"; 
import CourseEventList from "./CourseEventList"; 
import CourseTalkRoom from "./CourseTalkRoom"; 
import $ from "jquery"; 
import {Router, Route, Switch, Redirect, withRouter} from "react-router"; 
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo"; 
import Loading from "../../layouts/utilities/Loading";
import { NavLink } from 'react-router-dom';
import getWidget, { initArea } from "../../layouts/utilities/getWidget";
 

class CurrentCourse extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			 
		};
	}
	render()
	{ 
		const {course, user} = this.props; 
		return <div className="container"> 
			<div>
			{
				initArea( 
					"curent-course-content", 
					{ ...this.props } 
				) 
			}
			</div>
		</div>
		
			
	}
}
export default compose(
	withRouter
)(CurrentCourse) 