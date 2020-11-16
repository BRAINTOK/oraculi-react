import React, { Component, Fragment } from "react";
import moment from 'moment';
import { __ } from "../../layouts/utilities/i18n";
import {Callout, Classes, Button, Intent} from "@blueprintjs/core";
import MNewCommentForm from "./MNewCommentForm";

class MComment extends Component
{
	state = {
		isOpen:false
	}
	__shouldComponentUpdate(nextProps, nextState)
	{
		return nextProps.isOpen != this.state.isOpen ;
	}
	__componentWillUpdate(nextProps, nextState)
	{
		this.setState({ isOpen : nextProps.isOpen });
	}
	render()
	{
		const comment = this.props.comments
			.filter( e => 
			{
				return e.parent && e.parent.id == this.props.id 
			})
				.map((e, i) =>
				{
					return <MComment 
						{...e} 						
						isOpen={ this.props.nowOpen == e.id }
						onOpen={this.props.onOpen}
						nowOpen={ this.props.nowOpen }
						level={ this.props.level+1} 
						comments={this.props.comments} 
						key={i} 
						user={this.props.user} 
						/>
				});
		const reply = this.props.user && !this.state.isOpen 
			?		
			<div 
					onClick={this.onOpen}
					className="comment-add"
				>
				{__("Reply")}
			</div>
			:
			null;
		return <div className="comment-content" >
			<div className="comment-author">
				<div 
					className="comment-avatar" 
					style={ { backgroundImage: "url(" + this.props.author.avatar +")" ? this.props.author.avatar : "" } }
				>
				</div>
				<div className="comment-author-name">
					{this.props.author.display_name}
				</div>
			</div>
			<div className="comment">
				{this.props.content}
			</div> 
			<div className="comment-footer">
				<div className="comment-date">
					{ moment( this.props.date ).format('D.MM.YYYY HH:mm') }
				</div>
				{reply}
			</div>
			{
				this.state.isOpen 
				?
				< MNewCommentForm  onChange={this.onNew}  onSet={this.onSet} user={this.props.user} />
				: 
				null
			}
			<div className="comment-children">
				{comment}
			</div>
		</div>;
	}
	onOpen = () =>
	{
		this.setState({isOpen:!this.state.isOpen});
		//this.props.onOpen(this.props.id);
	}
	onNew = text =>
	{
		
	}
	onSet = text => 
	{
		
	}
}
export default MComment;
