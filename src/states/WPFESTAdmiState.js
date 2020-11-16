import React, {Component, Fragmnent} from "react";
import _fetch from "./wpfestREST";
import $ from "jquery";
import User from "./wpfestREST/utilities/User";
import {setCookie, getCookie} from "./wpfestREST/utilities/utils";
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
import Widgets from "./adminWidget/Widgets";

import Login from "./wpfestREST/Login";
import Contents from "./wpfestREST/Contents";
import Festivals from "./wpfestREST/Festivals";

const components = [
	{id: "festivals",	component: Festivals}
]

class WPFESTAdmiState extends BasicState
{  
	basic_state_data() 
	{
		return { 
			routing: "Login" ,
			isLeftClosed: User.is_login
		};
	}
	getRoute = () =>
	{
		return "admin-fests";
	}
	
	render()	
	{ 
		console.log(this.props);
		const leftClass = this.state.isLeftClosed
			?
			"tutor-left-aside-2 menu-aside closed"
			:
			"tutor-left-aside-2 menu-aside"
		const mainClass = this.state.isLeftClosed
			?
			"tutor-main-2 pr-0 opened"
			:
			"tutor-main-2 pr-0";
		const canClass = this.state.canUpdate
			?
			"btn btn-danger"
			:
			"hidden";
			  
		
		let _routs = components.map((e,i) =>
		{
			const _Component = e.component; 
			return <Route  
				key={i}
				exact 
				path={'/' + this.getRoute() + '/' + e.id}
				component={ routeProps => (
					<_Component  
						{ ...this.props } 
						url={e.id} 
						root={this.getRoute()}
					/> 
				)}
			/>
		});
		
		const _switch = <Switch>
				<Route 
					exact  
					path={'/admin-fests'}
					component={ routeProps => (
						<Contents 						
							{ ...this.props } 
							root={this.getRoute()}
							routes={components}
						/> 
					)}
				/> 
				{_routs}
			</Switch> 
		const style = { width : 290, minWidth : 290 }
		return <div className="layout-state p-0">
			<div className="tutor-row menu-row" id="cont">
				<div className={leftClass}>	
					<div className="layout-state-head menu-header-22" style={style} >
						<LayoutIcon
							isSVG={ true } 
							src={ this.state.route.icon } 
							className="layout-state-logo "
						/>
						<div className="layout-state-title">
							{ __( this.state.route.title ) }
						</div>
					</div>
					<div className="small mx-3 mb-3 text-secondary" style={style} >					
						{this.props.description}
					</div> 
					<div style={style} >
						<Login
							{ ...this.props }
							root={this.getRoute()}							
						/> 
					</div>
				</div>
				<div className={mainClass}> 
					<div className="clapan-left" onClick={()=>this.setState({isLeftClosed:!this.state.isLeftClosed})}>
						<div className={"fas fa-caret-" + (!this.state.isLeftClosed ? "left" : "right")} />
					</div>
					
					<div className="menu-header-22 flex-centered pointer" onClick={this.onCollapseOpen}>
						 <div className="w-100 lead">
							{__(this.state.routing)}
						</div>
					</div>
					{_switch}
				</div>			
				<div className="tutor-right-aside-2"> 
				
				</div>
			</div>
		</div>
					
	}
}
export default compose( 
	withRouter
)(WPFESTAdmiState);