import React, {Component, Fragmnent} from "react";
import _fetch from "./wpfestREST";
import FestAbout from "./wpfestREST/FestAbout";
import FestMembers from "./wpfestREST/FestMembers";
import FestMember from "./wpfestREST/FestMember"; 
import FestNewProjectForm from "./wpfestREST/FestNewProjectForm"; 
import FestRegister from "./wpfestREST/FestRegister"; 
import FestRequests from "./wpfestREST/FestRequests"; 
import WPFestSettings from "./wpfestREST/utilities/WPFestSettings";
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
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../layouts/utilities/i18n";
import LayoutIcon from "../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../layouts/utilities/getWidget";
import getWidgets from "../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../layouts/routing";
import BasicState from "../layouts/BasicState"; 
import {setCookie, getCookie, deleteCookie} from "./wpfestREST/utilities/utils";
import Loading from "../layouts/utilities/Loading";

class TutorWPFest extends BasicState
{
	basic_state_data() 
	{
		return { 
			isLeftClosed:false,
			loading: true
		}
	}
	componentWillMount()
	{
		const token = getCookie("wpfest_token" + this.props.route_data.url);
		console.log(this.props.route_data.url, token);
		const url = this.props.route_data.url;
		_fetch( 
			"init", 
			{},
			url,
			token,
			"get_main"
		)
				.then(data => 
				{
					if( data.error )
					{
						let d = data.error;
						if (data.error == "TypeError: Failed to fetch")
						{
							d = "Error connect ro remote server";
						}
						AppToaster.show({
							intent: Intent.DANGER,
							icon: "tick",
							duration:10000,
							message: __( d )
						});
					}
					else
					{
						console.log(data);
						this.setState(
							{loading:false},
							WPFestSettings.set({
								is_comment 	: true,
								url 		: url,
								token 		: token,
								...data
							})
						);
					}
				});
	}
	render()	
	{  
	
		if(this.state.loading)
		{
			return <div className="layout-state p-0 m-0">	
				<Loading />
			</div>
		} 
		console.log( this.props ); 
		const {preroute, route, route_data} = this.props;
		const {mtype, fest_members} = this.state;	 	
		const wpfest_roles = getCookie("wpfest_roles" + route_data.url) 
		const wpfest_userId = getCookie("wpfest_user_id" + route_data.url) 
		const display_name = getCookie("wpfest_display_name" + route_data.url);
		const roles = wpfest_roles ? JSON.parse(wpfest_roles) : [];
		return <div className="layout-state p-0 m-0"> 
			<Switch>
				<Route
					exact
					path = { preroute + "/wp-fest/:festid" } 
				>
					<FestAbout 
						blog_id={ route_data.blog_id} 
						url={ route_data.url}
						route={ preroute + "/" + route }
						user={{ display_name, roles, id:wpfest_userId }}
					/>
				</Route>
				<Route
					exact
					path = { preroute + "/wp-fest/:festid/insert-project" } 
				>
					<FestNewProjectForm 
						blog_id={ route_data.blog_id}
						url={ route_data.url}
						route={  preroute + "/" + route}
						user={{ display_name, roles, id:wpfest_userId }}
					/>
				</Route>
				<Route
					exact
					path = { preroute + "/wp-fest/:festid/admin-request-roles" } 
				>
					<FestRequests
						blog_id={ route_data.blog_id}
						url={ route_data.url}
						route={ preroute + "/" + route}
						user={{ display_name, roles, id:wpfest_userId }}
					/>
				</Route>
				<Route
					exact
					path = { preroute + "/wp-fest/:festid/register" } 
				>
					<FestRegister 
						blog_id={ route_data.blog_id}
						url={ route_data.url}
						route={ preroute + "/" + route}
						user={{ display_name, roles, id:wpfest_userId }}
					/>
				</Route>
				<Route
					exact
					path = { preroute + "/wp-fest/:festid/members" } 
				>
					<FestMembers 
						blog_id={ route_data.blog_id}
						url={ route_data.url}
						route={ preroute + "/" + route}
						user={{ display_name, roles, id:wpfest_userId }}
					/>
				</Route>
				<Route
					strict  
					path = { preroute + "/wp-fest/:festid/member/:id" }
				>
					<FestMember 
						blog_id={ route_data.blog_id}
						isLeftClosed={this.state.isLeftClosed}
						onLeftSwitch={this.onLeftSwitch}
						url={ route_data.url}
						preroute={preroute}
						route={ preroute + "/" + route}
						user={{ display_name, roles, id:wpfest_userId }}
					/>
				</Route>
			</Switch>  
		</div>
	}
	onLeftSwitch = isLeftClosed =>
	{ 
		this.setState( { isLeftClosed } )
	}
	
}
export default withRouter(TutorWPFest);