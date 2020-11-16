import React, { Component, Fragment, useState, useEffect } from "react";
import { compose } from "recompose";
import { Query, withApollo, graphql } from "react-apollo";
import { withRouter } from "react-router";
import BasicStateFunctional from "../BasicStateFunctional";
import md5 from "md5";
import $ from "jquery";
import {app_url} from "../../layouts/config";
import {__} from "../../layouts/utilities/i18n";
import translitterate from "../../layouts/utilities/translitterate";
import getJitsiExternalId from "./getJitsiExternalId";
//import Logger from "jitsi-meet-logger";

const JitsiState = function (props) 
{
	let Id = props.translation ? props.translation.post_title : 'Буу';
	let current = props.translation && props.translation.current  
		? 
		props.translation.current 
		: 
		getJitsiExternalId( Id );
	
    const [loading, setLoading] = useState(true);
    //const [current, setCurrent] = useState( );
	
    const containerStyle = props.containerStyle || {		
		width: '800px',
		height: '400px',
    };
	let api;
	let transform
  
    const jitsiContainerStyle = 
	{
		display: (loading ? 'none' : 'block'),
		width: '100%',
		height: '100%',
    }
  
	function startConference( data ) 
	{
		console.log(data);
		const password = data.password;
		let isPassworded = false;
		try 
		{
			const domain = 'jitsi.protopia-home.ru';
			//Id = props.translation ? props.translation.id : md5(Math.random()).substring( 0, 10 );
			const options = {
				roomName: data.external_id,
				height: props.height || 500,
				parentNode: document.getElementById('jitsi-container'),
				interfaceConfigOverwrite: 
				{
					DEFAULT_BACKGROUND:"#FFFFFF00",
					DEFAULT_REMOTE_DISPLAY_NAME:__("Unnamed User"),
					SHOW_JITSI_WATERMARK: false,
					JITSI_WATERMARK_LINK: 'https://protopia-home.ru',
					SHOW_WATERMARK_FOR_GUESTS: false,
					SHOW_BRAND_WATERMARK: true,
					BRAND_WATERMARK_LINK: "https://protopia-home.ru",
					TOOLBAR_BUTTONS: [
						'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
						'hangup', 'etherpad', //'info', 
						'settings', 'raisehand' 
					],
					SETTINGS_SECTIONS: [ 'devices', 'language', 'moderator', 'profile', 'calendar' ],
					filmStripOnly: false,
					DISABLE_TRANSCRIPTION_SUBTITLES: true,
					AUTHENTICATION_ENABLE:true,
					VERTICAL_FILMSTRIP: false,
					RECENT_LIST_ENABLED: false,
					DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
				},
				configOverwrite: 
				{
					disableSimulcast: false,
					enableNoisyMicDetection: false, 
					startWithVideoMuted:true
				},
			};
			if(props.user)
			{
				api = new window.JitsiMeetExternalAPI(domain, options);
				// console.log( props.user );
				// console.log( props.translation );
				api.addEventListener(
					'videoConferenceJoined', 
					evt => {
						console.log( 'videoConferenceJoined', evt );
						if (!isPassworded) 
						{ 
							setTimeout(
								() => {
									/*
									console.log( 
										api._transport.addListener( 
											"on-stage-participant-changed", 
											evt => console.log(evt) 
										) 
									);
									*/
									let participants = [];
									for(var i in api._participants )
									{
										participants.push({
											_id			: i,
											avatar		: api._participants[i].avatarURL,
											name		: api._participants[i].formattedDisplayName
										});
									}
									evt.participants 	= participants;
									evt.membersCount	= api.getNumberOfParticipants();
									evt.displayName 	= api.getDisplayName(evt.id);
									evt.avatarURL 		= api.getAvatarURL(evt.id);
									if(data.external_id)
									{
										api.executeCommand('password', password);
									}
									props.onJoin(evt);
									setLoading(false);
								}, 
								400
							);
							api.executeCommand('displayName', props.user.display_name);
							api.executeCommand('avatarUrl', props.user.avatar ? props.user.avatar : app_url() + "/assets/img/user1.svg");
						}
						
					}
				);
				api.addEventListener(
					'passwordRequired', 
					evt => 
					{
						console.log('password required', evt );
						isPassworded = true;
						if(data.external_id)
						{
							api.executeCommand('password', password);
						}
					}
				);
				api.addEventListener(
					'videoConferenceLeft', 
					evt => 
					{
						console.log( "videoConferenceLeft", evt );
						if(props.onLeave)
						{
							props.onLeave( evt );
						}
					}
				);
				api.addEventListener(
					'participantJoined', 
					evt => 
					{
						console.log( "participantJoined", evt );						
						evt.roomId = data.external_id;
						evt.avatarURL = api.getAvatarURL(evt.id);
						props.participantJoined(evt);
					}
				);
				api.addEventListener(
					'participantKickedOut', 
					evt => 
					{
						console.log( "participantKickedOut", evt );					
						evt.roomId = data.external_id;
						props.participantKickedOut(evt);
					}
				);
				api.addEventListener(
					'participantLeft', 
					evt => 
					{
						console.log( "participantLeft", evt );					
						evt.roomId = data.external_id;
						props.participantLeft(evt);
					}
				);
				api.addEventListener(
					'feedbackSubmitted ', 
					evt => 
					{
						console.log( "feedbackSubmitted ", evt );					
						evt.roomId = data.external_id;
						props.feedbackSubmitted (evt);
					}
				);
			}
			else
			{
				
			}
		} 
		catch (error) 
		{
			console.error('Failed to load Jitsi API', error);
		}
	}
	
	useEffect(
		() => 
		{
			$("#jitsi-container").empty();
			console.log( props );
			// verify the JitsiMeetExternalAPI constructor is added to the global..
			if (window.JitsiMeetExternalAPI) 
			{
				const post_title = props.translation ? props.translation.post_title : 'Буу';
				const external_id = props.translation 
					&& props.translation.current
					? 
					props.translation.current
					:
					props.translation.external_id
				const is_locked = props.translation 
					&& props.translation.current
					? 
					props.translation.pe_room.filter(e => e.external_id == props.translation.current)[0].is_locked
					:
					false;
				const password 	= props.translation 
					&& props.translation.current
					? 
					props.translation.pe_room.filter(e => e.external_id == props.translation.current)[0].password
					:
					false;
				startConference({
					post_title,
					external_id,
					is_locked,
					password
				});
			}
			else 
				alert('Jitsi Meet API script not loaded');
		}, 
		[ props.translation.current ]
	);
  
    return <div style={containerStyle} >
		{loading && null}
        <div
			id="jitsi-container"
			style={jitsiContainerStyle}
        />
    </div>;
}

function Jitsi(props) 
{
	return <JitsiState {...props}/>;
}

export default compose(

    withApollo,
    withRouter
)(Jitsi);