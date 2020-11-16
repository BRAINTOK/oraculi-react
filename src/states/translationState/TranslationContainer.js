import React, {Component, Fragment} from "react";
import BasicState from "../../layouts/BasicState";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import { graphql, compose, withApollo, Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Moment from 'react-moment';
import moment from 'moment';
import $ from "jquery";
import gql from "graphql-tag";
import {withRouter} from "react-router";
import { NavLink } from 'react-router-dom'; 
import { ButtonGroup, Button, Classes, Dialog, Intent, Tooltip, Callout } from "@blueprintjs/core";
import getWidget, { initArea } from "../../layouts/utilities/getWidget";
import Translation from "../translationState/Translation";
import source from "../../config/source.json";
import translitterate from "../../layouts/utilities/translitterate";
import getJitsiExternalId from "./getJitsiExternalId";

import {
	getChangeName,
	getInputTypeName,
	getMutationArgs,
	getQueryArgs,
	getQueryName, mutationEdit,
	queryCollection,
	queryCollectionFilter,
	querySingleName,
	querySingle
} from "../../layouts/schema";


class TranslationContainer extends Component
{
	
	constructor(props)
	{
		super(props);
		let translation = { ...this.props.translation };
		translation.pe_room = translation.pe_room.map(e => {
			e.members = [];
			return e;
		});
		translation.current = Array.isArray(translation.pe_room) && translation.pe_room.length > 0
			? 
			translation.pe_room[0].external_id
			:
			"";
		this.state = {
			translation, 
			isDescrOpen : false
		} 
	}
	render()
	{
		const {translation} = this.state;
		//console.log( translation );
		return <div className="row mt-4">	
			<div className="col-md-3">
				<h1>
					{translation.post_title || __("New Translation")}
				</h1>
				<div 
					dangerouslySetInnerHTML={{ __html: translation.post_content }} 
					id="transl_descr"
					className={this.state.isDescrOpen ? "small translation-descr open" : "small translation-descr "}
					onClick={this.onDecrOpenToggle}
				/>
				<ButtonGroup>				
				{
					initArea(
						"translation-menu",
						{ 
							...this.props, 
							translation	: translation,
							onDelete	: this.onTranslatonDelete
						}
					)
				}
				</ButtonGroup>
				{
					initArea(
						"aside-left",
						{ 
							...this.props, 
							translation	: translation,
							onToggle	: this.onToggle,
							onNew		: this.onNew,
							onDelete	: this.onDelete,
							route		: this.props.location.pathname
						}
					)
				}
			</div>
			<div className="col-md-9 m-main">
				<Translation 
					id={ this.props.match.params.id } 
					translation={translation}
					user={this.props.user}
					onJoin={this.onJoin}
					onChange={this.onChange}
					onLeave={this.onLeave}
					participantJoined={this.participantJoined}
					participantKickedOut={this.participantKickedOut}
					participantLeft={this.participantLeft}
					feedbackSubmitted ={this.feedbackSubmitted }
				/>
			</div>
		</div>
	}
	
	onStart = id =>
	{
		this.setState({id} );
	}
	onToggle = ( roomId ) =>
	{
		let translation = {...this.state.translation};
		translation.current = roomId;
		this.setState( { translation } );
		
	}
	onDecrOpenToggle = () =>
	{
		this.setState({isDescrOpen:!this.state.isDescrOpen});
	}
	onJoin = data =>
	{
		//console.log(data);
		let translation = {...this.state.translation};
		translation.pe_room = translation.pe_room.map((e, i) =>
		{
			let members 	= [];
			//console.log( e, data.roomName );
			if( e.external_id === data.roomName ) 
			{
				for(var i in data.participants )
				{
					members.push( data.participants[i] );
				}
			}
			return {
				id			: e.id,
				external_id	: e.external_id,
				is_locked	: e.is_locked,
				password	: e.password,
				post_title	: e.post_title,
				post_author	: e.post_author,
				members		: members
			}
		});
		translation.current = data.roomName;
		translation.me 	= data.id;
		//console.log(translation);
		this.setState({ translation } );
	}
	onNew = data =>
	{
		let translation = {...this.state.translation};
		//console.log("onNew", data, translation);
		//translation.pe_room = translation.pe_room ? translation.pe_room : []; 
		
		const changePE_Room = gql`mutation changePE_Room( $input: PE_RoomInput ) 
		{
			changePE_Room( input: $input ) 
			{ 
				id
				post_title
				post_content
				pe_translation
				{
					id
				}
				external_id
				is_locked
				password
				__typename
			}
		}`;
		let pr = {};
		pr.is_locked 	= data.isHidden;
		pr.post_content = "";
		pr.pe_translation = parseInt(this.props.translation.id);
		pr.post_title	= data.title;
		pr.external_id	= getJitsiExternalId( data.title ); 
		pr.password		= data.psw;
		//console.log( pr, data );				
		this.props.client.mutate({
			mutation: changePE_Room,
			variables: {input:pr},
			update: (store, { data: { changePE_Room } }) =>
			{
				//console.log( changePE_Room ); 
				let translation = {...this.state.translation};
				translation.pe_room.push({
					external_id			: changePE_Room.external_id,
					id					: changePE_Room.id,
					is_locked			: changePE_Room.is_locked,
					password			: changePE_Room.password,
					post_title			: changePE_Room.post_title,
					post_author			: changePE_Room.post_author,
					members		: []
				});
				if(data.isJump)
					translation.current = changePE_Room.external_id;
				//console.log(translation);
				this.setState({ translation } );
			}
		});
		
		
		
	}
	onDelete = data =>
	{
		console.log(data);
		const deletePE_Room = gql`mutation deletePE_Room( $id: String ) 
		{
			deletePE_Room( id: $id ) 
		}`;			
		this.props.client.mutate({
			mutation: deletePE_Room,
			variables: {id:data},
			update: (store, { data: { deletePE_Room } }) =>
			{
				if( deletePE_Room )
				{
					let translation = {...this.state.translation};
					translation.pe_room = translation.pe_room.filter((e, i) => e.id != data )
						.map((e, i) =>
						{
							let members 	= [];
							return {
								id			: e.id,
								external_id	: e.external_id,
								is_locked	: e.is_locked,
								password	: e.password,
								post_title	: e.post_title,
								post_author	: e.post_author,
								members		: members
							}
						});
					translation.current = translation.pe_room.length > 0 ? translation.pe_room[0].external_id : "";
					this.setState({ translation } );
				}
			}
		});
	}
	onTranslatonDelete = data =>
	{
		console.log(data);
		const deletePE_Translation = gql`mutation deletePE_Translation( $id: String ) 
		{
			deletePE_Translation( id: $id ) 
		}`;			
		this.props.client.mutate({
			mutation: deletePE_Translation,
			variables: {id:data},
			update: (store, { data: { deletePE_Translation } }) =>
			{
				this.props.history.push("/");
			}
		});
	}
	
	participantJoined = data =>
	{
		//return;
		let translation = {...this.state.translation};
		console.log("participantJoined", data, translation);
		translation.pe_room = translation.pe_room 
			? 
			translation.pe_room.map(e => 
			{
				console.log("room",  e );
				let members = [...e.members];
				if(e.external_id == data.roomId)
				{
					members.push({
						external_id			: data.id,
						name		: data.formattedDisplayName,
						avatar		: data.avatarURL ? data.avatarURL : "/assets/img/user1.svg"
					});
				}
				e.members = members;
				return e;
			})
			:
			[]
		console.log( translation );
		this.setState({ translation } );
	}
	participantKickedOut = data =>
	{
		console.log("participantKickedOut", data);
		
	}
	participantLeft = data =>
	{
		console.log("participantLeft", data);
		let translation = {...this.state.translation};
		translation.pe_room = translation.pe_room 
			?
			translation.pe_room.map(e => 
			{
				let members = [...e.members];
				if(e.external_id == data.roomId)
				{
					members = members.filter( ee => ee.external_id != data.id )
				}
				e.members = members;
				return e;
			})
			:
			[]
		this.setState({ translation } );
	}
	feedbackSubmitted  = data =>
	{
		console.log("feedbackSubmitted ", data);
	}
	onLeave = data =>
	{
		console.log("onLeave", data);
	}
	onChange = (nm, data) =>
	{
		console.log("onChange", nm, data);
	}
}


export default compose( 
	withApollo,
	withRouter
)(TranslationContainer);