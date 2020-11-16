import React, {Component} from "react";
import {__} from "../../utilities/i18n"
import ScalarField from "./ScalarField";
import { Tag, ButtonGroup, Button, Intent } from "@blueprintjs/core";

//  Scalar  String

export default class Password extends ScalarField
{
	
	isEnabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return <input 
			autoFocus={this.props.autoFocus}
			type="password" 
			className={ this.props.className ? this.props.className : "form-control input dark" }
			value={ value ? value : ""}
			onChange={this.onChange}
		/>;
	}
	
	isDesabled()
	{
		const {field, title} = this.props;
		const visibled_value = this.props.visibled_value || "title";
		const {value} = this.state;
		return <div className="px-0 mb-1">
			<Tag minimal={true} className="m-1">
				{ " ****** " }
			</Tag>
		</div>
	}
}