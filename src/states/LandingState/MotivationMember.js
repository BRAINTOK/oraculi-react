import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";

class MotivationMember extends Component
{
	render()
	{
		const { thumbnail, title, description, class_name, style } = this.props;
		return thumbnail || title || description  
			?
			<div className={"l-col motivation-element " + class_name} style={{...style }}>
				<div className={ "thumbnail " } style={{ backgroundImage: "url(" + thumbnail + ")" }}/>
				<div className="title">
					{title}
				</div>
				<div className="description" dangerouslySetInnerHTML={{ __html: description}} />
			</div>
			:
			null;
	}
}
export default MotivationMember;