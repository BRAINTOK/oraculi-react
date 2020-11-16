import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";

import courses from "../config/data/courses";
import $ from "jquery";

import {withRouter} from "react-router";
import layouts from "../layouts/layouts";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import { NavLink } from 'react-router-dom';

import LazyLoading from "../layouts/utilities/LazyLoading";
import Advantages from "./tutor/Advantages";
import RaitingLabel from "./tutor/RaitingLabel";
import CourseCard from "./tutor/CourseCard";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';

class TutorCourse extends BasicState
{
	constructor(props)
	{
		super(props);
		this.car = React.createRef();
		
	}
	basic_state_data()
	{
		return { height:500};
	}
	
	//TODO курсы
	render()
	{
		const query_name = getQueryName("Bio_Course");
		const query_args = getQueryArgs("Bio_Course");
		//const query = querySingle( "Bio_course", query_name, query_args );
		
		const id = this.props.match.params.id;
		const query = gql`query getBio_Facultet($id:String) {
			getBio_Facultet(id:$id) {
				id
				post_title
				post_content
				thumbnail
				icon
				post_date
				parent
				{
					id
					post_title
				}
				price
				order
				children {
					id
					post_title
					post_content
					__typename
				}
				bio_advantage
				{
					id
					post_title
					post_content
					thumbnail
				}
				bio_image_result
				{
					id
					post_title
					post_content
					thumbnail
				}
				courses
				{
					id
					post_title
					post_content
					is_member
					is_closed
					thumbnail
				}
				__typename
			}
		  }
		  `;
		
		return <div className="layout-state p-0">
			<div className="position-relative " >
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
							console.log(data.getBio_Facultet);
							const facultet = data.getBio_Facultet ? data.getBio_Facultet : {} ;							
							const pic  = facultet.icon ; 
							const thum = facultet.thumbnail ; 
							const coursesList = facultet.courses.map((e, i) =>
							{
								return <CourseCard user={this.props.user} {...e} key={i} i={i} />
							})
							return <Fragment>
								<div 
									className="course__header"
									style={{ backgroundImage:"url(" + thum + ")" }}
								>			
										<div className="z-index-10 container">
											<div 
												className="tutor-large-icon"
												style={{ backgroundImage:"url(" + pic + ")" }}
											/>
											<div className="title text-light">
												{facultet.post_title}
											</div>			
										</div>				
								</div>
							
							
								<div className=" mt-5">
									<div className="tutor-row">
										<div className="tutor-left-aside-2  mobile-relatived">
											{ initArea( "single-facultet-left-aside", { ...facultet, user:this.props.user } ) }
										</div>
										<div className="tutor-main-2">
											<div className="row mb-5">
												<Advantages advantages={ facultet.bio_advantage } columns={3} />
											</div>
											<div 
												className="r-course-underline"
												dangerouslySetInnerHTML={{ __html: facultet.post_content }}
											/> 
											<div className="my-5 course-card-list count-2">
												{coursesList}
											</div>
											{ initArea( "single_facultet", { ...facultet, user:this.props.user } ) } 
										</div>
										<div className="tutor-right-aside-2">
											{ initArea( "single-facultet-right-aside", { ...facultet, user:this.props.user } ) }
										</div>
									</div>
								</div>
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
		</div>;
	}
	prev = () =>
	{
		console.log( this.car.current.prev );
		this.car.current.prev();
	}
	next = () =>
	{
		this.car.current.next();
	}
}

export default compose(
	withApollo,
	withRouter
)(TutorCourse)