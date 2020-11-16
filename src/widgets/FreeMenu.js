import React, {Fragment, Component} from "react";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import SubFilterPlaces from "./_MainFilter/SubFilterPlaces";
import $ from "jquery";
import {get, exec_route} from "../layouts/routing";
import { NavLink } from 'react-router-dom'; 

class FreeMenu extends Component
{
	render()
	{
		const menuData = exec_route(get(this.props.menu_id));
		if( !this.props.menu_id )
		{
			return <div className="alert alert-danger">
				Empty free menu data in sector «routes» in layouts
			</div>
		}
		if( !menuData )
		{
			return <div className="alert alert-danger">
				No contents in sector «{ this.props.menu_id }» in layouts
			</div>
		}
		const menu = menuData.map((e, i) =>
		{
			return <NavLink
				to={e.route}
				className="free-menu-item"
				activeClassName="active"
				key={i}
			>
				<span>{__(e.title)}</span>
			</NavLink>
			
		});
		 console.log(this.props);
		return <div className="free-menu-container">
			{menu}
		</div>
	}
	
}
export default FreeMenu;