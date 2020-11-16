import React, {Component} from "react";
import { __ } from "../../layouts/utilities/i18n";
import {Callout, Classes, Button, Intent, Dialog} from "@blueprintjs/core";
import QuaereDialog from "./QuaereDialog";

class QuaereForm extends Component
{
	state ={
		isOpen:false
	}
	render()
	{
		return <div className="quaere_form_container">
			<div className="btn btn-quaere" onClick={this.toggle}>
				{__("Send Quaere to Tutor")}
			</div>
			<Dialog
				isOpen={this.state.isOpen}
				onClose={this.toggle}
				title={__("Quaere")}
			>
				<QuaereDialog user={this.props.user}/>
			</Dialog>
		</div>
	}
	toggle = () =>
	{
		this.setState({isOpen:!this.state.isOpen});
	}
		
}
export default QuaereForm;