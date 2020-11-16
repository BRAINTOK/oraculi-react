import React, {Component, Fragment} from "react";
import ReactDOM from 'react-dom';
import $ from "jquery";
import {__} from "../../layouts/utilities/i18n";
import scrollToElement from "../../layouts/utilities/scrollToElement";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";
import DataContext from "./DataContext";
import SectionContent from "./SectionContent";

class ArchorsMenu extends SectionContent
{
	state = {
		...this.props,
		active : null
	}
	
	componentDidMount() 
	{
		if(!this.state.data.is_fixed) return;
		const domNode = ReactDOM.findDOMNode(this); 
		this.setState( { top: $(domNode).offset().top } ) 
		window.addEventListener('scroll', this.scrollWindow);
	}
	componentWillUnmount() 
	{
		if(!this.state.data.is_fixed) return;
		window.removeEventListener('scroll', this.scrollWindow);
	}
	scrollWindow = () =>
	{ 
		// console.log( this.state.top, window.scrollY, this.props )
		if(!this.state.data.is_fixed) return;
		const domNode = ReactDOM.findDOMNode(this); 
		if( this.state.top - window.scrollY > 0 )
		{
			$(domNode).parents(".landing-section ").removeClass("fixed");
		}
		else
		{
			$(domNode).parents(".landing-section ").addClass("fixed");
		}
	}
	
	is()
	{
		return DataContext.data.sections
			.filter( (e, i) => e.menu && e.menu.is_enabled ? e.menu.is_enabled : false )
				.length > 0  
	}
	
	renderContent()
	{
		//console.log( this.state.data);
		const { class_name, style, type } = this.props;
		const { is_add_header, icon, title } = this.props.data;
		const menus = DataContext.data.sections
			.filter((e, i) => e.menu && e.menu.is_enabled ? e.menu.is_enabled : false).
				map((e, i) =>
				{
					const active = this.state.active 
						? 
						this.state.active == i 
							?
							" active "
							: 
							""
						:
						""; 
					return <div 
						key={i}
						className={ "menu-button archor-menu " + active } 
						href={ "#section-" + e.menu.id } 
						onClick={this.onClick}
					>
						<span>
							{e.menu.label}
						</span>
					</div>
				});
		const ttle = is_add_header
			?
			<div className={"landind-arhor-menu-title "} onClick={ () => scrollToElement(0) }>
				<img
					src={ icon} 
					className=" layout-icon "
				/>
				<div className="layout-header-title ">
					{ title}
				</div>
			</div>
			:
			null;
		return <div 
			className={ 
				"landing-archors-menu " + 
				this.props.data.class_name + 
				" columns-" + this.props.composition.columns
			} 
			style={this.props.data.style}
		>
			{ ttle }
			<div className="mx-auto">
				{ menus }
			</div>
		</div>
	}
	onClick = evt =>
	{
		const targ = evt.currentTarget.getAttribute("href");
		console.log( targ, $(targ).offset().top );
		scrollToElement( $(targ).offset().top - 60 );
	}
}
export default ArchorsMenu;