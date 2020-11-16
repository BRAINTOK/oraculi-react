import React, {Component, Fragment} from "react";
import { __ } from "../layouts/utilities/i18n";
import { NavLink } from 'react-router-dom'; 
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.


class TutorFacultetResultsWidget extends Component
{
	constructor(props)
	{
		super(props);
		this.car = React.createRef();
		this.po = React.createRef(); 
	}
	render()
	{
		if(this.props.bio_image_result.length == 0) return "";
		const options = { 
			loop: true, 
			autoplay: true, 
			margin:0 , 
			items:1,
			responsive:{
				0:{
					items:1
				},
				1000:{
					items:1
				},
				1200:{
					items:1
				}
			}
		};
		const bio_image_result = this.props.bio_image_result.map((e,i) =>
			{
				return <NavLink
					className="w-100" 
					key={i} 
					to={"/result/"+e.id}
				>
					<div className="">
						{e.post_title}
					</div>
					<div 
						style={{
							backgroundImage:"url("+e.thumbnail+")",
							width:"100%",
							height:300,
							backgroundSize:"cover",
							backgroundPosition:"center"
						}}
					/>
				</NavLink>
			}
		);
		const coursesList = <OwlCarousel ref={this.car} options={options}>
			{bio_image_result}
		</OwlCarousel>
		return  <div>
			<div className="aside-widget-title">
				{__("Our graduates results:")}
			</div>
			{coursesList}
		</div>
	}
}
export default TutorFacultetResultsWidget;