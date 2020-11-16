import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";
import { Link } from 'react-router-dom';

class InnerLink extends Component
{
	state = {
		...this.props
	}
	componentDidUpdate(nextProps)
	{
		let isUpdate = false;
		let state = { };
		["is_edit", "data", "class_name", "type", "title"]
			.forEach((e, i) =>
			{
				if(nextProps[e] != this.state[e])
				{
					isUpdate = true;
					state[e] = nextProps[e];			
				}
			})
		if( isUpdate )
		{
			// console.log(state);
			this.setState(state);
		}
		
	}
	render()
	{
		const { title, type } = this.state;
		const { route, label, is_fill, class_name, style } = this.state.data; 
		//console.log( style );
		return route 
			?
			<div className="landing-inner-link " >
				<Link
					to={"/" + route}
					className={ "btn btn-danger " + (is_fill ? " btn-block " : "") + class_name} style={{ }}
				>
					{ label ? label : title && title.text ? title.text : "" }
				</Link>
			</div>
			:
			<div 
				className={ " landing-empty " + class_name} 
				style={{ ...style }}
			>
				<LayoutIcon
					src={ components[this.state.type].icon }
					className=" layout-icon white"
				/>
				<div className="lead text-white">
					{ __(components[this.state.type].title) }
				</div> 
			</div>
	}
}
export default InnerLink;