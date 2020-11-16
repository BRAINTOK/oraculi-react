import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { Button, Intent, Icon, Dialog, Tag, Collapse, Slider, MultiSlider } from "@blueprintjs/core";
import {getDefault, components} from "../../states/LandingState/Section";
import LayoutIcon from "../../layouts/LayoutIcon";

class SectionButton extends Component
{
	render()
	{
		//console.log( this.props );
		let style = { height: 120, width: 120 };
		let background = this.props.object.background
			?
			"url(" + this.props.object.background.image + ")"
			:
			null;
		switch(this.props.object.type)
		{
			case "image":
				background = this.props.object.data && this.props.object.data.src
					?
					"url(" + this.props.object.data.src + ")"
					:
					background;
				style.backgroundImage = background;				
				break;
		}		
		style.backgroundImage = background;
		
		
		return <div 
			className="square2 bg-secondary mr-1 btn-item"
			style={style}
			onClick={ this.onClick } 
		>
			<div>
				<LayoutIcon
					src={ components[this.props.object.type].icon }
					className=" layout-icon white"
				/>
				<div className="small text-white ">
					{ components[this.props.object.type].title }
				</div>
			</div>
		</div>
	}
	onClick = () =>
	{
		this.props.onClick( this.props.object );
	}
}
export default SectionButton;