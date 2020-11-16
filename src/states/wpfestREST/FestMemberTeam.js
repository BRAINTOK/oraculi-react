import React, {Component, Fragmnent} from "react"; 
import {compose} from "recompose";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n"; 
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing";  
import $ from "jquery";
import Loading from "../../layouts/utilities/Loading";
import UserSearchForm from "./utilities/UserSearchForm";
import WPFestSettings from "./utilities/WPFestSettings";
import _fetch from "./";  

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

class FestMemberTeam extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...props
		} 
	} 
	
	render()	
	{  
		//console.log( this.state );
		
		let team = [];
		for(let i in this.state.owners)
		{
			team.push( <div key={i} className={"row data-list " + (this.props.is_owner ? "" : "py-2")} > 
				<div className="col-4 test-descr-title  my-auto">
					{ __(i) }
				</div>
				<div className="col-8 test-descr-cont">
					{ 
						this.props.is_owner  
							?
							this.isOwner(this.state.owners[i], i) 
							:
							this.isNotOwner(this.state.owners[i]) 
					}
				</div>
			</div> );
		}
		const categories = this.state.categories || [];
		return <div className="row">
			<div className="col-12 mt-4">
				{team}
			</div>
		</div>
	}
	isOwner = (owner, role) =>
	{
		return <UserSearchForm 
			value={ owner.display_name }
			selectedUser={owner}
			role={role}
			on={this.on}
		/>
	}
	isNotOwner = owner =>
	{
		return owner.display_name
	}
	on = (user, role) =>
	{
		switch(role)
		{
			case "tutor":
			case "leader":
				role = role + "_id";
				break;
			default:
				role = role;
		}
		//console.log(user, role);
		
		if( !this.props.isNew )
		{
			_fetch( 
				"update_project_field", 
				{id : this.props.id, field : role, value:user.id},
				WPFestSettings.url,
				WPFestSettings.token,
				"get_main"
			)
				.then(data => 
				{
					console.log( data );
				});
		}
		else if(this.props.on)
		{
			this.props.on( {id : this.props.id, field : role, value:user.id} );
		}
	}
	
}
export default compose(
	withRouter
)(FestMemberTeam);