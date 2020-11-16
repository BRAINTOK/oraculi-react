import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import {withRouter} from "react-router";
import {compose} from "recompose";
import Translation from "../translationState/Translation"; 

class TalkRoom  extends Component
{
	render()
	{
		const { jitsi_password, post_title, id, user } = this.props; 
		const jitsi = "wpfest"+ this.props.match.params.festid +"team"+ this.props.match.params.id;
		return <div className="mt-4" style={{height:380}}>
			<Translation 
				user={ user } 
				translation={ {
					post_title	: post_title || "Jitsiroom2326", 
					current		: jitsi || "ASDFTY",  
					external_id	: jitsi || "ASDFTY",  
					password	: jitsi_password || "111", 
					is_locked	: true,
					pe_room		: [{
						external_id : jitsi || "ASDFTY",
						members		: []
					}]
				} }  
				height={380}
				containerStyle={{width:"100%", height:380}}
				onLeave={this.onLeave}
				onChange={this.onChange}
				onJoin={this.onJoin}
				participantJoined={this.participantJoined}
				participantKickedOut={this.participantKickedOut}
				participantLeft={this.participantLeft}
				feedbackSubmitted ={this.feedbackSubmitted }
			/>
		</div>
	}
	onLeave = evt =>
	{
		if(this.props.onLeave)
			this.props.onLeave( evt );
		
	}
	onChange = (name, data) =>
	{
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
)(TalkRoom);