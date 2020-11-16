import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import $ from "jquery";
import CourseArticleList from "./tutor/CourseArticleList"; 
import CourseTestList from "./tutor/CourseTestList"; 
import CourseEventList from "./tutor/CourseEventList"; 
import CourseTalkRoom from "./tutor/CourseTalkRoom"; 
import ClassLessons from "./tutor/ClassLessons"; 
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import layouts from "../layouts/layouts";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import { NavLink } from 'react-router-dom';

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';


class TutorThemeLessons extends BasicState
{
	basic_state_data()
	{
		return {
			tabs :[
				{ name:"articles", 	title:"Articles",	component: CourseArticleList },
				{ name:"tests", 	title:"Tests", 		component: CourseTestList },
				{ name:"events", 	title:"Events", 	component: CourseEventList }
			],
			
		};
	}
	getRoute = () =>
	{
		return "theme-lessons";
	}
	render()
	{
		const id 	= this.props.match.params.id;
		const type	= "Bio_Biology_Theme";
		const query_name ="get" + type;
		const query = gql`query ${query_name}($id:String)
		{
			${query_name}(id:$id)
			{
				id
				post_title
				post_content
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
				bio_test
				{
					id
				}
				bio_event
				{
					id
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
						console.log(data[query_name]);
						const course = data[query_name] || {}; 
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
											{ __("Theme") + ": " + course.post_title }
										</div>			
									</div>				
							</div>						
							<ClassLessons 
								tabs={ this.state.tabs }
								route={ this.getRoute() }
								user={ this.props.user }
								course={ { ...course } }
								id={ this.props.match.params.id }
								onLeave={ this.onLeave } 
								type={"bio_biology_theme"}
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
)(TutorThemeLessons);