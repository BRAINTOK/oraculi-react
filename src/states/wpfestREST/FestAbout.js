import React, {Component, Fragment} from "react";
import _fetch from "./";  
import LoginForm from "./LoginForm";
import GanreForm from "./GanreForm";
import FestMemberBtn from "./FestMemberBtn";
import FestMemberStroke from "./FestMemberStroke";
import FestMemberCard from "./FestMemberCard"; 
import UserDescription from "./UserDescription";
import PhaseLabel from "./PhaseLabel";
import crown from "../../assets/img/crown.svg";
import icon1 from "../../assets/img/test.svg"; 

import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import Pagi from "../../layouts/utilities/Pagi";
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

class FestAbout extends Component
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
			"about", 
			{id : this.props.blog_id},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
				.then(data => 
				{
					console.log( data );
					this.setState({
						festival_title: data.festival_title,
						pagi		: data.pagi,
						fest_members: data.members,
						is_diaries	: data.is_diaries,
						my_members	: data.my_members,
						count_raitings	: data.count_raitings,
						full_members: data.full_members,
						status		: data.status,
						content		: data.content,
						posts		: data.posts || [],
						thumbnail	: data.thumbnail,
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
		const gs = ganres.map( e => { return { ...e, check : 1 } } ); 
		const __ganres = ganres.map((e, i) =>
		{
			return <span className="role_descr m-1" style={{borderColor:e.color, borderLeftWidth:10}} key={i}>
				{e.name}
			</span>
		});

		const statistics = <div className="row justify-content-center colored mt-4 py-5">
				<div className="col-md-12 d-flex justify-content-center"> 
					<div className="role_descr">
						{__("Statistics")}
					</div> 
				</div>
				<div className="col-md-12 d-flex justify-content-center mt-4"> 
					<div className="row w-100">
						<div className="test-descr-title col-md-6">
							{ __("Count of projects") }
						</div>				
						<div className="test-descr-cont title col-md-6">
							{ this.state.full_members }
						</div>					
						<div className="test-descr-title col-md-6">
							{ __("Count of assessments") }
						</div>				
						<div className="test-descr-cont title col-md-6">
							{ this.state.count_raitings }
						</div>					
						<div className="test-descr-title col-md-6 my-auto">
							{ __("Ganres in Festival") }
						</div>				
						<div className="test-descr-cont col-md-6">
							{ __ganres }
						</div>	
						<div className="test-descr-title col-md-6 my-auto">
							{ __("Current status") }
						</div>				
						<div className="test-descr-cont title col-md-6">
							<PhaseLabel phase={this.state.status} />
						</div>				
					</div>	
				</div>
				<div className="col-12 d-flex justify-content-center mt-3">
					<NavLink	
						className="btn btn-primary"
						to={"/wp-fest/" + this.props.blog_id + "/insert-project" }
						location={{state:{ festival_title: this.state.festival_title}}}
					>
						{__("Insert new Project")}
					</NavLink>
				</div>
			</div>
		
		const my_projects = this.state.my_members.length 
			?
			<Fragment>
				<div className="row justify-content-center light-colored  mt-0 py-4">
					<div className="col-md-12 d-flex justify-content-center"> 
						<div className="role_descr">
							{__("My projects")}
						</div> 
					</div>
				</div> 
				<div className="row justify-content-center light-colored  mb-0 pb-3">
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
		
		
		const shifter =this.state.pagi && this.state.pagi[1]
			?
			<div className="py-1 d-flex flex-wrap justify-content-center">
				<Pagi
					all={ this.state.pagi[1] - 1 }
					current={ this.state.pagi[0] }
					onChoose={ this.onPagi }
				/>
			</div>
			:
			null
		
		const posts = this.state.is_diaries
			?
			<div className="row">
				<div className="container colored">
					<div className="row">						
						<div className="col-md-12 d-flex justify-content-center pt-5 pb-3"> 
							<div className="role_descr">
								{__("Last Diaries from Projects")}
							</div> 
						</div>
						<div className="col-12">
							{shifter}
						</div>
					</div>
					{
						this.state.posts.map(elem => (
							<div className="row" key={elem.id}>
								<div className="col-12">
									<div className="diary_post mt-2">
										<div className="diary_thumbnail">
											<img src={elem.thumbnail} alt='' />
										</div>
										<div className="diary_title">
											{elem.post_title}
										</div>
										<div className="diary_body"
											dangerouslySetInnerHTML={{ __html : elem.post_content }}
										/>
										<div className="diary_footer">
											<span> 
												<i className="fas fa-clock" style={{opacity:0.5}}></i> 
												{elem.post_date} 
											</span>
											<span> 
												<i className="fas fa-user" style={{opacity:0.5}}></i> 
												{elem.post_author} 
											</span>
											<NavLink
												to={"/wp-fest/" + this.props.blog_id + "/member/" + elem.prid + "/diary"} 
												className="diary-link light"
											> 
												<i className="fas fa-folder"	style={{opacity:0.5}}></i> {elem.diary} 
											</NavLink>
										</div>
									</div>
								</div> 
							</div>
						))
					}
					<div className="row py-2">	 
						<div className="col-12">
							{shifter}
						</div>
					</div>
				</div>
			</div>
			: 
			null
				
		return <div className="layout-state p-0 m-0">	
			{
				initArea(
					"fest-header", 
					{ 
						...this.props, 
						...this.state,
						header_type: "about"
					} 
				) 
			} 
			<div className="row">
				<div className="col-12  pt-1" >
					<div className="d-flex justify-content-end">						
						<UserDescription user={this.props.user} />
					</div>
					<div className="card-trumb my-3" style={{backgroundImage:"url(" + this.state.thumbnail + ")" }}>
					
					</div>
					<div className="p-5 about-content" dangerouslySetInnerHTML={{ __html: this.state.content}}>
						
					</div>
				</div> 
			</div> 			
			{statistics}
			{my_projects}
			
			{posts}
		</div>
	}
	onPagi = page =>
	{
		_fetch( 
			"get_diaries", 
			{
				offset : page
			},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
			.then(data => 
			{
				console.log( data );
				this.setState({  
					posts		: data.posts,
					pagi		: data.pagi,
					colm		: data.colm
				});
			});
		
		
		
		let pagi = [...this.state.pagi];
		pagi[0] = page;
		this.setState({ pagi });
	}
}
export default FestAbout;