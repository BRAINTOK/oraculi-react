import React, {Component} from "react";
import {__} from "../../utilities/i18n"
import ScalarField from "./ScalarField";
import { Tag, ButtonGroup, Button, Intent, TextArea } from "@blueprintjs/core";

export default class TextField extends ScalarField
{
	isEnabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return <TextArea
				value={ value ? value : ""}
				onChange={this.onChange}
				growVertically={true}
				fill={true}
				large={true}
				style={ {minHeight:350 }}
				intent={Intent.PRIMARY}
				className=" p-4 "
			/>;
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