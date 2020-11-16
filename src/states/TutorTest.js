import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import Test from "./tutorTest/Test";
import $ from "jquery";  
import {withRouter} from "react-router"; 
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading"; 

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';
const query = gql`query getBio_Test($id:String) {
			getBio_Test(id:$id) { 
				id
				post_title
				post_content
				post_date
				is_timed
				duration
				try_count
				is_show_results
				is_shuffle
				is_show_answer
				is_group
				publish_type
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
				  icon
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
				questions
				{
					id
					post_title
					post_content
					image_id
					thumbnail
					penalty
					type
					answers
					{		
						id
						post_content
						order
					}
				}
				__typename
			  }
		  }
		  `;
class TutorTest extends BasicState
{
	getRoute = () =>
	{
		return "course-lessons";
	}
	render()
	{
		
		const id = this.props.match.params.id;
		
		return <div className="layout-state">
			<Query query={query} variables={{"id": id}}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <div className="d-flex h-100 justify-content-center align-items-center"><Loading/></div>;
					}
					if(data)
					{	
						console.log(data.getBio_Test);
						const test = data.getBio_Test || {};	
						 
						const classes = test.bio_class.map((e, i) => 
						{
							return <div className="tutor-label-class" key={i}>
								{e.post_title + " " + __("class") }
							</div>
						});
						const themes = test.bio_biology_theme.map((e, i) => 
						{
							return <div className="tutor-label" key={i}>
								{e.post_title}
							</div>
						});
						const courses = test.bio_course.map((e, i) => 
						{
							return <div className="tutor-label-course" key={i}>
								{e.post_title}
							</div>
						});
						const bio_olimpiad_type = test.bio_olimpiad_type.map((e, i) => 
						{
							return <div className="tutor-label-olympiad_type" key={i}>
								{e.post_title}
							</div>
						});
						
						const duration = test.is_show_answer
							?
							test.duration + 4 * test.questions.length
							:
							test.duration
						
						
						const leftClass = this.state.isLeftClosed
							?
							"tutor-left-aside closed mobile-relatived"
							:
							"tutor-left-aside mobile-relatived "
						const mainClass = this.state.isLeftClosed
							?
							"tutor-main  opened"
							:
							"tutor-main ";
						
						return <div className="mt-5">
								<div className="tutor-row">
									<div className={leftClass}>
										<div>
										{ 
											initArea( 
												"single-test-left-aside", 
												{ ...test, user:this.props.user, "prefix": "tests" } 
											) 
										}
										</div>
									</div>
									<div className={mainClass}>
										<div 
											className="clapan-left hidden" 
											onClick={()=>this.setState({isLeftClosed:!this.state.isLeftClosed})}
										>
											<div className={"fas fa-caret-" + (!this.state.isLeftClosed ? "left" : "right")} />
										</div>
										<Test 
											{...test} 
											duration={duration}
											user={this.props.user}
											onRestart={this.onRestart}
											query={query}
											variables={{"id": id}}
										/>
										{ initArea( "single-test", { ...test, user:this.props.user, "prefix": "tests" } ) } 
									</div>
									<div className="tutor-right-aside">
										{ 
											initArea( 
												"single-test-right-aside", 
												{ ...test, user:this.props.user, "prefix": "tests" } 
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
	onRestart = () =>
	{
		//this.setState(
	}
}



export default  compose(
	withApollo,
	withRouter
)(TutorTest);