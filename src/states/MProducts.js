import React, {Component} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import LazyLoading from "../layouts/utilities/LazyLoading";
import courses from "../config/data/courses";
import OwlCarousel from 'react-owl-carousel2';
import $ from "jquery";
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.

class MProducts extends BasicState
{
	
	constructor(props)
	{
		super(props);
		this.car = React.createRef();
		this.state = { }
	}
	render()
	{
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
		const coursesList = courses.map((e, i) =>
		{
			const dates = e.date.split(".");
			const delay = i%3 === 0 ? "" : i%3;
			const underline = e.underline.split( " " ).slice(0, 30).join( " " );
			const more = underline.length <= e.underline ? "" : "...";
			
			return <LazyLoading 
					className=" " 					
					animationType="fadeInUp" 
					key={i}
					delay={delay}
					content={
						<div className="courses-slider__item">
							<NavLink 
								to={ "/courses/" + e._id }
								className="courses-slider__item-img"
								style={{backgroundImage:"url("+ e.thumbnail + ")"}}
							>
								<div className="courses-slider__item-date">
									<div className="courses-slider__item-day">
										{ dates[0] + "." + dates[1] }
									</div>
									<div className="courses-slider__item-year">
										{ dates[2] }
									</div>
								</div>
							</NavLink>
							<div className="courses-slider__item-content">
								<div className="courses-slider__item-title">
									{ e.title }
								</div>
								<div 
									className="courses-slider__item-descriptions" 
									dangerouslySetInnerHTML={{ __html: underline + more }}
								/>
								<NavLink 
									to={ "/courses/" + e._id }
									className="courses-slider__item-btn"
								>
									<svg width="18" height="17" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg" >
										<path fill="#FFF" d="M8.99992 0C13.8934 0 17.7248 5.40371 17.8856 5.6338C18.0381 5.85186 18.0381 6.14814 17.8856 6.36638C17.7248 6.59625 13.8934 12 8.99992 12C4.10647 12 0.274852 6.59629 0.114223 6.3662C-0.0380743 6.14792 -0.0380743 5.85186 0.114223 5.63358C0.274852 5.40371 4.10647 0 8.99992 0ZM6.62631 6.00002C6.62631 7.36903 7.69105 8.48276 8.99992 8.48276C10.3088 8.48276 11.3735 7.36903 11.3735 6.00002C11.3735 4.63101 10.3088 3.51727 8.99992 3.51727C7.69108 3.51727 6.62631 4.63101 6.62631 6.00002Z" />
									</svg>
								</NavLink>
							</div>
						</div>
					}
				/>
		});
		
		
		
		
		return<div className="layout-state  bg-white text-dark">
			<div className="position-relative " >
				<div className=" mt-5">
					<div className="row ">
						<div className="col-12 pl-60">
							<div className="title my-5">
								{__("Актуальные курсы")}
							</div>
						</div>
						
						<div className="col-12 d-flex slick-slider">
							<div className="slider-arrows">
								<div className="slick-arrow to-left" onClick={ this.next }>
									<i className="fas fa-arrow-right"></i>
								</div>
								<div className="slick-arrow to-right" onClick={ this.prev }>
									<i className="fas fa-arrow-left"></i>
								</div>
							</div>
							<div className="slider-cont">
								<div className="row w-100 mb-5">
									<OwlCarousel ref={this.car} options={options}>
										{coursesList}
									</OwlCarousel>
								</div>
							</div>
						</div>
						
						
					</div>
				</div>
			</div>
		</div>
	}
	
	prev = () =>
	{
		this.car.current.prev();
	}
	next = () =>
	{
		this.car.current.next();
	}
}
export default MProducts;