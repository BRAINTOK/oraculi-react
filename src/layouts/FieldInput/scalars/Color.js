import React, {Component} from "react";
import {__} from "../../utilities/i18n";
import ColorPicker from "../../utilities/ColorPicker";
import { Tag, ButtonGroup, Button, Intent } from "@blueprintjs/core";
import ScalarField from "./ScalarField";

export default class Color extends ScalarField
{
	constructor(props)
	{
		super(props);
		this.state = {
			value:this.props.value
		}
	}
	
	onColor = color =>
	{
		this.setState({ color: color.hex });
		this.on(color.hex)
	}
	isDesabled()
	{
		const {field, title, value, extended_link, external_link_data } = this.props;
		return <div className={"datetimer "+this.props.className}>
			<div style={{width:100, height:25, backgroundColor:this.state.value}} />
		</div>
	}
	isEnabled()
	{
		return <div className={"datetimer w-100 "+this.props.className}>
			<ColorPicker color={this.state.value} onChoose={this.onColor} />
			<input 
				type="string"
				class_name="form-control input dark"
				value={ this.state.value } 
				onChange={ this.onChange }
			/>
		</div>
	}
	
	onChange = evt =>
	{
		this.setState({value:evt.currentTarget.value});
		this.on(evt.currentTarget.value)
	}
	
	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}