import React, {Component, Fragment} from "react";
import ReactDOM from 'react-dom';
import _fetch from "../";   

import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../../layouts/utilities/i18n";
import Loading from "../../../layouts/utilities/Loading";
import LayoutIcon from "../../../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../../../layouts/utilities/getWidget";
import getWidgets from "../../../layouts/utilities/getWidgets";
import {sprintf} from "../../../layouts/utilities/sprintf";
import {concatRouting, mainPage, routeData, routing} from "../../../layouts/routing";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../../../layouts/utilities/blueUtils";
import WPFestSettings from "./WPFestSettings";


class UserSearchForm extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			value : this.props.value || "",
			old_value : this.props.value || "",
			selectedUser:this.props.selectedUser || {},
			isOpen:false,
			searchResults: []
		}
	}
	componentDidMount() 
	{
		//document.body.addEventListener('click', this.onMouseLeaveHandler);
	}
    componentWillUnmount() 
	{
		//document.body.removeEventListener('click', this.onMouseLeaveHandler);
	}
	onMouseLeaveHandler = e =>
	{	
		const domNode = ReactDOM.findDOMNode(this);
		if (!domNode || !domNode.contains(e.target))	
		{
			this.setState({
				isOpen: false, 
				value: this.state.old_value
			});
		}
	}
	
	render()
	{
		const style = this.state.selectedUser.display_name == this.state.value
			?
			{}
			:
			{color:"#FF0000"}
		const descr = this.state.value 
			?
			null
			:
			<div className="small d-flex align-items-center opacity_5">
				{__("Insert letters to start search with display name")}
			</div>;
		const search = this.state.value 
			?
			<div className="btn btn-light btn-sm mb-1 ml-1 rounded-0" onClick={this.onSearch}>
				<Icon icon="search" title={__("search")}/>
			</div>
			:
			null;
		const clear	= this.state.selectedUser.id 
			?
			<div className="btn btn-light btn-sm mb-1 ml-1 rounded-0" onClick={this.onDialog}>
				<Icon icon="small-cross" title={__("clear")}/>
			</div>
			:
			null
		return <div className="d-inline-flex position-relative w-100">
			<Popover
				isOpen={this.state.isOpen}
				position={Position.BOTTOM}
				className="w-75"
				content ={
					<ul className="list-group list-group-flush pointer">
						{ this.searchResults() }
					</ul>
				}
			>
				<input 
					type="text"
					className="input dark py-2 w-100"
					style={style}
					value={this.state.value}
					onChange={this.onValue}
				/>
			</Popover>
			<div className="w-50 ml-2 d-flex align-items-center">
				{search}
				{clear}
				{descr}
			</div>
			<Dialog
				isOpen ={this.state.isDialog}
				title={__("Are you shure?")}
				onClose={this.onDialog}
				className="little" 
			>
				<div className="p-4">
					<div 
						className="mb-4" 
						dangerouslySetInnerHTML={{ 
							__html:  
							sprintf( __("Remove %s from team?"), "<b>" + this.state.value + "</b>" )
						}}
					/>
					<ButtonGroup className="">
						<Button intent={Intent.SUCCESS} onClick={this.onClear}>
							{__("Remove")}
						</Button>
						<Button intent={Intent.DANGER} onClick={this.onDialog}>
							{__("Cancel")}
						</Button>
					</ButtonGroup>
				</div>
			</Dialog>
		</div>
	}
	onDialog = () =>
	{
		if( !this.state.value && !this.state.isDialog ) return;
		this.setState({isDialog: !this.state.isDialog});
	}
	onValue = evt =>
	{
		this.setState({value:evt.currentTarget.value, isOpen:false, searchResults: []});
	}
	searchResults = () =>
	{
		return this.state.searchResults.map((e, i) =>
		{
			return <li className="list-group-item" user_id={e.id} key={i} onClick={ () => this.onSelect(e) } >
				{e.display_name}
			</li>
		})
	}
	onSearch = () =>
	{
		if(!this.state.value)
		{
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick",
				duration:10000,
				message: __( "Put not empty sub string." )
			});
			return;
		}
		_fetch( 
			"search_user", 
			{ search : this.state.value },
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
			.then(data => 
			{
				console.log( data );
				if(data.users.length == 0)
				{
					AppToaster.show({
						intent: Intent.DANGER,
						icon: "tick",
						duration:10000,
						message: __( "No users with this substring in display name." )
					});
					return;
				}
				this.setState({searchResults:data.users, isOpen:true});
			})
	}
	onSelect = user =>
	{
		this.setState(
			{ 
				selectedUser 	: user,	
				value 			: user.display_name,
				old_value 		: user.display_name, 
				isOpen			: false
			}
		);
		if(this.props.on)
			this.props.on(user, this.props.role);
	}
	onClear = () =>
	{
		this.setState(
			{ 
				selectedUser 	: {},	
				value 			: "",
				old_value 		: "", 
				isOpen			: false,
				isDialog		: false
			}
		);
		if(this.props.on)
			this.props.on({}, this.props.role);
	}
}
export default UserSearchForm;