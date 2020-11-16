import React, {Component, Fragmnent} from "react";
import _fetch from "./";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import WPFestSettings from "./utilities/WPFestSettings";
import FestMemberSetting from "./FestMemberSetting";


class MemberAdmin extends Component
{
	render()
	{
		const {is_owner, is_member, preroute, id } = this.props;
		return is_member
			?
			<Route
				exact
				path = { preroute +"/settings" } 
			>
				<FestMemberSetting
					{...this.props}
					user={this.props.user}
					is_owner={is_owner}
					is_member={is_member}
				/>
			</Route>
			:
			null
	}
}
export default MemberAdmin;