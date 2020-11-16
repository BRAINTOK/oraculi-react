import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie} from "./utilities/utils";
import _fetch from "./";
//import User from "./utilities/User";
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


class Login extends Component
{
	state = {
		is:false,
		url: this.props.url || "",
		wpfestlogin:"",
		wpfestpassword:"",
	}
	render()
	{ 
		return <div className="layout-center w-100">
				<div className="small">
					{__("Log in to WP-Fest service")}
				</div>
				<div>
					<div className="form-group justify-content-center d-flex flex-column">
					{
						this.props.hideUrl 
							?
							null
							:
							<input
								type="text"
								className="form-control input dark"
								placeholder={__("WP-Fest server URL")}
								value={this.state.url}
								onChange={this.onURL}
							/>
					}
					</div>
					<div className="form-group justify-content-center d-flex flex-column">
						<input
							type="text"
							className="form-control input dark"
							placeholder={__("Login")}
							value={this.state.wpfestlogin}
							onChange={this.onLogin}
						/>
					</div>
					<div className="form-group justify-content-center d-flex flex-column"> 
						<input
							type="password"
							className="form-control input dark"
							placeholder={__("password")}
							value={this.state.wpfestpassword}
							onChange={this.onPassword}
						/>
					</div>
					<div className="form-group justify-content-center d-flex flex-column">
						<div className="btn btn-success" onClick={this.onAdd}>
								{__("Log in")}
						</div>				
					</div>
				</div>
			</div>
			;
				
	}
	onURL = evt =>
	{
		this.setState({url:evt.currentTarget.value});
	}
	onLogin = evt =>
	{
		this.setState({wpfestlogin:evt.currentTarget.value});
	}
	onPassword = evt =>
	{
		this.setState({wpfestpassword:evt.currentTarget.value});
	}
	onAdd = () =>
	{
		_fetch(
			"auth", 
			{login:this.state.wpfestlogin, password:this.state.wpfestpassword},
			this.state.url
		)
			.then(data =>
			{
				if(data.error)
				{
					let d = data.error;
					if(data.error == "TypeError: Failed to fetch")
					{
						d = "Unknown URL";
					}
					AppToaster.show({
						intent: Intent.DANGER,
						icon: "tick",
						message: __(d)
					});
					return;
				}
				console.log(data);
				this.props.onLogin( data, this.state.url );
				//User.setData(data);
				//this.props.history.push("/" + this.props.root + "/" + "festivals");
				//this.setState({is:!this.state.is});
			},
			error =>
			{
				console.log(error);
			});
	}
	onLogout = () =>
	{
		//User.deleteData(); 
		this.setState({is:!this.state.is});
		//this.props.history.push("/" + this.props.root);
	}
}
export default compose( 
	withRouter
)(Login);