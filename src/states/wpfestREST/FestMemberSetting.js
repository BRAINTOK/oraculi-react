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
import GanreCheckBoxList from "./GanreCheckBoxList";
import TextEditor from "../../layouts/utilities/TextEditor";
import MediaChooser from "../../layouts/utilities/MediaChooser";
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

class FestMemberSetting extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...props,
			img 		: this.props.img,
			img_name 	: this.props.img_name,
			isEdited : this.props.isNew
		} 
	} 
	componentWillUnmount()
	{
		clearTimeout(this.content);
		clearTimeout(this.soc);
	}
	render()	
	{  
		//console.log(this.state);
		const socs = [
			{name	: "vk_url", 		t:"vk"},
			{name	: "youtube_url", 	t:"youtube"},
			{name	: "fb_url",			t:"facebook"},
			{name	: "instagramm_url",	t:"instagram"},
		]
			.map((e, i) =>
			{
				return <div className="input-group mb-1" key={i}>
					<div className="input-group-prepend">
						<span className="input-group-text" >
							<i className={"fab lead fa-"+e.t } />
						</span>
					</div>					
					<input 
						name={e.name}
						value={this.state[e.name]}
						onChange={this.onSocs}
						className="input dark form-control"
					/>
				</div>
			});
		const content = this.state.isEdited
			?
			<TextEditor onChange={this.onContent} text={this.state.content}/>
			:
			<Fragment>
				<div 
					className=" mcontent" 
					dangerouslySetInnerHTML={{ __html : this.state.content }}
				/>
				<div className=" px-4">
					<div className="btn btn-primary " onClick={this.onEdit}>
						{__("Edit")}
					</div>
				</div>
			</Fragment>
		return <div className="row">
			<div className="col-12" > 
					<div className="row data-list"> 
							<div className="col-md-4 col-sm-4 test-descr-title  my-auto">
								{__("Title")}:
							</div>
							<div className="col-md-8 col-sm-8 pt-2">
								<input 
									value={this.state.title}
									onChange={this.onTitle}
									className="input dark form-control"
									placeholder={__("insert title")}
								/>
							</div> 
					</div>
					<div className="row data-list"> 
							<div className="col-md-4 col-sm-4 test-descr-title  my-auto">
								{__("Thumbnail")}:
							</div>
							<div className="col-md-8 col-sm-8 pt-2">
								<MediaChooser
									prefix={"_post_thumbnail_"}
									url={this.state.img}
									id={""}
									ID={""}
									padding={5}
									height={120}
									onChange={this.onThumbnail}
								/>
							</div> 
					</div>
					<div className="row data-list"> 
							<div className="col-md-4 col-sm-4 test-descr-title  my-auto2">
								{__("Description")}:
							</div>
							<div className="col-md-8 col-sm-8 p-2">
								{content}
							</div> 
					</div>
					<div className="row data-list"> 
							<div className="col-md-4 col-sm-4 test-descr-title  my-auto">
								<span className="ml-3">
									{ __('Ganres:') }
								</span>    
							</div>
							<div className="col-md-8 col-sm-8 p-2 lead">
								<GanreCheckBoxList
									ganres={this.state.all_ganres.map((e,i) =>
										{
											e.check = this.props.isNew
												?
												0
												:
												this.state.ganres.filter(ee => ee.id == e.id).length > 0
													?
													1
													:
													0
											return e;
										})
									}
									ignore={ [] }
									name="my_ganres"
									onGanre={this.onGanre}
								/> 
						</div>
					</div>
					<div className="row data-list"> 
							<div className="col-md-4 col-sm-4 test-descr-title  my-auto">
								{__("Socials:")}
							</div>
							<div className="col-md-8 col-sm-8 p-2">
								{socs}
							</div> 
					</div>
					{
						this.props.isNew
							?
							null
							:
							<div className="row data-list"> 
									<div className="col-md-4 col-sm-4 test-descr-title  my-auto">
										{__("Valuations:")}
									</div>
									<div className="col-md-8 col-sm-8 p-2 lead">
										<strong>{this.state.rait}</strong>
									</div> 
							</div> 
					}
			</div> 
		</div>
	}
	onThumbnail = (value, file) =>
	{
		this.setState({
			img:value,
			img_name: file.name
		});
		if( !this.props.isNew )
		{
			_fetch( 
				"update_project_fields", 
				{ 
					id 		: this.props.id, 
					fields	: [
						{ field:"thumbnail",  value:value },
						{ field:"thumbnail_name",  value:file.name }
					]
						
				},
				WPFestSettings.url,
				WPFestSettings.token,
				"get_main"
			)
				.then(data => 
				{
					//console.log( data );
				});
		}
		else if(this.props.ons)
		{
			this.props.ons( { 
				id : this.props.id, 
				fields	: [
					{ field:"thumbnail",  value: value },
					{ field:"thumbnail_name",  value:file.name }
				]
					
			} );
		}
	}
	onGanre = ganres =>
	{
		if(this.props.onGanre)
			this.props.onGanre(ganres); 
		this.fetch( "fmru_group_player", ganres );
	}		
	onSocs = evt =>
	{
		let state = {};
		const name = evt.currentTarget.getAttribute("name");
		const value = evt.currentTarget.value;
		state[name] = value;
		this.setState( state );
		
		this.soc = setTimeout(() =>
		{
			clearTimeout(this.soc);
			this.fetch( name, value ); 
		}, 2000);
	}
	onContent = data =>
	{
		this.setState({content:data});
		this.content = setTimeout(() =>
		{
			clearTimeout(this.content); 
			this.fetch( "post_content", data );
		}, 2000);
	}
	onEdit = () =>
	{
		this.setState({ isEdited:!this.state.isEdited });
	}
	onTitle = evt =>
	{
		const title = evt.currentTarget.value;
		this.setState({ title: title });
		this.fetch("post_title", title);
	}
	fetch = (field, value) =>
	{
		if( !this.props.isNew )
		{
			_fetch( 
				"update_project_field", 
				{ id : this.props.id, field, value },
				WPFestSettings.url,
				WPFestSettings.token,
				"get_main"
			)
				.then(data => 
				{
					//console.log( data );
				});
		}
		else if(this.props.on)
		{
			this.props.on( { id : this.props.id, field, value } );
		}
	}
}
export default compose(
	withRouter
)(FestMemberSetting);