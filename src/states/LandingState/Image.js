import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";

class Image extends Component
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
		const { class_name, title, type} = this.state;
		const { src, src_type, style, height } = this.state.data;
		const st = { backgroundImage: "url(" + src + ")", height: height };
		//console.log( style );
		return src 
			?
			src_type == "div"
				?
				<div className={ "landing-image " + class_name} style={{...style, ...st }}>
					 
				</div>
				:
				<div className={ "landing-image " + class_name} >
					<img src={src} alt={title ? title.text : ""} style={{ height: height ? height : "100%", margin:"0 auto",  ...style, width : "auto"}} />
					 
				</div>
			:
			<div 
				className={ " landing-empty " + class_name} 
				style={{ ...style, minHeight:400 }}
			>
				<LayoutIcon
					src={ components[this.state.type].icon }
					className=" layout-icon white "
				/>
				<div className="lead text-white">
					{ __(components[this.state.type].title) }
				</div> 
			</div>
	}
}
export default Image;