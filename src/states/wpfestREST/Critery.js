import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie} from "./utilities/utils";
import WPFestSettings from "./utilities/WPFestSettings";
import TextArea from "./utilities/TextArea";
import _fetch from "./";
import User from "./utilities/User";
import ExpertCheckList from "./ExpertCheckList";
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


class Critery extends Component
{
	state = {
		description : this.props.descr,
		rating 	: this.props.rating,
		is		: true
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{ 
		let res = nextProps.rating !== this.state.rating; 
		res = res || nextState.is !== this.state.is;
		res = res || nextState.isOpen !== this.state.isOpen;
		res = res || nextState.description !== this.state.description;
		return res;
	}
	componentWillUpdate(nextProps, nextState)
	{
		if(nextState.description !== this.state.description)
			this.setState({ 
				description	: nextState.description 
			})
	}
	
	render()
	{   
		const { onItemClick, title, max_raiting, id, member_id } = this.props; 
		const { rating, description } = this.state; 
		const is_expert = this.props.user.roles.filter(e => e == "Expert").length > 0 //&& FmRUPhase.phase == 2;
		
		const _description = is_expert 
			? 
			<div className="text-secondary font-weight-light ">
				<span className="description mr-3">
					{__("Your description:")}
				</span>
				<strong className="font-italic">
					{description}
				</strong> 
				<div 
					className="fmRU_button xl" 
					style={{ 
						display:"inline-block", 
						verticalAlign:"middle", 
						float:"inherit",  
						border:0, background: "none" }
					}
					title={__("Edit")}
					onClick={this.onForseOpen}
				>
					<i>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14" y="-3">
							<path 
								fill="#333333" 
								d="M136.6 138.79a64.003 64.003 0 0 0-43.31 41.35L0 460l14.69 14.69L164.8 324.58c-2.99-6.26-4.8-13.18-4.8-20.58 0-26.51 21.49-48 48-48s48 21.49 48 48-21.49 48-48 48c-7.4 0-14.32-1.81-20.58-4.8L37.31 497.31 52 512l279.86-93.29a64.003 64.003 0 0 0 41.35-43.31L416 224 288 96l-151.4 42.79zm361.34-64.62l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.75 18.75-49.15 0-67.91z"
							/>
						</svg>
					</i>
				</div>
			</div> 
			: 
			"";
		const style = {borderLeftColor:this.props.color};		
		return <Fragment>
			<div className='col-md-7 col-sm-12 critery_cell grey first bl-20' style={style} >
				<div className="critery-title bl-20">
					{ title }
					{ _description }
				</div>
			</div>
			<div className='col-md-5 col-sm-12 critery_cell grey' >					
				{ is_expert ? this.expert_box() : this.viewer_box() }					
			</div>
		</Fragment>
	}		
	
	expert_box()
	{
		const { onItemClick, title, max_raiting, id, member_id } = this.props; 
		const { rating, description } = this.state; 
		return <Fragment>
			<ExpertCheckList
				data={{title, rating, id}}
				member_id={member_id}
				max_raiting={max_raiting}
				onEdit={this.onOpen}
				onCheck={this.onCheck}
			/>
			<Dialog
				isOpen={this.state.isOpen}
				className="little"
				onClose={this.onOpen}
				title={__("Edit you description")} 
			>	
				<div className="p-4 d-flex flex-column justify-content-center">
					<TextArea 
						rows={ 9 } 
						className=" w-100" 
						onChange={this.onDescr} 
						value={description}
					/>
					<div className="btn btn-secondary rounded-0" onClick={this.onForseSend}>
						{ __( "Send description" ) }
					</div>
					<div className="d-flex w-100">
						<input
							type="checkbox"
							className="checkbox mt-2"
							onChange={this.onIsDescr}
							value={1}
							checked={ WPFestSettings.is_comment }
							id={ 'crteri_' + id }
						/>
						<label htmlFor={ 'crteri_' + id } className="mt-2">
							{__("Do comments automaticaly")}
						</label>
					</div>
				</div>
			</Dialog>
		</Fragment>
	}
	viewer_box()
	{
		return  <div className="footer-widget ">{this.props.rating}</div> ;
	}	
	onEdit = () =>
	{
		
	}
	onOpen = () =>
	{
		if( WPFestSettings.is_comment )
			this.setState( { isOpen : false } )
		else
			this.setState( { isOpen : !this.state.isOpen } )
	}
	onForseOpen = () =>
	{ 
			this.setState( { isOpen : true } )
	}
	onDescr = text =>
	{
		this.setState( { description : text } );
	}
	onCheck = data =>
	{
		data.d = this.state.description;
		console.log(data);
		this.setState(
			{
				rating	: data.c,
				isOpen	: WPFestSettings.is_comment
			},
			() => this.onSend()
		);
		
	}
	onIsDescr = evt =>
	{
		WPFestSettings.set_is_comment(!WPFestSettings.is_comment);
		this.setState({is:!this.state.is});
	}
	onForseSend = () =>
	{
		this.setState(
			{ 
				isOpen	: false
			},
			() => this.onSend()
		);
	}
	onSend = () =>
	{		
		const { onItemClick, title, max_raiting, id, member_id } = this.props; 
		const { rating, description } = this.state; 
		const args = {
			d		: description,
			c		: parseInt(rating),
			mid		: parseInt(member_id),
			crid	: parseInt(id)
		}; 
		_fetch( 
			"ozenka", 
			args,
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
				.then(data => 
				{ 					
					AppToaster.show({  
						intent: Intent.SUCCESS,
						icon: "tick", 
						message: "Raiting changed" 
					});
					
				});
	}
}
export default Critery;