import React, {Component} from "react";
import {__} from "../../utilities/i18n";
import { Tag, ButtonGroup, Button, Intent } from "@blueprintjs/core";
import ScalarField from "./ScalarField";

export default class Email extends ScalarField
{
	isEnabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return <div className={"datetimer "+this.props.className}>
			<i className="fas fa-at"></i>
				<input 
				type="text" 
				className={ "" }
				value={ value ? value : ""}
				onChange={this.onChange}
			/>
		</div>;
	}
	isDesabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return  <div className={"datetimer "+this.props.className}>
			<i className="fas fa-at"></i>
			<div className="px-0 my-2">
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