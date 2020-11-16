import React, {Component, Fragment} from "react";
import { AnchorButton, ButtonGroup, Button, Classes, Dialog, Intent, Tooltip, Callout, Collapse } from "@blueprintjs/core";
import { __ } from "../layouts/utilities/i18n";
import getWidget, { initArea } from "../layouts/utilities/getWidget"; 
import $ from "jquery";
import {isRole} from "../layouts/user";

class TranslationPult extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			current		: this.props.translation.pe_room && this.props.translation.current 
				? 
				this.props.translation.current 
				: "dfrhth",
			pe_room		: this.props.translation.pe_room || [ ],
			isOpen		: false,
			newHide		: false,
			newJump		: false,
			psw			: "",
			newTitle 	: "" 
		}
	} 
	componentWillUpdate(nextProps)
	{
		if( 
				nextProps.translation.pe_room != this.state.pe_room 
			|| 	nextProps.translation.current != this.state.current
		)
		{
			let state = { };
			if(nextProps.translation.pe_room != this.state.pe_room)
			{
				state.pe_room = nextProps.translation.pe_room;
			}
			if(nextProps.translation.current != this.state.current)
			{
				//console.log( nextProps.translation.current, this.state.current );
				state.current = nextProps.translation.current;
			}
			this.setState( state );
		}
	}
	render()
	{
		//console.log( this.props.translation );
		const pe_room = this.state.pe_room
			?
			<ButtonGroup vertical={true} fill={true}>
			{
				this.state.pe_room.map((e,i) =>
				{
					const isCurrent = this.state.current == e.external_id;
					let upr;
					if(isCurrent)
					{
						const members = e.members.map((ee, ii) =>
						{
							const moder = ee.moderator
							?
							<div className="moder-label" title={__("Room Moderator")}>
								M
							</div>
							:
							null;
							const admin = ee.admin
							?
							<div className="admin-label" title={__("Translation Administrator")}>
								A
							</div>
							:
							null;
							return <div className="room-member" key={ii} member-id={ee._id} >
								<div className="d-flex align-items-center justify-content-start">
									<div className="avatar" style={{backgroundImage:"url(" + ee.avatar + ")"}}>
										{admin}
										{moder}
									</div>
									<div 
										className={(this.props.translation.me == ee._id ? "text-danger " : "") + "member-name"}
									>
										{ee.name}
										<div className="room-member-pult">
										{
											initArea(
												"room-member", 
												{ 
													...this.props, 
													room:e, 
													member:ee
												}
											) 
										}
										</div>
									</div>									
								</div>
							</div>
						});
						upr = <div className="room-upr animated animation-opened p-3 ">
							<div className="">
								{__("Members")}: 
							</div>
							{members}
							{
								initArea(
									"room", 
									{ 
										...this.props, 
										room:e
									}
								) 
							}
						</div>
					}
					const memberLabel = isCurrent
						?
						<span className="members-col">
							{e.members ? e.members.length : null}
						</span>
						:
						null;
					return <div key={i} className="border-bottom" >
						<Button
							intent={ isCurrent ? Intent.PRIMARY : Intent.SECONDARY }
							className={ "transition-300 justify-content-space-between pl-3 pr-5 pe-room-btn" }
							fill={ true }
							minimal={ !isCurrent }
							large={ true }
							onClick={() => this.onClick( e.external_id ) }
							icon={e.is_locked ? "lock" : null}
						>
							{e.post_title} 
							{memberLabel}
						</Button>
						{upr}
					</div>
				})
			}
			</ButtonGroup>
			:
			null;
		const new_btn = isRole("administrator", this.props.user)
			?
			<Fragment>
				<Button 
					fill={true}
					text={__("Create room")}
					minimal={true}
					intent={Intent.SUCCESS}
					onClick={this.onOpen}
				/> 
			</Fragment>
			:
			null;
		return <div>
			<div className="widget-title">
				{__("Rooms")}:
			</div>
			<div>
				{pe_room}
			</div>
			<div className="mt-3">
				{new_btn}
			</div>
			<Dialog
				title={__("Insert new Room Parameters")}
				isOpen={this.state.isOpen}
				onClose={this.onOpen}
				className="maxw-550"
			>
				<div className="p-4"> 
					<div className="row">
						<div className="col-md-5 d-flex align-items-center  justify-content-end">
							{__("Title")}
						</div>
						<div className="col-md-7">
							<input 
								type="text"
								onChange={this.onTitle}
								value={this.state.newTitle}
								className="form-control input dark"
							/>
						</div>
						<div className="col-md-5 d-flex align-items-center  justify-content-end">
							{__("Hide by password?")}
						</div>
						<div className="col-md-7  mb-4">
							<input 
								type="checkbox"
								onChange={this.onHide}
								value={this.state.newHide}
								className="checkbox"
								id="newHide"
							/>
							<label htmlFor="newHide"></label>
						</div>
					</div>
					<Collapse className="overflow-hidden" isOpen={this.state.newHide}>	
						<div className="row">
							<div className="col-md-5 d-flex align-items-center  justify-content-end">
								{__("Password")}
							</div>
							<div className="col-md-7  mb-4">
								<input 
									type="password"
									onChange={this.onPsw}
									value={this.state.psw}
									className="form-control input dark"
									id="psw"
								/> 
							</div>
						</div>
					</Collapse>
					<div className="row">	
						<div className="col-md-5 d-flex align-items-center  justify-content-end">
							{__("Jump to Room after creation?")}
						</div>
						<div className="col-md-7  mb-4">
							<input 
								type="checkbox"
								onChange={this.onJump}
								value={this.state.newJump}
								className="checkbox"
								id="newJump"
							/>
							<label htmlFor="newJump"></label>
						</div>
						<div className="col-md-7 offset-md-5 mt-5">
							<Button	
								onClick={this.onNew}
							>
								{__("Insert new Room")}
							</Button>
						</div>
					</div>
				</div>
			</Dialog>
		</div>
	}
	onClick = id =>
	{ 
		this.props.onToggle(id);
	}
	onTitle = evt =>
	{
		this.setState({newTitle:evt.currentTarget.value});
	}
	onHide = evt =>
	{
		this.setState( {newHide:!this.state.newHide} );
	}
	onPsw = evt =>
	{
		this.setState( {psw : evt.currentTarget.value } );
	}
	onJump = evt =>
	{
		this.setState({newJump:!this.state.newJump});
	}
	onOpen = evt =>
	{
		this.setState({
			newTitle : __("Room ") + (this.state.pe_room.length + 1),
			isOpen:!this.state.isOpen
		});
	}
	onNew = () =>
	{ 
		this.props.onNew( {
			title	: this.state.newTitle,
			isHidden: this.state.newHide,
			psw		: this.state.psw,
			isJump	: this.state.newJump
		} );
	} 
}
export default TranslationPult;