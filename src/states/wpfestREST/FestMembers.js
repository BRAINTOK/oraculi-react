import React, {Component, Fragment} from "react";
import _fetch from "./";  
import LoginForm from "./LoginForm";
import GanreForm from "./GanreForm";
import FestMemberBtn from "./FestMemberBtn";
import FestMemberStroke from "./FestMemberStroke";
import FestMemberCard from "./FestMemberCard"; 
import UserDescription from "./UserDescription";
import PhaseLabel from "./PhaseLabel";
import best from "../../assets/img/best.svg";
import prize from "../../assets/img/prize.svg";
import onlineClass from "../../assets/img/online-class.svg";

import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
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

class FestMembers extends Component
{
	state = {
		fest_members : [],
		mtype:"box",
		ganres : [],
		ganreFilterIDs: [],
		loading:true
	}
	componentDidMount()
	{ 
		_fetch( 
			"list", 
			{id : this.props.blog_id},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
				.then(data => 
				{
					//console.log( data );
					this.setState({
						festival_title: data.festival_title,
						fest_members: data.members,
						my_members: data.my_members,
						status		: data.status,
						ganres: data.ganres,
						ganreFilterIDs : data.ganres.map(e => e.id),
						mtype: data.mtype,
						loading:false
					});
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
		const {mtype, fest_members, ganres} = this.state; 
		const members = fest_members
			.filter( e => {
				return e.ganres.filter(ee => 
				{
					return this.state.ganreFilterIDs.filter( eee =>
					{
						return eee == ee.id;
					}).length > 0
				}).length > 0
			})
				.map((e, i) =>
				{
					switch(mtype)
					{
						case "box":
							return <FestMemberBtn
								key={i}
								route={this.props.route}
								{...e}
							/>
						case "stroke":
							return <FestMemberStroke
								key={i}
								route={this.props.route}
								{...e}
							/>
						default:
							return <FestMemberCard
								key={i}
								route={this.props.route}
								{...e}
							/>
					}
					
				});
		/**/
		const my_projects = this.state.my_members.length 
			?
			<Fragment>
				<div className="row justify-content-center mt-4 py-4">
					<div className="col-md-12">
						<ul className="d-flex justify-content-center">
							<div className="role_descr">
								{__("My projects")}
							</div>
						</ul>
					</div>
				</div> 
				<div className="row justify-content-center mb-5 pb-3 border-bottom border-dark">
				{
					this.state.my_members.map((e, i) =>
					{
						return <FestMemberCard 
							key={i}
							route={this.props.route}
							{...e}
						/>
					})
				}
				</div>	
			</Fragment>
			: 
			null
		
			
		return <div className="layout-state p-0 m-0">				
			{
				initArea(
					"fest-header", 
					{ 
						...this.props, 
						...this.state,
						header_type: "members-list"
					} 
				) 
			} 
			<div className="row">
				<div className="col-12  pt-1" >
					<div className="d-flex justify-content-end  flex-wrap">
						<PhaseLabel phase={this.state.status} />
						<UserDescription user={this.props.user} />
					</div>
				</div>
			</div>
			{my_projects}
			<div className="row">
				
				{members}
			</div>
		</div>
	}
	onGanre = ganres =>
	{
		this.setState({ ganreFilterIDs : ganres });
	}
}
export default FestMembers;