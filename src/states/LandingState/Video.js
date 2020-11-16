import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Vimeo from "react-vimeo";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";

class Video extends Component
{
	render()
	{
		const { title} = this.props;
		const { class_name, style, id, type, width, height  } = this.props.data; 
		let video; 
		switch(type)
		{
			case "youtube":
				let pars = [];
				[ 'controls', 'autoplay', 'showinfo', 'modestbranding','mute' ].forEach((e,i) =>
				{
					pars.push( "" + e + "=" + (this.props.data[e] ? 1 : 0) + "" );
				});
				const params = pars.length > 0 
					? 
					"?" + pars.join("&")
					:
					""
				video = <iframe 
					width={width}
					height={height} 
					className={class_name}
					style={style}
					src={ "https://www.youtube.com/embed/" + id + params }
					frameborder="0" 
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
					allowfullscreen
				></iframe>;
				break;
			default:
			case "vimeo":
				video = <iframe
					src={"https://player.vimeo.com/video/"+id}
					width={width}
					height={height}
					frameBorder="0"
						allow="autoplay; fullscreen" allowFullScreen
						className=""
					style={style}
					className={class_name}
				></iframe>
			break;
		}
		return id
		?
		<div 
			className={ "landing-video " + this.props.data.class_name} 
			style={{...this.props.data.style, height, width }}
		>
			{video}
		</div>
		:
		<div 
			className={ " landing-empty " + class_name} 
			style={{ ...style, height:  300 }}
		>
			<LayoutIcon
				src={ components[this.props.type].icon }
				className=" layout-icon-giant "
			/>
			<div className="lead text-white">
				{ components[this.props.type].title }
			</div>
			<EditLabel 
				{ ...this.props } 
				source={ type}
				onEdit={ this.props.onEdit }
				isBtn={ true }
			/> 
		</div>
	}
	onVimeoError = err => 
	{
		console.error(err);
	};
}
export default Video;