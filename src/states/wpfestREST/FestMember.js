import React, {Component, Fragmnent} from "react";
import _fetch from "./";
import LoginForm from "./LoginForm";
import GanreIcon from "./GanreIcon";
import FestMemberData from "./FestMemberData";
import FestMemberRaiting from "./FestMemberRaiting";
import FestMemberTeam from "./FestMemberTeam";
import FestMemberDuary from "./FestMemberDuary";
import UserDescription from "./UserDescription";
import TalkRoom from "./TalkRoom";
import PhaseLabel from "./PhaseLabel";
import MemberAdmiMenu from "./MemberAdmiMenu";
import MemberAdmin from "./MemberAdmin";
import {compose} from "recompose";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n"; 
import LayoutIcon from "../../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing";
import icon1 from "../../assets/img/test.svg";
import crown from "../../assets/img/crown.svg";
import group from "../../assets/img/group.svg"; // team
import videoconference from "../../assets/img/video-conference.svg"; // conference
import chat from "../../assets/img/chat.svg"; // description
import agree from "../../assets/img/agree.svg"; // raiting
import thumbs from "../../assets/img/thumbs-up.svg"; // raiting
import onlineClass from "../../assets/img/online-class.svg";
import dictionary from "../../assets/img/dictionary.svg"; // diary

import {socialLikes} from "social-likes"; // http://social-likes.js.org/ru/
import $ from "jquery";
import Loading from "../../layouts/utilities/Loading";
import WPFestSettings from "./utilities/WPFestSettings";

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

