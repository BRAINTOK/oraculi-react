import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { Button, Intent, Icon, Dialog, Tag, Collapse, Slider, MultiSlider } from "@blueprintjs/core";
import LayoutIcon from "../../layouts/LayoutIcon";

class YandexMapPlaceBottom extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			object : this.props.object
		};
	}
	render()
	{
		//console.log( this.props );
		let style = { height: 120, width: 120 };
		return <div 
			className="square2 bg-secondary mr-1 btn-item my-1"
			style={style}
			onClick={ this.onClick } 
		>
			<div>
				<div className="small text-white ">
					{ this.state.object.title }
				</div>
			</div>
		</div>
	}
	onClick = () =>
	{
		this.props.onClick( this.props.object );
	}
}
export default YandexMapPlaceBottom;