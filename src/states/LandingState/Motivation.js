import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import MotivationMember from "./MotivationMember";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";

class Motivation extends Component
{
	render()
	{
		const { columns, type } = this.props;
		const { motivation, class_name, style } = this.props.data; 
		return motivation && Array.isArray(motivation)
			?
			<div className={ columns + " landing-motivation " + class_name} style={style}>
			{
				motivation.map((e, i) =>
				{
					return <MotivationMember {...e} key={i} />
				})					
			}
			</div>
			:
			<div 
				className={ " landing-empty " + class_name} 
				style={{ ...style, height : 300 }}
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
}
export default Motivation;