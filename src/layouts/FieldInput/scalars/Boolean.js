import React, {Component, Fragment} from "react";
import {__} from "../../utilities/i18n";
import ScalarField from "./ScalarField";

//  Scalar  Boolean
export default class Boolean extends ScalarField
{
	constructor(props)
	{
		super(props);
		this.state = {
			value : (this.props.value) ? true : false
		}
	}
	isEnabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return <div className="mt-2 mb-3">					
			<input 
				type="checkbox"
				className="checkbox"
				id={ "bool_" + field + this.props._id }
				onChange={ this.onChange }
				onClick={ this.onChange }
				value={ value }
				checked={ value == true }
				disabled={ !this.props.editable }
			/>
			<label htmlFor={ "bool_" + field + this.props._id} >
				{ __(value ? "Yes" : "No") }
			</label>
		</div>;
	}
	isDesabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		return<div className="px-0 m-1">
		{
			this.props.value 
				?
				<i className="fas fa-chevron-down text-success"></i>
				:
				<i className="fas fa-times text-danger"></i>
		}
		</div>
	}
	onChange = evt =>
	{
		const value = this.state.value ? false : true;
		//console.log(value);
		this.setState({ value });
		this.on(value);
	}
}