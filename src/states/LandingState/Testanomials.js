import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import Testanomial from "./Testanomial";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";
import SectionContent from "./SectionContent";

class Testanomials extends SectionContent
{
	getState()
	{
		this.car = React.createRef();
		return {}
	}
	componentDidMount()
	{
		let h = 100;
		let xx = $(".landing-testanomials .landing-testanomial .text");
		xx.each(e =>
		{
			//console.log(e, $( xx[e] ).height(), h);
			h = Math.max( $( xx[e] ).height(), h );
		});	
		xx.height(h);	
	}
	renderContent(style)
	{
		const { composition, type } = this.state;
		const { class_name, testanomials, dots, items, nav, autoplay, loop } = this.state.data;
		// console.log(this.state.data);
		const __testanomials = testanomials 
			?
			testanomials.map((e,i) =>
			{
				return <Testanomial {...e} i={i} key={i}/>
			})
			:
			null;
		
		const options = {
			dots: typeof dots != "undefined" ? dots ? true : false : false,
			items: typeof composition.columns != "undefined" ? composition.columns : 2,
			nav: typeof nav != "undefined" ? nav ? true : false : false,
			rewind: true,
			autoplay: typeof autoplay != "undefined" ? autoplay ? true : false : false,
			loop: typeof loop != "undefined" ? loop ? true : false : false,
			responsive:{
				0:{
					items:1
				},
				760:{
					items:typeof items != "undefined" ? items : 2
				}
			}
		};
		return <div className={ "landing-testanomials " + class_name} style={style}>
				<OwlCarousel
					ref={this.car} 
					options={options} 
				>
					{__testanomials}
				</OwlCarousel>
			</div>
	}
	
	is()
	{
		const { testanomials } = this.state.data;
		return testanomials && testanomials.length > 0
	}
}
export default Testanomials;