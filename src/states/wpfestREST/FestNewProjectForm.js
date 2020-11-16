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

class FestNewProjectForm extends Component
{
	
	state = {
		...this.props,
		current:"settings",
		loading:true
	}
	componentDidMount()
	{ 
		_fetch( 
			"about", 
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
		const switcher = [
			{
				id:"settings",
				name:"Settings",
				icon: "fas fa-wrench fa-2x"
			},
			{
				id:"team",
				name:"Team",
				icon: "fas fa-users-cog fa-2x"
			}
		]
			.map((e,i) =>
			{
				return <div 
					key={i}
					className={"menu-switch-btn " + (this.state.current == e.id ? "active" : "") }
					e={e.id}
					data-title={e.name}
					onClick={this.onSwitch}
				>
					<i className={e.icon} />	
				</div>
			}); 
		return <div className="layout-state p-0 m-0">								
			{
				initArea(
					"fest-header", 
					{ 
						...this.props, 
						...this.state,
						header_type: "insert-progect",
						header_title:__("New project parameters") 
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
		return <div className="alert alert-danger p-5 w-100 my-2">
			{__("Log in for read content")}
		</div>
	}
	content()
	{
		switch(this.state.current)
		{
			case "team":				
				return;
			case "settings":
			default:				
				return <Fragment>
					<div className="col-12  p-4" >
						<FestMemberSetting
							all_ganres={this.state.ganres}
							ganres={[]}
							isNew={true}
							on={this.on}
							ons={this.ons}
						/>
						<FestMemberTeam
							is_owner={true}
							isNew={true}
							owners={{
								leader: this.state.user,
								member_0: { },
								member_1: { },
								member_2: { },
								member_3: { },
								member_4: { },
								member_5: { },
								member_6: { },
								member_7: { },
								member_8: { },
								member_9: { },
								tutor: { }
							}}
							on={this.on}
						/>
						
					</div>
					<div className="col-md-8 offset-md-4  p-4" >
						<div className="btn btn-lg btn-primary" onClick={this.onInsert}>
							{__("Insert new Project")}
						</div>
					</div>
				</Fragment>
		}
	}
	onSwitch = evt =>
	{
		this.setState({current:evt.currentTarget.getAttribute("e")});
	}
	onInsert = () =>
	{
			let yes = true;
		if( !this.state.post_title )
		{
			yes = false;
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick", 
				message: __( "Insert title" )
			});
		}			
		if( !this.state.post_content )
		{
			yes = false;
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick", 
				message: __( "Insert content" )
			});
		}		
		if( !this.state.leader_id )
		{
			
		}	
		if( !this.state.fmru_group_player  || this.state.fmru_group_player.length == 0 )
		{
			yes = false;
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick", 
				message: __( "Insert one or more ganre" )
			});
		}
		
		if(!yes)
			return;
		
		let args = {
			post_title			: this.state.post_title,
			post_content		: this.state.post_content,
			thumbnail			: this.state.thumbnail,
			thumbnail_name		: this.state.thumbnail_name,
			fmru_group_player	: this.state.fmru_group_player,
			vk_url				: this.state.fmru_group_player,
			fb_url				: this.state.fmru_group_player,
			instagramm_url		: this.state.instagramm_url,
			tutor_id			: this.state.tutor_id,
			leader_id			: this.state.leader_id,
			member_0			: this.state.member_0,
			member_1			: this.state.member_1,
			member_2			: this.state.member_2,
			member_3			: this.state.member_3,
			member_4			: this.state.member_4,
			member_5			: this.state.member_5,
			member_6			: this.state.member_6,
			member_7			: this.state.member_7,
			member_8			: this.state.member_8,
			member_9			: this.state.member_9,
		}
		_fetch( 
			"create_project_with_patams", 
			args,
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
			.then(data => 
				{
					console.log( data );
					this.props.history.push( "/" + this.props.route + "/member/" + data.created_id );
				}
			)
		
	}
	on = data =>
	{
		console.log(data);
		let state = {};
		state[data.field] = data.value;
		this.setState(state);
	}
	ons = data =>
	{
		console.log(data);
		let state = {};
		data.fields.forEach(e =>
		{
			state[e.field] = e.value;
		});
		this.setState(state);
	}
}
export default compose (
	withRouter
)(FestNewProjectForm);