import React, {Component} from "react";
import BasicState from "../../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../../layouts/utilities/i18n";
import {sprintf} from "../../layouts/utilities/sprintf";
import {Query} from "react-apollo";
import Loading from "../../layouts/utilities/Loading";
import LazyLoading from "../../layouts/utilities/LazyLoading";
import {getQueryArgs, getQueryName, queryCollection} from "../../layouts/schema"; 
import {Dialog, Classes, Button, Intent} from "@blueprintjs/core"; 

class CourseCard extends Component
{
	render()
	{
		const quote = this.props.post_content
			.split(" ")
				.slice(0, 14)
					.join(" ")
						+ "...";
						
		const nav = this.props.is_member
			?
			<NavLink 
				to={"/course-lessons/" + this.props.id}
				className="course-lessond-link"
			>
				{__("Continue learning")}
			</NavLink>
			:
			<NavLink 
				to={"/course/" + this.props.id}
				className="course-link"
			>
				{__("More")}
			</NavLink>
		const title = this.props.is_member
			?
			<NavLink className="course-title" to={"/course-lessons/" + this.props.id}>
				<div className="course-thumb" style={{ backgroundImage:"url(" + this.props.thumbnail + ")" }}/>
				{this.props.post_title}
			</NavLink>				
			:
			<NavLink className="course-title" to={"/course/" + this.props.id}>
				<div className="course-thumb" style={{ backgroundImage:"url(" + this.props.thumbnail + ")" }}/>
				{this.props.post_title}
			</NavLink>
				
		return <div className="course-card">
			
			{title}
			<div className="course-quote">
				{quote}
			</div>
			{nav}
			
		</div>
	}
}

export default CourseCard;