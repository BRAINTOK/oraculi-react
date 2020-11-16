import React, {Component, Fragment} from "react";
import { NavLink } from 'react-router-dom';

import {existRoutingChilder, getFirstRoute} from "../../layouts/routing";
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";


class LayoutHelp extends Component
{
	state = { }
	render()
	{
		const route = getFirstRoute("help");
		const children = existRoutingChilder("help")
			?
			getFirstRoute("help").children.map((ee, i) =>
				{
					const rt = "/" + route.route + "/" + ee.route;
					return <NavLink
						to={ rt }
						className={ "podmenu" }
						activeClassName={ "active" }
						key={i}
						route={ rt }
					>
						{ __(ee.title) }
					</NavLink>
				})
			:
			null;
		return <Fragment>
			<NavLink 
				to={"/" + route.route}
				className="layout-header-help"
			>					
				<LayoutIcon
					src={ route.icon }
					className="layout-header-icon"
				/>
				<span>{ route.title }</span>
			</NavLink>
			{children}
		</Fragment>
	}
}

export default LayoutHelp;