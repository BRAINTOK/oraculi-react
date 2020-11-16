import React, {Fragment, Component} from "react";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import SubFilterPlaces from "./_MainFilter/SubFilterPlaces";
import $ from "jquery";
import {get, exec_route} from "../layouts/routing";
import { NavLink } from 'react-router-dom'; 


class FreeNavLinkWidget extends Component
{
	render()
	{
		return <NavLink
			to={ this.props.preroute + "/" + this.props.link_route}
			className={this.props.className}
			activeClassName={this.props.activeClassName || "active"}
		>
			{ this.props.content}
			{__(this.props.label)}
		</NavLink>
	}
}
export default FreeNavLinkWidget;