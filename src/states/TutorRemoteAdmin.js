import React, {Component, Fragment} from "react";
import _fetch from "./wpfestREST";
import Login from "./wpfestREST/Login"
import AddFestivalForm from "./wpfestREST/AddFestivalForm"
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

class TutorRemoteAdmin extends BasicState
{
	basic_state_data() 
	{
		return {
			offset:0,
			festivals:[],
			number: 1000
		}
	}
	stateDidMount()
	{
		this.onPagi(0);
	}
	getRoute = () =>
	{
		return this.props.route;
	}
	addRender()
	{
		const {festivals, cont, offset, number} = this.state;
		const siteList = festivals.map(elem => 
		{
			return <div className="row data-list" key={elem.domain}>
			
				<div className="col-md-2 col-12 py-2">{elem.blog_id}</div>
				<div 
					className="col-md-5 col-12 py-2" 
				>
					{elem.domain}
				</div>
				<div className="col-md-3 py-2">
					{ elem.domain_type ? <span className="member_span">{elem.domain_type}</span> : null }
				</div>
				<div className="col-md-2 py-2">
					<AddFestivalForm 
						{...elem}
					/>
				</div>
			</div>
		});
		return <div className="layout-center w-100">			
			<div className="w-100">
				{siteList}
			</div>
		</div>
	}
	onPagi = offset =>
	{
		let tokens = [];
		let festivals = [];
		for(let i = 0; i < 10; i++)
		{
			let token = getCookie( "wpfest_token" + i);
			let url = getCookie( "wpfest_url" + i); 
			if(!token) continue;
			_fetch( 
				"get_all_sites", 
				{offset: offset, number:this.state.number},
				url,
				token
			)
					.then(data => 
					{
						console.log(token, data.sites);
						if(data.sites)
						{
							data.sites.forEach(e =>
							{
								if( 
									festivals.filter(ee => ee.blog_id == e.blog_id).length == 0 
									&& e.domain_type
								)
								{
									festivals.push(e);
								}
							})
						}
						console.log(festivals);
						this.setState({festivals, count:data.count, offset:data.offset, number:data.number  });
					});
		}	
		return;	
	}
	
}
export default compose( 
	withRouter
)(TutorRemoteAdmin);