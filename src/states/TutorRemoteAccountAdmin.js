import React, {Component, Fragmnent} from "react";
import _fetch from "./wpfestREST";
import Login from "./wpfestREST/Login"
import $ from "jquery";
import User from "./wpfestREST/utilities/User";
import Token from "./wpfestREST/Token";
import {setCookie, getCookie, deleteCookie} from "./wpfestREST/utilities/utils";
import BasicState from "../layouts/BasicState";
import {compose} from "recompose";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../layouts/utilities/i18n";
import LayoutIcon from "../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../layouts/utilities/getWidget";
import getWidgets from "../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../layouts/routing";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../layouts/utilities/blueUtils";

class TutorRemoteAccountAdmin extends BasicState
{
	basic_state_data() 
	{
		let len = 0;
		for(let i = 0; i < 10; i++)
		{
			let token = getCookie( "wpfest_token" + i);
			if(token)
			{
				len++;
			}
		}
		return { 
			routing: "Login",
			isCreateOpen: false,
			len:len
		};
	}
	getRoute = () =>
	{
		return "admin-fests";
	}
	
	addRender()	
	{ 
		let tokens = [];
		for(let i = 0; i < 10; i++)
		{
			let token = getCookie( "wpfest_token" + i);
			//console.log(token);
			if(token)
			{
				tokens.push(
					<Token
						key={i}
						i={i + 1}
						token={token}
						onLogout={this.onLogout}
					/>
				)
			}
		}
		return <div className="w-100">
			{tokens}			
			<div className="my-1">
				<Popover
					position={Position.RIGHT_TOP}
					isOpen={this.state.isCreateOpen}
					content={
						<Login 
							onLogin={this.onLogin}
						/>
					}
				>
					<div className="btn btn-light  btn-sm mt-2" onClick={this.onCreateToggle}>
						<i className="fas fa-plus" />
					</div>
				</Popover>				
			</div>
		</div>
	}
	onCreateToggle = () =>
	{
		this.setState({isCreateOpen:!this.state.isCreateOpen});
	}
	onLogin = (data, url) =>
	{
		console.log(data, this.state.len);
		AppToaster.show({
			intent: Intent.SUCCESS,
			icon: "tick",
			message: __(data.msg)
		});
		if(data.token)
		{
			setCookie( "wpfest_token" + this.state.len, data.token );
			setCookie( "wpfest_display_name" + this.state.len, data.user.display_name );
			setCookie( "wpfest_url" + this.state.len, url );
			this.setState({ len:this.state.len + 1, isCreateOpen:false });
		}
	}
	onLogout = data =>
	{
		console.log(data-1); 
		deleteCookie( "wpfest_token" + (data - 1) );
		let len = 0;
		for(let i = 0; i < 10; i++)
		{
			let token = getCookie( "wpfest_token" + i);
			if(token)
			{
				len++;
			}
		}
		this.setState({ len });
	}
}
export default compose( 
	withRouter
)(TutorRemoteAccountAdmin);