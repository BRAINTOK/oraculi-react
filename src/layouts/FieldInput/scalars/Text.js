import React, {Component, Fragment} from "react";
import {__} from "../../utilities/i18n";
import ScalarField from "./ScalarField";
import TextEditor from "../../utilities/TextEditor";

//TODO extends ScalarField
export default class Text extends ScalarField
{
	isEnabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return this.textEditor();
	}
	isDesabled()
	{
		return this.props.value;
	}
	onChange = data =>
	{
		this.setState({value:data});
		this.on(data)
	}
	textEditor()
	{
		return <TextEditor onChange={this.onChange} text={this.state.value}/>;
		/* return <textarea onChange={this.onChange} className="form-control" rows="10" value={this.state.value} >
			{this.state.value}
		</textarea>;
		*/
	}
}