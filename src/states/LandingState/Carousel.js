import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import SectionContent from "./SectionContent";
import Section, {components, getDefault} from "./Section";
import matrix from "./data/matrix";

class Carousel extends SectionContent
{
	getState()
	{		
		this.car = React.createRef();
		return { };
	}
	
	renderContent(style)
	{ 
		const { composition, is_edit } = this.props;
		const { 
			class_name, 
			items, 
			dots, 
			dots_type, 
			dots_design, 
			dots_color, 
			nav, 
			nav_type, 
			nav_design, 
			nav_color, 
			autoplay, 
			loop, 
			sections 
		} = this.props.data;
		const __sections = sections && sections.length > 0
			? 
			sections.map((e,i) =>
			{
				return <Section  
					{...e} 
					key={i} 
					i={i} 
					is_edit={ is_edit } 
					level={this.props.level + 1} 
					onEdit={this.onEdit}
					onUp={this.onUp}
					onDn={this.onDn}
					onAdd={this.onAdd}
					onRnv={this.onRnv}
					onHide={this.onHide}
					onRemoveFloat={this.onRemoveFloat}
					onUpdateFloat={this.onUpdateFloat}
				/> 
			})
			: 
			null
		const options = {
			dots: typeof dots != "undefined" ? ( dots ? true : false) : false,
			items: typeof composition.columns != "undefined" ? composition.columns : 1,
			nav: typeof nav != "undefined" ? nav ? true : false : false,
			rewind: true,
			autoplay: typeof autoplay != "undefined" ? autoplay ? !is_edit : false : !is_edit,
			loop: typeof loop != "undefined" ? loop ? true : false : false,
			mouseDrag: !is_edit,
			touchDrag: !is_edit,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items: typeof composition.columns != "undefined" ? composition.columns : 1
				}
			} 
			
		}; 
		const events = { };
		return <div 
			className={ "landing-carousel landing-element " + class_name + " " + nav_type + " " + nav_design + " " + nav_color  + " " + dots_type + " " + dots_design + " " + dots_color } 
			style={ this.getStyle(style) } 
		>
			<OwlCarousel
				ref={this.car} 
				options={options}
				events={events}
			>
				{ __sections }
			</OwlCarousel> 
		</div>
	}
	
	is()
	{
		const { sections } = this.state.data;
		return sections && sections.length > 0
	}
	
	
	onEdit = (data, id) => 
	{
		console.log("onEdit", id, data, this.state );
		let sections = [ ...this.state.data.sections ];
		let secs = [];
		sections.forEach(e =>
		{
			if(e.id == data.id)
			{
				secs.push(data);
			}
			else
			{
				secs.push(e);
			}
		});
		this.setState({ data:{ ...this.state.data, sections:secs } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections:secs }}, 
			this.props.id
		);
	}
	onUp = data =>
	{
		console.log("onUp", data, this.state );
		let sections = [ ...this.state.data.sections ];
		const sec = { ...sections[ data ] };
		sections.splice( data, 1 );
		sections.splice( data - 1, 0, sec );
		console.log(sections);
		this.setState({ data:{ ...this.state.data, sections } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections }}, 
			this.props.id
		);
		
	}
	onDn = data =>
	{
		console.log("onDn", data, this.state );let sections = [ ...this.state.data.sections ];
		const sec = { ...sections[ data ] };
		sections.splice( data, 1 );
		sections.splice( data + 1, 0, sec );
		console.log(sections);
		this.setState({ data:{ ...this.state.data, sections } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections }}, 
			this.props.id
		);
		
	}
	onAdd = data =>
	{
		console.log("onAdd", data, this.state );
		let sections = [ ...this.state.data.sections ];
		const sec = getDefault();
		sections.splice( data + 1, 0, sec );
		console.log(sections);
		this.setState({ data:{ ...this.state.data, sections } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections }}, 
			this.props.id
		);
		
	}
	onRnv = data =>
	{
		console.log("onRnv", data, this.state.data.sections );
		let sections = [ ...this.state.data.sections ];
		sections.splice(data, 1);
		console.log(sections);
		this.setState({ data:{ ...this.state.data, sections } });
		this.props.onEdit( 
			{...this.state, data:{ ...this.state.data, sections }}, 
			this.props.id
		); 
	} 
	onHide = (id, is_hide) =>
	{
		console.log("HIDE", id, is_hide); 
		
	}
	onRemoveFloat = float_id =>
	{
		
	}
	onUpdateFloat = (data, float_id, section_id) =>
	{
		
	}
}
export default Carousel;