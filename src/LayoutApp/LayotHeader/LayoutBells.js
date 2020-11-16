import React, {Component, Fragment} from "react";
import { NavLink } from 'react-router-dom'

import LayoutIcon from "../../layouts/LayoutIcon";
import {getFirstRoute} from "../../layouts/routing";


class LayoutBells extends Component
{
	state = { }
	render()
	{
		const route = getFirstRoute("bells");
		return <div className="layout-header-bell">
			<div className=" " >
				<NavLink 
					to={ route.route }
				>					
					<LayoutIcon
						src={ route.icon }
						className="layout-header-icon"
					/>
					<span>
						
					</span>
				</NavLink>
			</div>
		</div>
	}
}

export default LayoutBells;