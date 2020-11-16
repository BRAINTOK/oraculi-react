import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie, deleteCookie} from "./utilities/utils";
import _fetch from "./";
import Login from "./Login";
import User from "./utilities/User";
import login1 from "../../assets/img/login1.svg";
import logout_img from "../../assets/img/logout.svg";
import usser_img from "../../assets/img/usser.svg";
import employee from "../../assets/img/employee.svg";
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

class LoginForm extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isCreateOpen: false,
			is:false,
			reqRoles: []
		}
		this.all_roles = [...WPFestSettings.fmru_evlbl_roles];
		this.all_roles.unshift("administrator");
	} 
	render()
	{
		const token = WPFestSettings.token; 
		return token && token.length > 0
			?
			this.logout()
			:
			this.login();
	}
	login()
	{
		const style ={width:50};
		const register = WPFestSettings.is_register
			?
			<NavLink
				className="indicator classic" 
				to={ this.props.route + "/register" }
			>			
				<div className="n1">
					{ __("Register") } 
				</div>
				<div className="iconnn">
					<img src={ employee } alt=''  style={style} />
				</div>
			</NavLink>
			:
			null
		return <Fragment>
			{register}
			<Popover
			className=" mt-auto"
				position={Position.RIGHT_TOP}
				isOpen={this.state.isCreateOpen}
				content={
					<div className="p-4">
						<Login 
							onLogin={this.onLogin}
							url={this.props.url}
							hideUrl={true}
						/>
					</div>
				}
			>
				<div className="indicator classic" onClick={this.onCreateToggle}>			
					<div className="n1">
						{ __("Log in") } 
					</div>
					<div className="iconnn">
						<img src={ login1 } alt=''  style={style} />
					</div>
				</div>
			</Popover>
		</Fragment>
	}
	onCreateToggle = () =>
	{
		this.setState({isCreateOpen:!this.state.isCreateOpen});
	}
	logout()
	{
		const style ={width:50};
		const style2 ={width:20, marginLeft:-7, marginTop:12};
		const token = getCookie( "wpfest_token" + this.props.url);
		const display_name = getCookie( "wpfest_display_name" + this.props.url);
		const cookroles = getCookie( "wpfest_roles" + this.props.url);
		const roles = cookroles ? JSON.parse(cookroles) : [];
		//console.log( roles );
		
		const __roles__ = this.all_roles.map((e, i) =>
		{
			//console.log( e,  Array.isArray( roles ) , roles );
			const disabled = roles && Array.isArray( roles ) 
				?
				roles.filter(ee => 
				{
					//console.log(ee, e);
					return ee == e
				}).length > 0
					||
				this.state.reqRoles.filter(ee =>
				{
					return ee == e
				}).length > 0
				:
				false
			const icon = disabled
				?
				this.state.reqRoles.filter(ee =>
				{
					return ee == e
				}).length > 0
					?
					<div className=" m-3 text-success">
						{__("Wait answer")}
					</div>
					:
					<Icon intent={Intent.SUCCESS} icon="tick" className=" m-3"/>
				:
				<div className="p-3 bg-danger text-light">
					{ __( "Request" ) }
				</div>;
				
			return <button 
				className="btn btn-block btn-light px-3 d-flex transparent" 
				key={i} 
				disabled={disabled}
				role={e}
				onClick={disabled ? null : this.onRequire}
			>
				<div className=" flex-grow-1 ">
					<div className="lead text-left">
						{ __( e ) }
					</div>
					<div className="small text-left">
						{ __( "You may expert raiting the Projects" ) }
					</div>
				</div>
				{ icon }
			</button>
		});
		
		return <Fragment>
			<div className="indicator classic">
				<div className="n1" onClick={ () => this.setState({ isLoginOpen : !this.state.isLoginOpen })}>
					{ display_name }
				</div>
				<div className="iconnn" onClick={ () => this.setState({ isLoginOpen : !this.state.isLoginOpen })}>
					<img src={ usser_img } alt='' style={style} />
				</div>		
				<Popover
					className="bottom--30 left-60"
					popoverClassName="p-0"
					ClassName="p-0"
					position={Position.BOTTOM_RIGHT}
					isOpen={this.state.isLoginOpen}
					content={ <div className="w_175 p-0">
						<div className="btn-group-vertical p-0" role="group" >
							<div className="btn btn-light btn-block" onClick={this.onRequireOpen}>
								{__("Require role")}
							</div>
							<NavLink 
								to={ this.props.route + "/insert-project" } 
								className="btn btn-light btn-block"
							>
								{__("Insert new Project")}
							</NavLink>
							{
								roles.filter(e => e == "administrator").length > 0
									?
									<NavLink 
										to={ this.props.route + "/admin-request-roles" } 
										className="btn btn-light btn-block"
									>
										{__("Requests from users")}
									</NavLink>
									:
									null
							}
						</div>
					</div> }
				>
					<div style={{marginop:100}} />
				</Popover>
			</div>
			<div className="indicator classic" onClick={this.onLogout}>			
				<div className="n1">
					{ __("Log out") }
				</div>
				<div className="iconnn">
					<img src={ logout_img } alt='' style={style2} />
				</div>
			</div>
			<Dialog
				isOpen={this.state.isRequireOpen}
				className="little"
				title={__("Require role")}
				onClose={this.onRequireOpen}
			>
				<div className=" btn-group-vertical p-4">
					{ __roles__ }
				</div>
			</Dialog>
			
		</Fragment>
	}
	onRequireOpen = () =>
	{
		if(!this.state.isRequireOpen)
		{
			_fetch( 
			"get_my_roles", 
			{ },
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
			)
				.then(data => 
				{
					console.log( data.reqRoles );
					this.setState({ 
						reqRoles		: data.reqRoles,
						isRequireOpen 	: !this.state.isRequireOpen, 
						isLoginOpen		: false
					});
				});
		}
		else
			this.setState( { isRequireOpen :!this.state.isRequireOpen, isLoginOpen: false } )
	}
	onRequire = evt =>
	{
		const role = evt.currentTarget.getAttribute("role");
		_fetch( 
			"req_role", 
			role,
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
			)
				.then(data => 
				{
					console.log( data );
					this.setState({ 
						reqRoles		: data.reqRoles,
						isRequireOpen 	: !this.state.isRequireOpen, 
						isLoginOpen		: false
					});
				});
		
	}
	
	onLogin = (data, url) =>
	{
		console.log( data, this.props );
		if(data.token)
		{
			setCookie( "wpfest_token" + this.props.url, data.token ); 
			setCookie( "wpfest_display_name" + this.props.url, data.user.display_name ); 
			setCookie( "wpfest_user_id" + this.props.url, data.user.ID ); 
			setCookie( "wpfest_roles" + this.props.url, JSON.stringify(data.user.roles) ); 
			this.setState({ isCreateOpen:false });
		}
		//this.props.history.push(this.props.location.pathname);
		this.props.history.replace( );
	}
	onLogout = () =>
	{    
		setCookie( "wpfest_token" + this.props.url, "" ); 		
		setCookie( "wpfest_roles" + this.props.url, "" ); 		
		setCookie( "wpfest_display_name" + this.props.url, "" ); 		
		setCookie( "wpfest_user_id" + this.props.url, "" ); 		
		this.setState({is:!this.state.is});
		this.props.history.replace( );
		//this.props.history.push(this.props.location.pathname);
		console.log(  this.props, getCookie("wpfest_token" + this.props.url) );
	}
}
export default compose(
	withRouter
)(LoginForm);