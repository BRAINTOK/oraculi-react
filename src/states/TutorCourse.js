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
import RaitingLabel from "./tutor/RaitingLabel";
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
		const query = gql`query getBio_Course($id:String) {
			getBio_Course(id:$id) {
				id
				post_title
				post_content
				date
				is_member
				is_closed
				thumbnail
				logotype
				post_date
				parent
				{
					id
					post_title
				}
				bio_facultet
				{
					id
					post_title
				}
				price
				raiting
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
				testinomials {
					id
					post_title
					post_content
					thumbnail
					raiting				
					display_name
					__typename
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
							return <Loading/>;
						}
						if(data)
						{	
							console.log(data.getBio_Course);
							const course = data.getBio_Course ? data.getBio_Course : {} ;	
							
							const options = { 
								loop: true, 
								margin:30 , 
								items:2,
								responsive:{
									0:{
										items:1
									},
									1000:{
										items:1
									},
									1200:{
										items:2
									}
								}
							};
							const coursesList = course.testinomials.map((ee, ii) =>
							{
								return <div className="review-slider__item" key={ii}>
									<div className="review-slider__item-head">
										<div 
											className="review-slider__item-img" 
											style={{ backgroundImage:"url(" + ee.thumbnail + ")" }}
										>
										</div>
										<div className="review-slider__item-box">
											<div className="review-slider__item-name">
												{ee.display_name}
											</div>
											<div className="position-relative ">
												<RaitingLabel raiting={ee.raiting} className="text-warning "/>
											</div>
										</div>
									</div>
									<div 
										className="review-slider__item-content "
										dangerouslySetInnerHTML={{ __html: ee.post_content }}
									/>
								</div>
							});
							const testinomials = coursesList.length > 0 
								? 
								<Fragment>
									<div className="col-12 mt-3">
										<div className="title">
											{__("Отзывы о курсе")}
										</div>
									</div>
									<div className="col-12 slick-slider">
										<div className="slider-arrows">
											<div className="slick-arrow to-left" onClick={ this.next }>
												<i className="fas fa-arrow-right"></i>
											</div>
											<div className="slick-arrow to-right" onClick={ this.prev }>
												<i className="fas fa-arrow-left"></i>
											</div>
										</div>
										{
										<div className="slider-cont">
											<div className="row w-100 mb-5">
												<OwlCarousel ref={this.car} options={options}>
													{coursesList}
												</OwlCarousel>
											</div>
										</div>
										}
									</div>
								</Fragment>
								:
								null;
							
							const pic = course.thumbnail != "false" ? course.thumbnail : "";
							console.log(course.post_title);
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
													course.bio_facultet	&& course.bio_facultet.id
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
							
							
								<div className=" mt-5">
									<div className="tutor-row">
										<div className="tutor-left-aside  mobile-relatived">
											{ 
												initArea( 
													"single-course-left-aside", 
													{ 
														...course, 
														user:this.props.user,
														type:"Bio_Course"
													} 
												) 
											}
										</div>
										<div className="tutor-main">
											{ /*date*/ }											
											<RaitingLabel raiting={course.raiting} className="text-warning font_18 mt-5"/>
											<div 
												className="r-course-underline"
												dangerouslySetInnerHTML={{ __html: course.post_content }}
											/> 
											{ 
												initArea( 
													"single_course", 
													{ 
														...course, 
														user:this.props.user ,
														type:"Bio_Course" 
													} 
												) 
											}
											{testinomials}
										</div>
										<div className="tutor-right-aside">
											{ 
												initArea( 
													"single-course-right-aside", 
													{ 
														...course, 
														user:this.props.user,
														type:"Bio_Course"  
													} 
												) 
											}
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