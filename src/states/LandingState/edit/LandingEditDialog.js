import React, {Component} from "react";
import {__} from "../../../layouts/utilities/i18n";
import {Button, ButtonGroup, Intent, Popover, Position, Tabs, Tab, Dialog } from "@blueprintjs/core";
import matrix from "../data/matrix";
import InputForm from "./InputForm";

class LandingEditDialog extends Component
{
	constructor(props)
	{
		super(props);
		this.state={...props};
	}
	componentWillUpdate(nextProps)
	{
		let state = {};
		Object.keys(nextProps).forEach(e =>
		{
			if(this.state[e] != nextProps[e])
				state[e] = nextProps[e];
		});
		//console.log(nextProps, this.state, state);
		if(Object.keys(state).length > 0)
		{
			this.setState(state);
		}
	}
	render()
	{
		return <Dialog 
			isOpen={this.state.isOpen}
			onClose={this.props.onClose}
			title={__("Landing Settings")}
		>
			<div className="p-4">
				<InputForm 
					{ ...this.state.data }
					source={"landing"}
					data={this.state.data}
					on={(value, field) => this.onField(value, field, "data")}
				/>
			</div>
			<ButtonGroup className="mx-auto">
				<Button
					onClick={this.onEdit}
				>
					{ __( "Update" ) }
				</Button>
			</ButtonGroup>
		</Dialog>
	}
	onField(value, field )
	{
		let data = { ...this.state.data}
		data[field] = value;
		//console.log(value, field, data );
		this.setState( { data } );
		
	}
	onEdit = () =>
	{
		console.log( this.state.data );
		this.props.onEdit( this.state.data );
	}
}

export default LandingEditDialog;