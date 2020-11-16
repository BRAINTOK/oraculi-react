import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import $ from "jquery";
import LessonQuote from "./tutor/LessonQuote"; 
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

class TutorLesson extends BasicState
{
	getRoute = () =>
	{
		return "course-lessons";
	}
	render()
	{
		
		const id = this.props.match.params.id;
		const query = gql`query getBio_Article($id:String) {
			getBio_Article(id:$id) { 
				id
				post_title
				post_content
				post_date
				thumbnail
				video
				include_id1
				include_id2
				include_id3
				include_id4
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
			  }
			  __typename
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
						console.log(data.getBio_Article);
						const article = data.getBio_Article || {};	
						
						const classes = article.bio_class.map((e, i) => 
						{
							return <div className="tutor-label" key={i}>
								{e.post_title + " " + __("class") }
							</div>
						});
						const themes = article.bio_biology_theme.map((e, i) => 
						{
							return <div className="tutor-label" key={i}>
								{e.post_title}
							</div>
						});
						const courses = article.bio_course.map((e, i) => 
						{
							return <div className="tutor-label" key={i}>
								{e.post_title}
							</div>
						});
						const thumbnail = article.thumbnail
						?
						<div className="arcicle-thumbnail" style={{backgroundImage:"url("+article.thumbnail +")"}} />
						:
						null;
						
						return <div className=" mt-5" article-id={article.id}>
								<div className="tutor-row">
									<div className="tutor-left-aside  mobile-relatived">
										{
											initArea( "single-article-left-aside", 
											{ ...article, user:this.props.user, "prefix": "articles" } 
										) 
									}
									</div>
									<div className="tutor-main">
										<div className="tutor-article-title">
											{article.post_title}									
										</div>
																	
										<div className="lesson-classes">
											{classes}
										</div>
										<div className="lesson-themes">
											{themes}
										</div>
										<div className="lesson-courses">
											{courses}
										</div>
										
										<div className=""
											dangerouslySetInnerHTML={{ __html: article.post_content }}
										/>
										<div className="lesson-author">
											<div 
												className="avatar-large" 
												style={{backgroundImage:"url(" + article.post_author.avatar + ")"}}>
											</div>
											<div className="">
												<div className="display-name">
													{article.post_author.display_name}
													
												</div>
												<div className="">
													<Moment locale="ru" format="D MMMM YYYY">
														{ new Date(article.post_date * 1000) }
													</Moment>
													
												</div>
											</div>
										</div>
									
										<div className="px-3 pt-3 borded-top ">
										
										</div>
										{ 
											initArea( 
												"single-article", 
												{ ...article, user:this.props.user, "prefix": "articles" } 
											) 
										} 
									</div>
									<div className="tutor-right-aside">
										{ thumbnail }
										{ 	
											initArea( 
												"single-article-right-aside", 
												{ ...article, user:this.props.user, "prefix": "articles" } 
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
)(TutorLesson);