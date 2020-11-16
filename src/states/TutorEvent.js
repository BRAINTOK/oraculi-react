import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import $ from "jquery";
import LessonQuote from "./tutor/LessonQuote"; 
import EventParticipation from "./tutor/EventParticipation"; 
import {withRouter} from "react-router";
import layouts from "../layouts/layouts";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import Moment from 'react-moment';
import LessonComment from "./tutor/LessonComment";

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';

class TutorEvent extends BasicState
{
	getRoute = () =>
	{
		return "course-lessons";
	}
	render()
	{
		
		const id = this.props.match.params.id;
		const query = gql`query getBio_Event($id:String) {
			getBio_Event(id:$id) { 
				id
				post_title
				post_content
				post_date
				thumbnail
				time
				member_status
				request_form
				post_author
				{
				  id
				  display_name
				  avatar
				}
				bio_course
				{
				  id
				  post_title
				  logotype
				  children
				  {
					  id
					  post_title					  
					  children
					  {
						  id
						  post_title
						  
					  }
				  }
				}
				bio_olimpiad_type
				{
				  id
				  post_title
				}
				bio_class
				{
				  id
				  post_title
				}
				bio_biology_theme
				{
				  id
				  post_title
				  thumbnail
				}
				comments
				{
					id
					discussion_id
					discussion_type
					content
					parent_id
					author
					{
						avatar
						display_name
						id
					}
					date
					is_approved
					
				}
				__typename
			  }
		  }
		  `;
		return <div className="layout-state">
			<Query query={query} variables={{"id": id}}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <div className="layout-state bg-white"><Loading/></div>;
					}
					if(data)
					{	
						console.log(data.getBio_Event);
						const event = data.getBio_Event || {};	
						
						const classes = event.bio_class.map((e, i) => 
						{
							return <div className="tutor-label-class" key={i}>
								{e.post_title + " " + __("class") }
							</div>
						});
						const themes = event.bio_biology_theme.map((e, i) => 
						{
							return <div className="tutor-label" key={i}>
								{e.post_title}
							</div>
						});
						const courses = event.bio_course.map((e, i) => 
						{
							return <div className="tutor-label-course" key={i}>
								{e.post_title}
							</div>
						});
						const bio_olimpiad_type = event.bio_olimpiad_type.map((e, i) => 
						{
							return <div className="tutor-label-olympiad_type" key={i}>
								{e.post_title}
							</div>
						});
						
						
						return <div className=" mt-5">
								<div className="tutor-row">
									<div className="tutor-left-aside  mobile-relatived">
										{ 
											initArea( 
												"single-event-left-aside", 
												{ ...event, user:this.props.user, "prefix": "events" } 
											) 
										}
									</div>
									<div className="tutor-main">
									
										<div className="tutor-article-title">
											{event.post_title}										
										</div>
												
										<div className="lead mb-3">
											<Moment locale="ru" format="D MMMM YYYY">
												{ new Date(event.time * 1000) }
											</Moment>
											
										</div>					
										<div className="event-classes">
											{classes}
										</div>
										<div className="event-themes">
											{themes}
										</div>
										<div className="event-courses">
											{courses}
										</div>
										<div className="event-courses">
											{bio_olimpiad_type}
										</div>
										
										<div className="mt-5"
											dangerouslySetInnerHTML={{ __html: event.post_content }}
										/>
										
									
										<div className=" pt-3 "> 
											<EventParticipation user={this.props.user} { ...event } />
										</div>
										{ initArea( "single-event", { ...event, user:this.props.user, "prefix": "events" } ) } 
									</div>
									<div className="tutor-right-aside">
										{ 
											initArea( 
												"single-event-right-aside", 
												{ ...event, user:this.props.user, "prefix": "events" } 
											) 
										}
									</div>
								</div>
							</div>
					}						
					if(error)
					{
						return error.toString();
					}
				}
			}
			</Query>
		</div>
	}
}



export default  compose(
	withApollo,
	withRouter
)(TutorEvent);