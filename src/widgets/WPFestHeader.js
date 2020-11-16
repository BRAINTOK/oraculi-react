import React, {Component, Fragmnent} from "react";
import _fetch from "../states/wpfestREST";
import LoginForm from "../states/wpfestREST/LoginForm"; 
import GanreForm from "../states/wpfestREST/GanreForm";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../layouts/utilities/i18n";   
import icon1 from "../assets/img/test.svg";
import {socialLikes} from "social-likes"; // http://social-likes.js.org/ru/
import $ from "jquery";  
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
import onlineClass from "../assets/img/online-class.svg";

class WPFestHeader extends Component
{
	render()
	{
		switch(this.props.header_type)
		{
			case "members-list":
				return this.membersList();
			case "member":
				return this.member()
			case "requests":
				return this.requests()
			case "about":
				return this.about();
			case "reqister-user":
			case "insert-progect":
				return this.registerProgect();
			default:
				return this.props.defArea;
		}
	}
	member()
	{
		return <div className="menu-header-22 flex-md-end flex-center p-0" >
				<div className="menu-header-22-title">
					{ __( this.props.title ) }
				</div>
				
				<Link className="indicator classic" to={ this.props.route }>
					<div className="n1">
						{ __("About") }
					</div>
					<div className="iconnn">
						<img src={ this.props.logo || onlineClass } alt=''/>
					</div>
				</Link>
				<Link className="indicator classic"  to={ this.props.route + "/members"}>
					<div className="n1">
					{__("To list")}
					</div>
					<div className="iconnn">
						<img src={ icon1 } alt=''/>
					</div>
				</Link>						
				<LoginForm 
					url={this.props.url} 
					route={this.props.route}
					
				/>
			</div> 
	}
	membersList()
	{
		const { ganres } = this.props;  
		const gs = ganres.map( e => { return { ...e, check : 1 } } ); 
		return <div className="row">
			<div className="col-12 menu-header-22 fflex-md-end flex-center p-0" >
				<div className="menu-header-22-title">
					{ this.props.festival_title}
				</div>
				<Link className="indicator classic" to={ this.props.route }>
					<div className="n1">
						{ __("About") }
					</div>
					<div className="iconnn">
						<img src={ this.props.logo || onlineClass } alt=''/>
					</div>
				</Link>
				<GanreForm 
					ganres={ gs } 
					onGanre={this.onGanre}
				/>
				<LoginForm 
					url={this.props.url} 
					route={this.props.route}
					
				/>
			</div>
		</div>
	}
	
	about()
	{
		return <div className="row">
			<div className="col-12 menu-header-22 flex-md-end flex-center p-0" >
				<div className="menu-header-22-title">
					{ this.props.festival_title}
				</div> 
				<Link className="indicator classic"  to={ this.props.route + "/members"}>
					<div className="n1">
					{__("To list")}
					</div>
					<div className="iconnn">
						<img src={ icon1 } alt=''/>
					</div>
				</Link>
				<LoginForm 
					url={this.props.url} 
					route={this.props.route}
				/>
			</div>
		</div>
	}
	requests()
	{
		return <div className="row">	
			<div className="col-12 menu-header-22 flex-end p-0" >
				<div className="menu-header-22-title">
					{ __("Requests for add roles") }
				</div> 
				<Link className="indicator classic" to={  this.props.route }>
					<div className="n1">
						{ __("About") }
					</div>
					<div className="iconnn">
						<img src={ this.props.logo || onlineClass } alt=''/>
					</div>
				</Link>
				<Link className="indicator classic"  to={ this.props.route + "/members"}>
					<div className="n1">
					{__("To list")}
					</div>
					<div className="iconnn">
						<img src={ icon1 } alt=''/>
					</div>
				</Link>
				<LoginForm 
					url={this.props.url} 
					route={this.props.route}
					
				/>
			</div>	
		</div>
	}
	registerProgect()
	{
		return <div className="row">	
			<div className="col-12 menu-header-22 flex-end p-0" >
				<div className="menu-header-22-title">
					{ this.props.header_title ? this.props.header_title : this.props.title }
				</div> 
				<Link className="indicator classic" to={ this.props.route }>
					<div className="n1">
						{ __("About") }
					</div>
					<div className="iconnn">
						<img src={ this.props.logo || onlineClass } alt=''/>
					</div>
				</Link>
				<Link className="indicator classic"  to={ this.props.route + "/members"}>
					<div className="n1">
					{__("To list")}
					</div>
					<div className="iconnn">
						<img src={ icon1 } alt=''/>
					</div>
				</Link>
				<LoginForm 
					url={this.props.url} 
					route={this.props.route}
					
				/>
			</div>
		</div>
	}
}
export default WPFestHeader;