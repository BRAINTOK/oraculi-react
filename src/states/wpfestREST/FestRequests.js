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

class FestRequests extends Component
{
	
	state = { 
		loading:true,
		requests : []
	}
	componentDidMount()
	{ 
		if(this.props.user.id && this.props.user.roles.filter(e => e == "administrator").length > 0 )
		{
			_fetch( 
				"get_rolereq_page", 
				{ },
				WPFestSettings.url,
				WPFestSettings.token,
				"get_main"
			)
				.then(data => 
					{
						console.log( data );
						this.setState({
							requests:data.ext.requests,
							loading:false
						});
					}
				)
		}
	}
			
	render()	
	{ 
		console.log( this.props.user );
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
						header_type: "requests"
					} 
				) 
			} 
			<div className="row">
				{ 
					this.props.user.id && this.props.user.roles.filter(e => e == "administrator").length > 0 
						? 
						this.content() 
						: 
						this.the_none() 
				}
			</div>
		</div>
	}
	the_none()
	{
		return <div className="alert alert-danger p-5 w-100 my-2">
			{__("You no have rights.")}
		</div>
	}
	content()
	{
		
		const requests = this.state.requests.length > 0
		?
		this.state.requests.map((e,i) =>
		{
			return <div className="row data-list py-2" key={i}>
				<div className="col-4">
					{e.name}
				</div>
				<div className="col-4 title">
					{e.role}
				</div>
				<div className="col-4">
					<div className="btn-group">
						<div className="btn btn-success" user_id={e.id} role={e.role} onClick={this.onAccess}>
							{__("Access")}
						</div>
						<div className="btn btn-danger" user_id={e.id} role={e.role} onClick={this.onVeto}>
							{__("Veto")}
						</div>
					</div>
				</div>
			</div>
		})
		:
		<div className="alert alert-secondary">
			{__("No requests yet")}
		</div>;
		return <div className="container">
			{requests}
		</div>
		
	} 
	onAccess = evt =>
	{
		const id = evt.currentTarget.getAttribute("user_id");
		const role = evt.currentTarget.getAttribute("role");
		_fetch( 
				"allow_role_req", 
				{ id, role },
				WPFestSettings.url,
				WPFestSettings.token,
				"get_main"
			)
				.then(data => 
					{
						console.log( data );
						this.setState({
							requests:data.ext.requests,
							loading:false
						});
					}
				)
	}
	onVeto = evt =>
	{
		
		const id = evt.currentTarget.getAttribute("user_id");
		const role = evt.currentTarget.getAttribute("role");
		_fetch( 
				"veto_role_req", 
				{ id, role },
				WPFestSettings.url,
				WPFestSettings.token,
				"get_main"
			)
				.then(data => 
					{
						console.log( data );
						this.setState({
							requests:data.ext.requests,
							loading:false
						});
					}
				)
	}
	
}
export default compose (
	withRouter
)(FestRequests);