import React, {Component, Fragmnent} from "react";
import _fetch from "./";
import $ from "jquery";
import User from "./utilities/User";
import {setCookie, getCookie} from "./utilities/utils"; 
import {compose} from "recompose";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";   
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

class Token extends Component
{
	render()
	{
		return <div className="row data-list">
			<div className="col-1">
				{this.props.i}
			</div>
			<div className="col-7">
				{
					getCookie("wpfest_url" + ( this.props.i - 1 )) + ": " +
					getCookie("wpfest_display_name" + ( this.props.i - 1 )) 
				}
			</div>
			<div className="col-3 m-1">
				<div className="btn btn-danger px-4 py-0 btn-sm" onClick={this.onLogout}>
					{__("Log out")}
				</div>
			</div>
		</div>
	}
	
	onLogout = () =>
	{
		this.props.onLogout(this.props.i)
	}
}
export default Token;