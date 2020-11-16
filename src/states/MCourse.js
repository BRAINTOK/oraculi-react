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

import LazyLoading from "../layouts/utilities/LazyLoading";
import MRaitingLabel from "./MRaitingLabel";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';

class MCourse extends BasicState
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
	
	
	stateDidMount() 
	{
		//this.updateWindowDimensions();
		this.scrollWindow();
		window.addEventListener('resize', this.updateWindowDimensions);
		window.addEventListener('scroll', this.scrollWindow);
		$(".layout-header-icon").addClass("top");
		$(".layout-header-title").addClass("top");
		$(".layout-menu-right").addClass("top");
		$(".header__btn").addClass("top");
		$(".header__basket").addClass("top");
		$(".reg_icon").addClass("top");
		$(".enter_icon").addClass("top");
		$(".logined-menu").addClass("top");
	}
    componentWillUnmount() 
	{
		window.removeEventListener('resize', this.updateWindowDimensions);
		window.removeEventListener('scroll', this.scrollWindow);
		$(".layout-header-icon").removeClass("top");
		$(".layout-header-title").removeClass("top");
		$(".layout-menu-right").removeClass("top");
		$(".header__btn").removeClass("top");
		$(".header__basket").removeClass("top");
		$(".reg_icon").removeClass("top");
		$(".enter_icon").removeClass("top");
		$(".logined-menu").removeClass("top");
	}
	updateWindowDimensions = () =>
	{
		
		this.setState({ 
			width : document.body.clientWidth, 
			height: document.getElementById("lesson-header").clientHeight
			
		});
	}
	scrollWindow = () =>
	{
		const scroll = (window.scrollY);
		console.log(this.state.height - scroll);
		if(scroll < this.state.height - 400)
		{
			$(".layout-header-title").addClass("top");
		}
		else
		{
			$(".layout-header-title").removeClass("top");
		}
		if(scroll < this.state.height)
		{
			$(".layout-header-icon").addClass("top");
		}
		else
		{
			$(".layout-header-icon").removeClass("top");
		}
		if(scroll < this.state.height - 182)
		{
			$(".header__basket").addClass("top");
			$(".reg_icon").addClass("top");
			$(".logined-menu").addClass("top");
		}
		else
		{
			$(".header__basket").removeClass("top");
			$(".reg_icon").removeClass("top");
			$(".logined-menu").removeClass("top");
		}
		if(scroll < this.state.height - 82)
		{
			$(".header__btn").addClass("top");
			$(".enter_icon").addClass("top");
		}
		else
		{
			$(".header__btn").removeClass("top");
			$(".enter_icon").removeClass("top");
		}
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
			  thumbnail
			  post_date
			  parent
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
				__typename
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
		
		return <Query query={query} variables={{"id": id}}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <div className="layout-state bg-white"><Loading/></div>;
					}
					if(data)
					{	
						console.log(data.getBio_Course);
						const course = data.getBio_Course ? data.getBio_Course : [] ;	
						
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
											<MRaitingLabel raiting={ee.raiting} className="text-warning "/>
										</div>
									</div>
								</div>
								<div 
									className="review-slider__item-content "
									dangerouslySetInnerHTML={{ __html: ee.post_content }}
								/>
							</div>
						});
						const testinomials = coursesList.length > 0 ? <Fragment>
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
						
						return <div className="layout-state  bg-white text-dark">
							<div className="position-relative " >
								<div 
									className="lesson__header" 
									id="lesson-header"
									style={{					
										backgroundImage:"url(" + pic + ")"
									}}
								>			
										<div className="z-index-10 container">
											<div className="title text-light">
												{course.title}
											</div>			
										</div>				
								</div>
							
							
								<div className=" mt-5">
									<div className="row ">
										<div className="col-md-12">
											{/*date*/}
											{/*
											<MRaitingLabel raiting={course.raiting} className="text-warning font_18 mt-5"/>
											*/}
											<div 
												className="r-course-underline"
												dangerouslySetInnerHTML={{ __html: course.post_content }}
											/> 
											{ initArea( "single_course", { ...course } ) }
										</div>
										{testinomials}
									</div>
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
		</Query>;
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
)(MCourse)