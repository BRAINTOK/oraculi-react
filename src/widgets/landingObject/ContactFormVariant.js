import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { Button, Intent, Icon, Dialog, Tag, Collapse, Slider, MultiSlider } from "@blueprintjs/core";
import LayoutIcon from "../../layouts/LayoutIcon";
import $ from "jquery";

class ContactFormVariant extends Component
{
	state = {
		...this.props
	}
	render()
	{
		return <div className="cf-variant">
			<div className="row dat">
				<div className="col-3 layout-label" >
					{ __( "Label" ) }
				</div>
				<input 
					type="string" 
					className="col-8 form-control input dark" 
					value={ this.state.label } 
					onChange={this.onLabelChange}
				/>
				<Button className="col-1" icon="minus" onClick={this.onRemove} >
				
				</Button>				
			</div>
			<div className="row dat hidden">
				<div className="col-3 layout-label" >
					{ __( "Value" ) }
				</div>
				<input 
					type="string" 
					className="col-8 form-control input dark" 
					value={ this.state.value } 
					onChange={this.onValueChange}
				/>
			</div>
		</div>
	}
	onLabelChange = evt =>
	{
		const ddd = evt.currentTarget.value;
		this.setState({ label : ddd });
		this.props.on("label", ddd, this.props.i);
	}
	onValueChange = evt =>
	{
		const ddd = evt.currentTarget.value;
		this.setState({ value : ddd });
		this.props.on("label", ddd, this.props.i);
	} 
	onRemove = () =>
	{
		
	}
}
export default ContactFormVariant;