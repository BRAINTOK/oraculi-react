import React, { Component, Fragment } from "react";
import {__} from "../../utilities/i18n"
import ScalarField from "./ScalarField";
import { Tag, ButtonGroup, Button, Intent, TextArea, Slider } from "@blueprintjs/core";

export default class FloatSlider extends ScalarField
{
	isEnabled()
	{
		const {field, title} = this.props;
		const {value} = this.state; 
		return <div className="d-flex w-100"> 
			<Slider
				min={this.props.min ? this.props.min : 0 }
				max={this.props.max ? this.props.max : 100 }
				stepSize={this.props.step_size ? this.props.step_size : 1 }
				labelStepSize={this.props.step_size ? this.props.step_size : 1 }
				value={ value ? value : 0}
				onChange={this.onChangeSlider}
				className="my-2"
			/>
		</div>;
	}
	isDesabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return <div className="px-0 my-2">
			{
				this.props.value 
					?
					<Tag minimal={true}>
						{ this.props.value + " "}
					</Tag>
					:
					null
			}
		</div>
	}
	onChangeSlider = value =>
	{
		this.setState({ value });
		this.on(value);
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