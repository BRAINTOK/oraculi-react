import React, { Component, Fragment } from "react";
import moment from 'moment';
import { __ } from "../../layouts/utilities/i18n";
import TextEditor from "../../layouts/utilities/TextEditor";
import {Callout, Classes, Button, Intent} from "@blueprintjs/core";

class MNewCommentForm extends Component
{
	state = {value: ""}
	render()
	{
		return this.props.user 
			?
			<div className="comment-form-content">
				<TextEditor onChange={this.onChange} text={this.state.value}/>
				<div className="btn comment-new-btn">
					{__("Send Comment")}
				</div>
			</div>
			:
			null
	}
	onChange = data =>
	{
		this.setState({value:data});
		this.props.onChange(data);
	}
	onSet = () =>
	{
		this.props.onSet( this.state.value )
	}
}
export default MNewCommentForm;