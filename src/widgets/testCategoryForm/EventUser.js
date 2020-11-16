import React, {Component, Fragment} from "react";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo"; 
import gql from "graphql-tag";
import EventUserUser from "./EventUserUser"; 
import $ from "jquery";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";

class EventUser extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...props,
			users	: [],
			selected 	: null,
			loading  	: true,
			added		: [],
			deleted		: []
		};
	}
	refresh()
	{ 
		const test_id = '"' + this.props.id + '"';
		let query = gql`
			query getEventRequests
			{
					getEventRequests(paging:{
					event:[${test_id}]
				})
				{
					user
					{
						id
						display_name
						user_email
					}
				}
			}
		`;  
		this.props.client.query( { query: query, variables:{id : test_id } })
			.then(result  => 
				{
					console.log( result.data.getEventRequests[0].user ); 
					this.setState({
						users : result.data.getEventRequests[0].user,
						loading:false
					})
				}
			) 
	}
	componentDidMount()
	{ 
		this.refresh();
	}
	render()
	{
		if(this.state.loading)
			return <Loading />
		
		let users; 
		if(this.state.users)
		{
			users = this.state.users.length > 0 
				?
				this.state.users
					.map((e,i) =>
					{ 
						return <EventUserUser
							key={ i }
							{ ...e }
							event_id={ this.props.id }
							onAccept={this.onReload}
							onRefuse={this.onReload}
						/>
					})
				:
				<div className="alert alert-secondary">
					{ __( "no requests exists" ) }
				</div>
		} 
		return <div className="row"> 
				<div className="col-md-3">
				
				</div>
				<div className="col-md-9">
					<Link
						to={this.props.parent_route }
						className="btn btn-link"
					>
						{ __( "edit Event" ) }
					</Link>
				</div> 
				<div className="col-md-3 layout-label"> 
					{ __( "Event requests" ) }
				</div>
				<div className="col-md-9 ">
					{users}
				</div>
				<div className="col-md-3 hidden">
					
				</div>
				<div className="col-md-9 hidden">
					<Button className="ml-2 my-2" onClick={this.onInsertQuestion} icon="plus" /> 
				</div>
			</div>
	}
	onReload = () =>
	{		
		this.props.onRefresh();
		return;
	}
	onSwitchUp = data =>
	{
		let users = [...this.state.users], selected;
		this.state.users.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = users.splice(i, 1);
				users.splice(i-1, 0, me[0]); 
			}
		});		
		$(".question").removeClass("active"); 
		this.setState({users, selected : data}, ()=> $("#" + data).addClass("active"));
		if(this.props.onChange)
			this.props.onChange(["users", users.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onSwitchDn = data =>
	{
		let users = [...this.state.users], selected;
		this.state.users.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = users.splice(i, 1);
				users.splice(i+1, 0, me[0]); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({users, selected : data }, ()=> $("#" + data).addClass("active"));
		if(this.props.onChange)
		this.props.onChange(["users", users.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onInsertQuestion = () =>
	{
		let users = [...this.state.users], selected;
		const newId = this.state.users.length.toString();
		users.push({
			post_title : "",
			id: newId,
			saved:false,
			isNew:true
		});
		$(".question").removeClass("active");
		this.setState({
			users, 
			selected : newId 
		} );
		if(this.props.onChange)
			this.props.onChange(["users", users.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onAddQuestion = data =>
	{
		let users = [...this.state.users], selected;
		const newId = this.state.users.length.toString();
		this.state.users.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = {
					post_title : "",
					id: newId,
					saved:false,
					isNew:true
				};
				users.splice( i + 1, 0, me ); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({
			users, 
			selected : newId 
		} );
		if(this.props.onChange)
			this.props.onChange(["users", users.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onSwitchOrder = data =>
	{
		let users = [...this.state.users], selected;
		this.state.users.forEach((e,i) => 
		{
			if(e.id == data[0])
			{
				const me = users.splice(i, 1);
				users.splice(data[1], 0, me[0]); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({users, selected : data[0] }, ()=> $("#" + data[0]).addClass("active"));
		if(this.props.onChange)
			this.props.onChange(["users", users.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	changeQuestion = data =>
	{
		let users = [...this.state.users], me;
		this.state.users.forEach((e,i) => 
		{
			if(e.id == data[0])
			{
				me = users.splice(i, 1, data[1]); 
			}
		});		
		// console.log("added:", 	[ ...this.state.added, data[1] ] );
		let deleted =  me[0].isNew ? this.state.deleted : [...this.state.deleted, me[0]]
		let added = [...this.state.added, data[1]]; 
		$(".question").removeClass("active");
		this.setState( 
			{ 
				users, 
				selected	: data[1].id, 
				deleted		: deleted, 
				added		: added 
			}, 
			()=> $( "#" + data[1].id ).addClass("active") 
		);
		if(this.props.onChange)
			this.props.onChange(["users", users.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onDelete = data =>
	{
		let users = [...this.state.users], me;
		this.state.users.forEach((e,i) => 
		{
			if(e.id == data )
			{
				me = users.splice(i, 1);
			}
		});		
		$(".question").removeClass("active");
		this.setState( 
			{ 
				users, 
				selected 	: -1,
				deleted		: me[0].isNew ? this.state.deleted : [...this.state.deleted, me[0]]
			} 
		);
		if(this.props.onChange)
			this.props.onChange(["users", users.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
}
export default compose(
	withApollo,
	withRouter
)(EventUser)