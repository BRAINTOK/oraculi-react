import React, { Component, Fragment } from "react";
import { __ } from "../../layouts/utilities/i18n";
import MComment from "./MComment";
import MNewCommentForm from "./MNewCommentForm";
import {Callout, Classes, Button, Intent} from "@blueprintjs/core";

class MComments extends Component
{
	state = {
		nowOpen :-1
	}
	render()
	{
		console.log(this.state.nowOpen)
		const comments = this.props.comments
			.filter(e => e.parent == null)
				.map((e, i) =>
				{
					return <MComment 
						{...e} 
						comments={this.props.comments} 
						level={1} 
						key={i} 
						user={this.props.user} 
						onOpen={this.onOpen}
						isOpen={this.state.nowOpen == e.id}
						author={{avatar:""}}
					/>
				});
		return comments.length > 0 
			?
			<div className="comments-content">
				{comments}
				<MNewCommentForm onChange={this.onNew} onSet={this.onSet} user={this.props.user}/>
			</div>
			:
			<div className="comments-content">
				<Callout intent={Intent.SECONDARY} className="d-flex justify-content-between">
					{__("No comments now")}					
				</Callout>
				<MNewCommentForm onChange={this.onNew}  onSet={this.onSet} user={this.props.user} />
			</div>;
	}
	onNew = text =>
	{
		
	}
	onSet = text => 
	{
		
	}
	onOpen = id =>
	{
		if(this.state.nowOpen != id)
		{
			console.log(this.state.nowOpen, id);
			this.setState({nowOpen:id});
		}
	}
}
export default MComments;