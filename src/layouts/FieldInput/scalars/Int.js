import React, {Component} from "react";
import {__} from "../../utilities/i18n"
import ScalarField from "./ScalarField";
import { Tag, ButtonGroup, Button, Intent, NumericInput } from "@blueprintjs/core";

//  Scalar  Int

export default class Int extends ScalarField
{
	isEnabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return <NumericInput 
			large={true}
			autoFocus={this.props.autoFocus}
			className={ this.props.className ? this.props.className : "form-control input dark" }
			value={ value ? value : ""}
			onValueChange={this.onChange}
		/>;
	}
	onChange = _valueAsNumber =>
	{
		this.setState({value:_valueAsNumber});
		this.on(_valueAsNumber)
	}
}