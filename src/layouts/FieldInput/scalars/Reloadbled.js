import React, {Component} from "react";
import {__} from "../../utilities/i18n"
import ScalarField from "./ScalarField";
import { Tag, ButtonGroup, Button, Intent } from "@blueprintjs/core";

export default class Reloadbled extends ScalarField
{
	isEnabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return <div className="input-group mb-3">
			<input 
				type="text" 
				className={ this.props.className ? this.props.className : "form-control input dark" }
				style={{fontSize:"0.8rem"}}
				value={ value ? value : ""}
				onChange={this.onChange}
				disabled={true}
			/>
			<div className="input-group-append">
				<div className="btn btn-secondary" onClick={this.onLoad} >
					<i className={"fas fa-sync-alt " + this.state.btn_class} />
				</div>
			</div>
		</div>;
	}
	onLoad = () =>
	{
		this.setState({btn_class : " fa-spin"});
	}
	
}