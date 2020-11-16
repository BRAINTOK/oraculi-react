import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";

class UserDescription extends Component
{
	render()
	{
		const user_descr = this.props.user.roles.map(elem => 
			<div 
				className="role_descr"
				key={"roledescr_"+elem } 
				dangerouslySetInnerHTML={{ __html : __(elem) }} 
			/>
		);
		return <div>
			{ user_descr }
		</div>
	}
}
export default UserDescription;