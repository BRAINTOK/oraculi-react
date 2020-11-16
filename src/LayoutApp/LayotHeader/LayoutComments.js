import React, {Component, Fragment} from "react";
import { NavLink } from 'react-router-dom'

import LayoutIcon from "../../layouts/LayoutIcon";
import {getFirstRoute} from "../../layouts/routing";


class LayoutComments extends Component
{
	state = { }
	render()
	{
		const route = getFirstRoute("comments");
		return <div className=" ">
			<div className=" " >
				<NavLink 
					to={route.route}
				>					
					<LayoutIcon
						src={ route.icon }
						className="layout-header-icon"
					/>
				</NavLink>
			</div>
		</div>
	}
}

export default LayoutComments;