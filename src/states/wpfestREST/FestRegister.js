import React, {Component, Fragment} from "react";
import _fetch from "./";  
import LoginForm from "./LoginForm";
import GanreForm from "./GanreForm";
import FestMemberSetting from "./FestMemberSetting"; 
import FestMemberTeam from "./FestMemberTeam"; 
import UserDescription from "./UserDescription";
import PhaseLabel from "./PhaseLabel";
import crown from "../../assets/img/crown.svg";
import icon1 from "../../assets/img/test.svg"; 

import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {compose} from "recompose";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
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

class FestRegister extends Component
{
	
	state = { 
		loading:true
	}
	componentDidMount()
	{ 
		_fetch( 
			"init", 
			{id : this.props.blog_id},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
			.then(data => 
				{
					console.log( data );
					this.setState({
						festival_title: data.festival_title, 
						status		: data.status, 
						thumbnail	: data.thumbnail,
						ganres		: data.ganres,
						ganreFilterIDs : data.ganres.map(e => e.id),
						mtype		: data.mtype,
						loading		: false,
						user_id		: data.user_id
					});
				}
			)
	}
			
	render()	
	{ 
		//console.log( this.state );
		if(this.state.loading)
		{
			return <div className="layout-state p-0 m-0">	
				<Loading />
			</div>
		} 
		return <div className="layout-state p-0 m-0">						
			{
				initArea(
					"fest-header", 
					{ 
						...this.props, 
						...this.state,
						header_type: "reqister-user",
						header_title:__("Register new account") 
					} 
				) 
			} 
			<div className="row">	
				{ this.props.user.id ? this.content() : this.the_none() }
			</div>
		</div>
	}
	the_none()
	{
		return WPFestSettings.is_register
		?
		<Fragment>
			<div className="col-md-8 offset-md-2 mt-5">
				<div className="title">
					{__("Login (only by latin and numbers, first - only letter).")}
				</div>
				<input 
					type="text"
					value={this.state.login}
					onChange={this.onLogin}
					className="form-control input dark mb-4"
				/>
				
				<div className="title">
					{__("Your name")}
				</div>
				<input 
					type="text"
					value={this.state.name}
					onChange={this.onName}
					className="form-control input dark mb-4"
				/>
				
				<div className="title">
					{__("Your second name")}
				</div>
				<input 
					type="text"
					value={this.state.second}
					onChange={this.onSecondName}
					className="form-control input dark mb-4"
				/>
				
				<div className="title">
					{__("Send your e-mail")}
				</div>
				<input 
					type="email"
					value={this.state.email}
					onChange={this.onEmail}
					className="form-control input dark mb-4"
				/>
				
				<div className="title">
					{__("Password")}
				</div>
				<input 
					type="password"
					value={this.state.password}
					onChange={this.onPassword}
					className="form-control input dark mb-4"
				/>
				<div className="btn btn-primary mt-5" onClick={this.onRegister}>
					{__("Register account")}
				</div>
			</div>
		</Fragment>
		:
		<div className="alert alert-danger p-5 w-100 my-2">
			{__("Register desabled")}
		</div>
	}
	content()
	{
		
		return <div className="alert alert-danger p-5 w-100 my-2">
			{__("Register")}
		</div>
		
	}
	
	onLogin 		= evt => this.setState({login 		: evt.currentTarget.value});
	onName	 		= evt => this.setState({name 		: evt.currentTarget.value});
	onSecondName	= evt => this.setState({second 		: evt.currentTarget.value});
	onEmail			= evt => this.setState({email 		: evt.currentTarget.value});
	onPassword		= evt => this.setState({password 	: evt.currentTarget.value});
	onRegister = () =>
	{
		console.log(this.state);
		_fetch( 
			"register_user", 
			{
				log : this.state.login,
				eml : this.state.email,
				psw : this.state.password
			},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
			.then(data => 
			{
				console.log( data );;
			});
	}
}
export default compose (
	withRouter
)(FestRegister);