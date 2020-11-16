import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie} from "./utilities/utils";
import _fetch from "./";
import User from "./utilities/User";


class Contents extends Component
{
	state = {
		offset:0,
		festivals:[],
		number: 10
	} 
	render()
	{  
		const sc = this.props.routes.map((e, i) =>
		{
			return <NavLink 
				key={i}
				to={ this.props.root +"/" + e.id}
				className=""
			>
				<div className="menu-elem">
					{__(e.id)}
				</div>
			</NavLink>
		})
		return <div className="layout-center w-100">			
			<div className="admin-widgets-container">
				<div className="tutor-menu w-100">
					{ sc }
				</div>
			</div>
		</div>
	}		
		
}
export default Contents;