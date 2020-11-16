import React, {Component} from "react";
import Jitsi from "./Jitsi";
import AvatarChooser from "./AvatarChooser";
import { AnchorButton, Button, Classes, Dialog, Intent, Tooltip, Callout } from "@blueprintjs/core";
import {__} from "../../layouts/utilities/i18n";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import {withRouter} from "react-router";
import { graphql, compose, withApollo, Query } from 'react-apollo';



class Translation extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			avatar : this.props.user && this.props.user.avatar ? this.props.user.avatar : "/assets/img/user1.svg",
			display_name:this.props.user ? this.props.user.display_name : null,
			user:this.props.user || {},
			translation: this.props.translation ,
			is_locked: true
		}
	}
	componentWillUpdate(nextProps)
	{
		if(nextProps.translation != this.state.translation)
		{ 
			this.setState( { 
				translation : nextProps.translation,
				is_locked 	: nextProps.translation.current != this.state.translation.current,
				descr		: "",
				password	: ""
			} );
		}
	}
	render()
	{ 
		//console.log( this.state.is_locked );
		const currr = this.state.translation.pe_room.filter(e => e.external_id == this.state.translation.current);
		let is_locked = false;
		if(currr.length > 0)
		{
			is_locked = currr[0].is_locked && this.state.is_locked;
		}
		return this.state.user.display_name 
			?
			<div className="translation-screen" id={this.props.id}>
			{
				is_locked
					?
					<div className="card p-5">
						<div className="text-center title">
							{__("Insert password")}
						</div>
						<input type="password" value={this.state.password} onChange={this.onPassword} className="form-control my-3"/>
						<Button text={__("Enter")} onClick={this.onEnter} />
						<div className="text-danger text-center small mt-2"> 
							{this.state.descr}
						</div>
					</div>
					:
					<Jitsi 
						user={this.state.user} 
						translation={ this.getTranslation( this.state.translation ) }  
						onLeave={this.onLeave}
						onChange={this.onChange}
						onJoin={this.onJoin}
						participantJoined={this.participantJoined}
						participantKickedOut={this.participantKickedOut}
						participantLeft={this.participantLeft}
						feedbackSubmitted ={this.feedbackSubmitted }
						height={this.props.height}
						containerStyle={this.props.containerStyle}
					/>
			}
			</div>
			:
			<div className="translation-screen" id={this.props.id}>
				<div className="title ">
					{__("How you call?")}
				</div>
				<div className="form-group justify-content-center d-flex align-items-center my-4">
					<label className="exampleInputEmail1 mr-3 mb-0">
						{__("Name")}
					</label>
					<input
						type="text"
						className="form-control"
						placeholder={__("Name")}
						value={this.state.display_name}
						onChange={this.onName}
					/>
				</div>
				<div className=" my-4">
					<label className="exampleInputEmail1 mr-3 mb-0">
						{__("Avatar")}
					</label>
					<AvatarChooser onChoose={this.onAvatar}/>
				</div>
				<div className="justify-content-center d-flex ">
					<Button onClick={this.onEnterName}>
						{__("Enter")}
					</Button>
				</div>
			</div>
	}
	onPassword = evt =>
	{
		this.setState({ password : evt.currentTarget.value });
	}
	onEnter = () =>
	{
		const currr = this.state.translation.pe_room.filter(e => e.external_id == this.state.translation.current);
		//console.log(this.state.password, currr[0].password, this.state.password == currr[0].password);
		if(currr.length < 1 ) 
		{
			this.setState({ descr : "No right!" });
		}
		if(this.state.password == currr[0].password)
		{
			this.setState({ is_locked : false });
		}
		else
		{
			this.setState({ descr : "No right!" });
		}
	}
	onName = (e) => this.setState({display_name: e.currentTarget.value}) 
	onAvatar = avatarUrl => 
	{
		this.setState( {avatar: avatarUrl} ) ;

	}		
	onEnterName = () =>
	{
		if(this.state.display_name)
		{
			//console.log( this.state.avatar );
			this.setState({ user: { display_name:this.state.display_name, avatar:this.state.avatar } });
		}
		else
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick",
				className: " ",
				message: __("Name field not be empty")
			});
	}
	
	getTranslation = data =>
	{
		let translaton = {...data}; 
		return translaton;
	}
	onLeave = evt =>
	{
		//console.log('onLeave');
		//this.props.history.push("/translations");
		if(this.props.onLeave)
			this.props.onLeave( evt );
	}
	onChange = (name, data) =>
	{
		//console.log('onChange');
		//this.props.history.push("/translations");
		if(this.props.onChange)
			this.props.onChange( name, data );
	}
	onJoin = data =>
	{
		if(this.props.onJoin)
			this.props.onJoin(data);
	}
	participantJoined = data =>
	{
		if(this.props.participantJoined)
			this.props.participantJoined(data);
	}
	participantKickedOut = data =>
	{
		if(this.props.participantKickedOut)
			this.props.participantKickedOut(data);
	}
	participantLeft = data =>
	{
		if(this.props.participantLeft)
			this.props.participantLeft(data);
	}
	feedbackSubmitted  = data =>
	{
		if(this.props.feedbackSubmitted)
			this.props.feedbackSubmitted (data);
	}
}
export default compose(
	withRouter
)(Translation);