import React, {Component, Fragment} from "react";
import {__} from "../../utilities/i18n";
import { Tag, Intent } from "@blueprintjs/core";
import ScalarField from "./ScalarField";

export default class Checkbox extends ScalarField
{
	constructor(props)
	{
		super(props);
		this.state = {
			value : Array.isArray(this.props.value) ? this.props.value : [ this.props.value ],
		}
	}
	componentWillReceiveProps ( nextProps )
	{
		//console.log(nextProps);
		if(nextProps.value)
			this.setState({value: Array.isArray( nextProps.value ) ? nextProps.value : [ nextProps.value ] })
	}
	getComponent()
	{
		const { component, values } = this.props;
		const { value } = this.state; // array
		let _component;
		if( typeof component == "String")
		{
			_component = this.state.data;
		}
		else
		{
			const items = Array.isArray(values) ? values : Array.isArray(component) ? component : null;
			_component = items ? items.map((e, i) =>
			{
				const elem = typeof e === "string" ? {_id:e, title:e} : e;
				//console.log(elem);
				const sel = value.filter(el => el == elem._id).length > 0;
				const id = "__" + this.props._id + "_" + elem._id;
				return <div className="pb-0 mb-1" key={ i }>
					<label className="_check_">
						<input 
							value={ elem._id } 
							type="checkbox"						
							checked={ sel } 
							onClick={this.onChange}
						/>
						{ __(elem.title) }
					</label>
				</div>
			}) : null;
		}
		return _component;
	}
	
	isEnabled()
	{
		const selecting = this.getComponent();
		const {field, title} = this.props;
		const {value} = this.state;
		return <div className="my-2">{selecting}</div>;
	}
	isDesabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		//console.log( this.props.value );
		return <div className="px-0 my-1 "><Tag intent={Intent.DANGER}>{ value.join(" ") }</Tag></div>
	}
	onChange = evt =>
	{
		let value = this.state.value.slice(0);
		const checked = evt.currentTarget.checked ? 1 : 0;
		const val = evt.currentTarget.value;
		if(!checked)
		{
			value = value.filter(e => e !== val);
		}
		else
		{
			value.push(val);
		}
		this.setState({ value });
		this.on(value);
	}
}