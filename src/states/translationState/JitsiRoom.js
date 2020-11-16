import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import {withRouter} from "react-router";
import {compose} from "recompose";
import Translation from "./Translation";
import Jitsi from "./Jitsi";
import getWidget, { initArea } from "../../layouts/utilities/getWidget";

class JitsiRoom  extends Component
{
	render()
	{
		console.log( this.props );
		const { jitsi, jitsi_password, post_title, id, user } = this.props; 
		return <div className="course-talk-room-cont">
			<Translation 
				user={ user } 
				translation={ {
					post_title	: post_title, 
					current		: jitsi,  
					external_id	: jitsi,  
					password	: jitsi_password, 
					is_locked	: true,
					pe_room		: [{
						external_id : jitsi,
						members		: []
					}]
				} }  
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
)(JitsiRoom);