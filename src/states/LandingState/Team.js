import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import TeamMember from "./TeamMember";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";

class Team extends Component
{
	render()
	{
		const { columns, type, is_edit } = this.props;
		const { team, class_name, style } = this.props.data; 
		return team && Array.isArray(team)
			?
			<div className={ columns + " landing-team " + class_name} style={style}>
			{
				team.map((e, i) =>
				{
					return <TeamMember {...e} key={i} is_edit={is_edit} />
				})					
			}
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
}
export default Team;