class FestMember extends Component
{
	state = {
		categories : [],
		max_raiting : 1,
		isLeftClosed : window.innerWidth < 740,
		loading : 1
	} 
	componentDidMount()
	{
		//console.log( this.props );
		_fetch( 
			"fmru_player", 
			{id : this.props.match.params.id},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
				.then(data => 
				{
					//console.log( data );
					this.setState({
						categories	: data.categories,
						is_diaries	: data.is_diaries,
						all_ganres	: data.ganres,
						uniqs		: data.uniqs,
						aut_criteries: data.aut_criteries,
						max_raiting	: data.max_raiting,
						owners		: data.owners,
						denabled	: data.denabled,
						status		: data.status,
						rait		: data.rait,
						experts		: data.experts || [],
						r2			: data.r2,
						is_expert	: data.is_expert,
						is_experts_criteries	: data.is_experts_criteries, 
						...data.member,
						loading:false
					});
					$('#share').socialLikes();
				});
	}
	componentWillUnmount()
	{
		
	}
	render()	
	{   
		if(this.state.loading)
		{
			return <div className="layout-state p-0 m-0">	
				<Loading />
			</div>
		} 
		
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
			"hidden"
		
		console.log(this.props);
		
		const articleElements = this.state.experts.map(( expert ) => expert.display_name );
		const experts = articleElements.length> 0 ? (
			<li className="list-group-item transparent">
				<div className="row margin0">
					<div className="col-md-12 critery_cell2">
						{__("Experts, who put raiting:")}
					</div>
					<div className="col-md-12 critery_cell2">
						<strong>{ articleElements.join(", ") }</strong>
					</div>
				</div>
			</li> )  : "";
			
		const categories = this.state.categories || [];
		const is_owner = this.props.user.id &&
			( this.state.owners.leader && this.state.owners.leader.id == this.props.user.id )
			|| 
			( this.state.owners.tutor && this.state.owners.tutor.id == this.props.user.id );
		
		const is_member = this.props.user.id &&
			( this.state.owners.leader && this.state.owners.leader.id == this.props.user.id )
			|| 
			( this.state.owners.tutor && this.state.owners.tutor.id == this.props.user.id )
			|| 
			( this.state.owners.member_0 && this.state.owners.member_0.id == this.props.user.id )
			|| 
			( this.state.owners.member_1 && this.state.owners.member_1.id == this.props.user.id )
			|| 
			( this.state.owners.member_2 && this.state.owners.member_2.id == this.props.user.id )
			|| 
			( this.state.owners.member_3 && this.state.owners.member_3.id == this.props.user.id )
			|| 
			( this.state.owners.member_4 && this.state.owners.member_4.id == this.props.user.id )
			|| 
			( this.state.owners.member_5 && this.state.owners.member_5.id == this.props.user.id )
			|| 
			( this.state.owners.member_6 && this.state.owners.member_6.id == this.props.user.id )
			|| 
			( this.state.owners.member_7 && this.state.owners.member_7.id == this.props.user.id )
			|| 
			( this.state.owners.member_8 && this.state.owners.member_8.id == this.props.user.id )
			|| 
			( this.state.owners.member_9 && this.state.owners.member_9.id == this.props.user.id )
		
		return <div className="tutor-row menu-row h-100">
				<div className={leftClass}>	
					<div>
						<div className="layout-state-head menu-header-22 mb-1"> 
																
							<div className="social-likes ml-3" id="share" data-title="Landscapists of Russia">
								<div className="facebook" title="Поделиться ссылкой на Фейсбуке"/>
								<div className="twitter" data-via="@Metaversitet" title="Поделиться ссылкой в Твиттере"/>
								<div className="mailru" title="Поделиться ссылкой в Моём мире"/>
								<div className="vkontakte" title="Поделиться ссылкой во Вконтакте"/>
								<div className="odnoklassniki" title="Поделиться ссылкой в Одноклассниках"/> 
							</div>	 
									
						</div>
					</div>					
					<div className="card-trumb mb-3" style={{backgroundImage:"url(" +this.state.img + ")"}}>
						<div className="card-id">{this.state.o}</div>
						<div className="d-flex flex-wrap p-4 mt-auto">
							{
								initArea( 
									"fest-member-link-0", 
									{ 
										...this.props, 
										...this.state, 
										preroute : "/" + this.props.route + "/member/" + this.props.match.params.id 
									} 
								) 
							} 
							<NavLink 
								className="btn btn-light member-menu-btn"
								to={ this.props.route + "/member/" + this.props.match.params.id + "/description" }
							>
								<img
									src={chat}
									style={{width:50, height:50}}
								/>
								<div className="mt-auto">{ __( "Descriptions" ) }</div>
							</NavLink>
							{
								initArea( 
									"fest-member-link-1", 
									{ 
										...this.props, 
										...this.state, 
										preroute : "/" + this.props.route + "/member/" + this.props.match.params.id 
									} 
								) 
							} 
							<NavLink 
								className="btn btn-light member-menu-btn"
								to={ this.props.route + "/member/" + this.props.match.params.id + "/rait" }
							>
								<img
									src={agree}
									style={{width:50, height:50}}
								/>
								<div className="mt-auto">{ __( "Raiting" ) }</div>
							</NavLink>
							<NavLink 
								className="btn btn-light member-menu-btn"
								to={ this.props.route + "/member/" + this.props.match.params.id + "/team" }
							>
								<img
									src={group}
									style={{width:50, height:50}}
								/>
								<div className="mt-auto">{ __( "Team" ) }</div>
							</NavLink>
							{
								this.state.is_diaries
									?
									<NavLink 
										className="btn btn-light member-menu-btn"
										to={ this.props.route + "/member/" + this.props.match.params.id + "/diary" }
									>
										<img
											src={dictionary}
											style={{width:50, height:50}}
										/>
										<div className="mt-auto">{ __( "Diary" ) }</div>
									</NavLink>
									:
									null
							}							
							{
								is_member
									?
									<NavLink 
										className="btn btn-light member-menu-btn"
										to={ this.props.route + "/member/" + this.props.match.params.id + "/jitsi" }
									>
										<img
											src={videoconference}
											style={{width:50, height:50}}
										/>
										<div className="mt-auto">{ __( "Talk Room" ) }</div>
									</NavLink>
									:
									null
							}
							{
								initArea( 
									"fest-member-link-2", 
									{ 
										...this.props, 
										...this.state, 
										preroute : this.props.route + "/member/" + this.props.match.params.id
									} 
								) 
							}
						</div>
					</div>
					<MemberAdmiMenu
						is_owner={is_owner}
						is_member={is_member}
						{...this.props }
						{...this.state}  
						preroute = { this.props.route + "/member/" + this.props.match.params.id}
					/>
					
				</div>
				<div className={mainClass}> 
					<div className="clapan-left" onClick={this.onLeftSwitch }>
						<div className={"fas fa-caret-" + (!this.state.isLeftClosed ? "left" : "right")} />
					</div>									
					{
						initArea(
							"fest-header", 
							{ 
								...this.props, 
								...this.state,
								header_type: "member"
							} 
						) 
					} 
					<div className="p-4 pt-1">
						<div className="d-flex justify-content-end flex-wrap">
							<PhaseLabel phase={WPFestSettings.status} />
							<UserDescription user={this.props.user} />
						</div>
						<Switch>
							<Route
								exact
								path = { "/wp-fest/:festid/member/:id" } 
							>
								<FestMemberData
									{...this.state}
									is_owner={is_owner}
									is_member={is_member}
									user={this.props.user}
								/>
							</Route>
							<Route
								exact
								path = { this.props.preroute + "/wp-fest/:festid/member/:id/description" } 
							>
								<FestMemberData
									{...this.state}
									is_owner={is_owner}
									is_member={is_member}
									user={this.props.user}
								/>
							</Route>
							<Route
								exact
								path = { this.props.preroute + "/wp-fest/:festid/member/:id/rait" } 
							>
								<FestMemberRaiting
									{...this.state}
									is_owner={is_owner}
									is_member={is_member}
									user={this.props.user}
								/>
							</Route>
							<Route
								exact
								path = { this.props.preroute + "/wp-fest/:festid/member/:id/team" } 
							>
								<FestMemberTeam
									{...this.state}
									is_owner={is_owner}
									is_member={is_member}
									user={this.props.user}
								/>
							</Route>
							{
								this.state.is_diaries
									?
									<Route
										exact
										path = { this.props.preroute + "/wp-fest/:festid/member/:id/diary" } 
									>
										<FestMemberDuary
											{...this.state}
											user={this.props.user}
											is_owner={is_owner}
											is_member={is_member}
										/>
									</Route>
									:
									null
							}						
							{
								is_member
									?
									<Route
										exact
										path = { this.props.preroute + "/wp-fest/:festid/member/:id/jitsi" } 
									>
										<TalkRoom
											{...this.state}
											user={this.props.user}
											is_owner={is_owner}
											is_member={is_member}
										/>
									</Route>
									:
									null
							}
							<MemberAdmin
								is_owner={is_owner}
								is_member={is_member}
								{...this.props }
								{...this.state}  
								preroute = { this.props.route + "/member/" + this.props.match.params.id}
							/>
							{
								initArea(
									"fest-member-route", 
									{ 
										...this.props, 
										...this.state, 
										preroute : this.props.preroute + "/wp-fest/:festid/member/:id"
										
									} 
								) 
							} 
						</Switch>						
					</div>
				</div>
				<div className="tutor-right-aside-2">
					
				</div>
			</div>
	}
	onLeftSwitch = () =>
	{
		this.setState({isLeftClosed:!this.state.isLeftClosed})
		this.props.onLeftSwitch( !this.state.isLeftClosed );
	}
}
export default compose(
	withRouter
)(FestMember);