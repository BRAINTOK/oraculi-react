import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import $ from "jquery";
import CourseArticleList from "./tutor/CourseArticleList"; 
import CourseTestList from "./tutor/CourseTestList"; 
import CourseEventList from "./tutor/CourseEventList"; 
import CourseTalkRoom from "./tutor/CourseTalkRoom"; 
import CourseLessons from "./tutor/CourseLessons"; 
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import layouts from "../layouts/layouts";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import { NavLink } from 'react-router-dom';

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';


class TutorCourseLessons extends BasicState
{
	basic_state_data()
	{
		return {
			tabs :[
				{ name:"articles", 	title:"Articles",	component: CourseArticleList },
				{ name:"tests", 	title:"Tests", 		component: CourseTestList },
				{ name:"events", 	title:"Events", 	component: CourseEventList },
				{ name:"talkroom", 	title:"Talk Room", 	component: CourseTalkRoom }
			],
			
		};
	}
	getRoute = () =>
	{
		return "course-lessons";
	}
	render()
	{
		const id = this.props.match.params.id;
		const query = gql`query getBio_Course($id:String)
		{
			getBio_Course(id:$id)
			{
				id
				post_title
				post_content
				date
				thumbnail
				logotype
				jitsi
				jitsi_password
				post_date
				includes
				is_member
				is_closed
				bio_facultet
				{
					id
					post_title
				}
				articles
				{
					id
					post_title
					post_content
					is_free
					is_logged_in
					thumbnail
					is_favorite
				}
				parent
				{
					id
					post_title
				}
				children {
					id
					post_title
					post_content
					children 
					{
						id
						post_title
						post_content
						children 
						{
							id
							post_title
							post_content
							children 
							{
								id
								post_title
								post_content
								children 
								{
									id
									post_title
									post_content
									children 
									{
										id
										post_title
										post_content
									}
								}
							}
						}
					}
					__typename
				}
				bio_facultet
				{
					id
					post_title
				}
				
				__typename
			}
		}`;
		  
		  
		return <div className="layout-state p-0">
			<Query query={query} variables={{"id": id}}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <Loading/>;
					}
					if(data)
					{	
						console.log(data.getBio_Course);
						const course = data.getBio_Course || {}; 
						const pic = course.thumbnail != "false" ? course.thumbnail : "";
						
						return <Fragment>
							<div 
								className="course__header"  
								style={{					
									backgroundImage:"url(" + pic + ")"
								}}
							>			
									<div className="z-index-10 container">
										<div className="title text-light">
											{course.post_title}
											{
												course.bio_facultet && course.bio_facultet.id
													?
													<div className="small">
														<NavLink
															className="text-light"
															to={"/facultet/" + course.bio_facultet.id}
														>
															<span className="thin">
																{__("Facultet") + ": "}
															</span>
															{course.bio_facultet.post_title }
														</NavLink>
													</div>
													:
													null
											}
										</div>			
									</div>				
							</div>						
							<CourseLessons 
								tabs={ this.state.tabs }
								route={ this.getRoute() }
								user={ this.props.user }
								course={ course }
								id={ this.props.match.params.id }
								onLeave={ this.onLeave }
							/>							
						</Fragment>
						
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
	onTab = evt =>
	{
		const tab = evt.currentTarget.getAttribute("tab");
		this.setState({tab});
	}
	onLeave = () =>
	{
		this.setState({ tab: this.state.tabs[0].name });
	}
}

export default  compose(
	withApollo,
	withRouter
)(TutorCourseLessons);