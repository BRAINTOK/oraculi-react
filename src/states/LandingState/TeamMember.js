import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { Icon } from "@blueprintjs/core";

class TeamMember extends Component
{
	render()
	{
		const { avatar, name, description, class_name, style } = this.props;
		return avatar || name  
			?
			<div className={"l-col position-relative py-4 " + class_name} style={{...style }}>
				<div className={ "ava " } style={{ backgroundImage: "url(" + avatar + ")" }}>
				{
					this.props.is_edit && false
						?
						<div className="l-inline-edit-btn">
							<Icon icon="annotation" />
						</div>
						:
						null
				}
				</div>
				<div className="name">
					{name}
				</div>
				<div className="description" dangerouslySetInnerHTML={{ __html: description}} />
			</div>
			:
			null;
	}
}
export default TeamMember;