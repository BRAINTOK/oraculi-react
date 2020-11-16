import React, {Component, Fragmnent} from "react";
import _fetch from "./";
import LoginForm from "./LoginForm";
import GanreIcon from "./GanreIcon";
import {compose} from "recompose";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n"; 
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing";
import BasicState from "../../layouts/BasicState"; 
import CategoryList from "./CategoryList";
import icon1 from "../../assets/img/test.svg";
import {socialLikes} from "social-likes"; // http://social-likes.js.org/ru/
import $ from "jquery";
import Loading from "../../layouts/utilities/Loading";

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

class FestMemberData extends Component
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
		
		const cardIcons = this.state.ganres.map((ganre, index) => 
		{
			return <GanreIcon ganre={ganre} key={ganre.id} />
		});
			
		let socials = [];
		[
			{i:"fab fa-facebook-f",	n:"fb_url"}, 
			{i:"fab fa-vk",			n:"vk_url"}, 
			{i:"fab fa-instagram",	n:"instagramm_url"}, 
			{i:"fab fa-youtube",	n:"youtube_url"}
		].forEach(elem => 
		{
			if(this.state[elem.n] !== "")	
			{
				//console.log("hfer=" , this.state[elem.n]);
				socials.push(
					<a 
						href={this.state[elem.n]} 
						_target="blank"
						className="socials fa-stack"
						key={elem.n}
					>
						<i className="fas fa-square fa-stack-2x" />
						<i className={elem.i + " fa-stack-1x fa-inverse"} />
					</a>
				);
			}
		})
		
		const raiting_vis = " list-group-item " + " hidden ";
		
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
		const ganres = this.state.ganres.map((ganre, index) => 
		{
			return <span className='ganre_title' style={{backgroundColor: ganre.color}} key={"mg_"+ganre.id}>
				{ganre.name}
			</span> 
		});
		const categories = this.state.categories || [];
		return <div className="row">
			<div className="col-12" >
				<ul className="list-group list-group-flush">
					<li className="list-group-item transparent">
						<div className="row m-0">
							<div className="col-md-4 col-sm-4 critery_cell2">
								{__( "Content:") }
							</div>
							<div 
								className="col-md-8 col-sm-8 critery_cell2"
								dangerouslySetInnerHTML={{ __html : this.state.content }}
							/>  
						</div>
					</li>
					<li className="list-group-item transparent">
						<div className="row m-0">
							<div className="col-md-4 col-sm-4  critery_cell2">
								<span className="ml-3">
									{ __('Ganres:') }
								</span>  
								<div className="mt-3">
									{ ganres }
								</div>
							</div>
							<div className="col-md-8 col-sm-8 critery_cell2 lead">
								{ cardIcons }
							</div>
						</div>
					</li>
					<li className="list-group-item transparent">
						<div className="row m-0">
							<div className="col-md-4 col-sm-4 critery_cell2">
								{__("Socials:")}
							</div>
							<div className="col-md-8 col-sm-8 critery_cell2 justify-end">
								{socials}
							</div>
						</div>
					</li>
					<li className="list-group-item transparent">
						<div className="row m-0">
							<div className="col-md-4 col-sm-4  critery_cell2">
								{__("Valuations:")}
							</div>
							<div className="col-md-8 col-sm-8 critery_cell2 lead justify-end">
								<strong>{this.state.rait}</strong>
							</div>
						</div>
					</li>
					<li className={raiting_vis}>
						<div className="row m-0">
							<div className="col-md-4 col-sm-4 critery_cell2">
								{__( "Raiting:") }
							</div>
							<div className="col-md-8 col-sm-8 critery_cell2 lead justify-end">
								<strong>{this.state.r2}</strong>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	}
	
}
export default compose(
	withRouter
)(FestMemberData);