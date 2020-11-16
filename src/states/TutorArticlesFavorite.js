import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import $ from "jquery";
import LessonQuote from "./tutor/LessonQuote"; 

import {withRouter} from "react-router"; 
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import { NavLink } from 'react-router-dom'; 

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';

class TutorArticlesFavorite extends BasicState
{
	getRoute = () =>
	{
		return "favorites";
	}
	addRender()
	{
		const query = gql`query getBio_Articles  
		{
			getBio_Articles(
				paging:{
					 metas:{key:"is_favorite", value:"1"}
				  }
			)
			{				
				id
				post_title
				post_content
				post_date
				thumbnail
				post_author
				{
					id
					display_name
				}
				bio_course
				{
					id
					post_title
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
				is_favorite
			}
		}`;
		return <div className="layout-state p-0">
			<Query query={query} >
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <Loading/>;
					}
					if( data )
					{	
						console.log(data.getBio_Articles)
						const articles = data.getBio_Articles || [];
						const favorites = articles.map((e, i) =>
						{
							return <LessonQuote {...e} key={i} />
						});
						return <div className=" mt-5">
								<div className="tutor-row">
									<div className="tutor-left-aside mobile-relatived">
										{ 
											initArea( 
												"user-favorites-left-aside", 
												{ ...this.props } 
											) 
										}
									</div>
									<div className="tutor-main">
										{favorites}
										{ 
											initArea( 
												"user-favorites", 
												{ ...this.props }
											) 
										} 
									</div>
									<div className="tutor-right-aside">
										{ initArea( "user-favorites-right-aside", 
												{ ...this.props }
											) 
										} 
									</div>
								</div>
							</div>
					}						
					if( error )
					{
						return error.toString();
					}
				}
			}
			</Query>
		</div>
	}
}
export default compose(
	withApollo,
	withRouter
)(TutorArticlesFavorite)