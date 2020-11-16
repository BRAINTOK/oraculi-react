import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import matrix from "../../states/LandingState/data/matrix";
import { Button, Intent, Icon, Dialog, Tag, Collapse } from "@blueprintjs/core";

class ExternalStyle extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			value: this.props.value 
				&& Array.isArray(Object.entries(this.props.value)) 
				&& Object.entries(this.props.value).length > 0
				?
				Object.entries(this.props.value).map( (e, i) =>
				{
					return {
						field : e[0],
						value : e[1]
					}
				})
				:
				[ ]
		}
	}
	render()
	{
		// console.log(this.state);
		const value = this.state.value.map((e, i) =>
		{ 
			return <div className="row mb-2" key={i}> 
				<div className="col-md-5 px-1">
					<input
						className="form-control input dark"
						type="text"
						value={e.field}
						placeholder="attribute name"
						i={i}
						onChange={this.onField}
					/>
				</div>
				<div className="col-md-6 col-9 px-1">
					<input
						className="form-control input dark"
						type="text"
						value={e.value}
						placeholder="value"
						i={i}
						onChange={this.onValue}
					/>
				</div>
				<Button minimal={true} onClick={this.onRemove} i={i} icon="minus" className="col-md-1 col-3"/>
			</div>
		});
		
		return <div className="p-0">
			<div className="p-3">
				{ value }
			</div>
			<div className="p-2 d-flex">
				<Button icon="plus" onClick={this.onAdd} />
				<div className="descr ml-2 ">
					{ __( "Attrubute names automatically put by JavaScript-style. ForExample: 'borderRadius' not 'border-radius'" ) }
				</div>
			</div>
		</div>
	}
	onField = evt =>
	{
		const i = parseInt(evt.currentTarget.getAttribute("i"));
		let value = [...this.state.value];
		value[i].field = evt.currentTarget.value;
		let v = {};
		this.setState({ value });
		value.forEach( e => 
		{	
			v[ e.field ] = e.value;
		})
		this.props.on(v);
	}
	
	onValue = evt =>
	{
		const i = parseInt(evt.currentTarget.getAttribute("i"));
		let value = [...this.state.value];
		value[i].value = evt.currentTarget.value;
		this.setState({ value });		
		let v = {};
		value.forEach( e => 
		{	
			v[ e.field ] = e.value;
		})
		this.props.on(v);
	}
	onAdd = () =>
	{
		let value = [...this.state.value];
		value.push({ field:"", value:"" });
		this.setState({ value });
		this.props.on(value);
	}
	onRemove = evt =>
	{
		const i = parseInt(evt.currentTarget.getAttribute("i"));
		let value = [...this.state.value];
		value.splice(i, 1);
		this.setState({ value });
		this.props.on(value);
	}
}
export default ExternalStyle;