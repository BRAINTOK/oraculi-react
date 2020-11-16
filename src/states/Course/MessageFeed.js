import React, {Component} from "react";
import $ from "jquery";
import {__} from "../../layouts/utilities/i18n";

class MessageFeed extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {}
	}
	render()
	{
		return <div className="card flex-row"  lesson_id={message._id} course_id={message.course_id}>			
				
				<div className="p-4">
					<div className="content" 
						 
					</div>
				</div>
		</div>
	}
}
export default MessageFeed;