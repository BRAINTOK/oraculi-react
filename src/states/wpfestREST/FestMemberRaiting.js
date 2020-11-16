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
import CriteryUniqList from "./CriteryUniqList";
import icon1 from "../../assets/img/test.svg";
import {socialLikes} from "social-likes"; // http://social-likes.js.org/ru/
import $ from "jquery";
import Loading from "../../layouts/utilities/Loading";
import ExpertDescriptions from "./ExpertDescriptions";
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

class FestMemberRaiting extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...props
		} 
	} 
	componentDidMount()
	{
		this.ticker = setInterval(() =>
		{
			_fetch( 
			"fmru_player", 
			{id : this.props.id},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
				.then(data => 
				{
					//console.log( data );
					this.setState({
						r2: data.r2,
						expert_descr: data.expert_descr,
						categories: data.categories,
						uniqs: data.uniqs,
						aut_criteries: data.aut_criteries,
						...data.member,
						loading:false
					});
					$('#share').socialLikes();
				});
		}, 2000)
	}
	componentWillUnmount()
	{
		clearInterval(this.ticker);
	}
	render()	
	{  
		const articleElements = this.state.experts.map(( expert ) => expert.display_name );
		const experts = articleElements.length> 0 ? (
			<div className=" transparent">
				<div className="row mt-3">
					<div className="col-md-4 test-descr-title">
						{__("Experts, who put raiting:")}
					</div>
					<div className="col-md-8 ">
						<div className="font-weight-bold">{ articleElements.join(", ") }</div>
					</div>
				</div>
			</div> )  : "";
		const ganres = this.state.ganres.map((ganre, index) => 
		{
			return <span className='ganre_title' style={{backgroundColor: ganre.color}} key={"mg_"+ganre.id}>
				{ganre.name}
			</span> 
		});
		const categories = this.state.categories || [];
		const expert_descr = this.state.expert_descr || [];
		const {aut_criteries, uniqs} = this.state;
		return <div className="row">
			<div className="col-12">
				<div>
					{ experts }
				</div>
				<CategoryList
					categories={ categories }
					r2={this.state.r2}
					max_raiting={ this.state.max_raiting || 5 }
					user={this.props.user}
					member_id={this.props.id}
				/>
				<CriteryUniqList
					categories={ categories }
					uniqs={uniqs}
					max_raiting={ this.state.max_raiting || 5 }
					user={this.props.user}
					member_id={this.props.id}
				/>
				
				<ExpertDescriptions
					data={expert_descr}
					member_id={this.props.id}
					denabled={this.props.denabled}
					user={this.props.user}
				/>
			</div>
		</div>
	}
	
}
export default compose(
	withRouter
)(FestMemberRaiting);