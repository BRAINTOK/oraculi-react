import React, {Component, Fragment} from "react";
import { NavLink } from 'react-router-dom'

import {link} from "../../layouts/routing";
import LayoutIcon from "../../layouts/LayoutIcon";

class LayoutLinks extends Component
{
	state = { }
	render()
	{
		return link().map((e, i) => {
			return <a href={e.route} target="_blank" key={i} title={e.title} className="layout-header-link">
				<LayoutIcon
					src={ e.icon }
					className="layout-header-icon"
				/>
				<span>
					{e.title}
				</span>
			</a>
		});
	}
}

export default LayoutLinks;