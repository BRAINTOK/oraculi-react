import React, {Component, Fragment} from "react";
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
import MediaChooser from "../../layouts/utilities/MediaChooser";

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
import TextEditor from "../../layouts/utilities/TextEditor";
import WPFestSettings from "./utilities/WPFestSettings";

class FestMemberDuary extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...props,
			post_title:"",
			post_content:""
		} 
	} 
	
	render()	
	{  
		
		const posts = this.state.diary.length > 0
			?
			this.state.diary.map(elem => (
				<div className="row" key={elem.id}>
					<div className="col-12">
						<div className="diary_post mt-2">
							<div className="diary_thumbnail">
								<img src={ elem.thumbnail} alt='' />
							</div>
							<div className="diary_title">
								{elem.post_title}
							</div>
							<div className="diary_body"
								dangerouslySetInnerHTML={{ __html : elem.post_content }}
							/>
							<div className="diary_footer">
								<span> <i className="fas fa-clock" 	style={{opacity:0.5}}></i> {elem.post_date} </span>
								<span> <i className="fas fa-user"	style={{opacity:0.5}}></i> {elem.post_author} </span>
								<a 
									onClick={this.onMemberClick} 
									data-fmru_type="fmru_player"
									data-args={elem.prid}
								> 
									<i className="fas fa-folder"	style={{opacity:0.5}}></i> {elem.diary} 
								</a>
							</div>
						</div>
					</div>
					<div className="spacer-30"/>
				</div>
			))
			:
			<div className="alert alert-secondary">
				{__("Diary is empty")}
			</div>
		const isertBtn = this.props.is_member
			?
			<Fragment>
				<div>
					<span className="title lead mb-2 pointer arrow-down pr-5" onClick={this.onCollapse}>
						{__("Insert new Post")}
					</span>
				</div>
				<Collapse isOpen={this.state.isCollapseOpen} className="w-100 mt-2" transitionDuration={1400}>
					<div className="row diary_footer">
						<div className="col-md-4 col-sm-4  critery_cell2">
							{__("Title")}:
						</div>
						<div className="col-md-8 col-sm-8 critery_cell2 px-2">
							<input 
								value={this.state.post_title}
								onChange={this.onTitle}
								className="input dark form-control"
								placeholder={__("Insert post title")}
							/>
						</div>
						<div className="col-md-4 col-sm-4  critery_cell2">
							{__("Thumbnail")}:
						</div>
						<div className="col-md-8 col-sm-8 critery_cell2 px-2">
							<MediaChooser
								prefix={"_post_thumbnail_"}
								url={this.state.thumbnail}
								id={""}
								ID={""}
								padding={5}
								height={120}
								onChange={this.onThumbnail}
							/>
						</div>  
						<div className="col-md-4 col-sm-4  critery_cell2">
							{__("Content")}:
						</div>
						<div className="col-md-8 col-sm-8 critery_cell2 px-2">
							<TextEditor
								onChange={this.onContent} 
								text={this.state.post_content }
								placeholder={__("Insert post content")}
							/>
						</div>  
						<div className="col-md-8 offset-md-4 col-sm-8  offset-sm-4 critery_cell2 px-2">
							<div className="btn btn-primary btn-large" onClick={this.insert_diary}>
								{__("Insert post")}
							</div>
						</div>				
					</div>				
				</Collapse>
			</Fragment>
			:
			null;
			
		return <div className="row mt-5 mx-1">
			<div className="container ">
				{isertBtn}
				{posts}
			</div>
		</div>
	}
	insert_diary = () =>
	{
		_fetch( 
			"insert_diary", 
			{
				mid 			: this.props.id, 
				title 			: this.state.post_title,
				content 		: this.state.post_content,
				thumbnail 		: this.state.thumbnail,
				thumbnail_name 	: this.state.thumbnail_name,
				is_private 		: 0,
			},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
			.then(data => 
			{
				//console.log( data );
				this.setState({ 
					diary : data.member.diary, 
					post_title : "", 
					post_content : "", 
					thumbnail : "", 
					thumbnail_name : "", 
					isCollapseOpen:false 
				});
			});
	}
	onThumbnail = (value, file) =>
	{
		this.setState({
			thumbnail:value,
			thumbnail_name: file.name
		});
	}
	onCollapse = () =>
	{
		this.setState({isCollapseOpen : !this.state.isCollapseOpen});
	}
	onContent = text =>
	{
		this.setState({post_content:text});
	}
	onTitle= evt =>
	{
		const title = evt.currentTarget.value;
		this.setState({ post_title: title });
		//this.fetch("post_title", title);
	}
}
export default compose(
	withRouter
)(FestMemberDuary);