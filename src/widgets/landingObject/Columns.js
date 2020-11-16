import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import { Button, Intent, Icon, Dialog, ButtonGroup, Popover } from "@blueprintjs/core";

class Columns extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...props,
			value: props.value ? props.value : 0
		}
	}
	count = 13;
	render()
	{
		//console.log(this.state);
		
		const {value} = this.state;
		let c = [ ];
		for(let i = 0; i <= this.count; i++)
		{
			const cl = i < value + 1 ? " bg-danger " : " bg-dark ";
			c.push(<div className={" w-25 h-100 mr-2" + cl} n={i} onClick={this.onCount} key={i} >
			
			</div>);
		}
		return <div className="w-100 d-flex">
			<div className="w-100 pr-4 title">
				{value}
			</div>
			{c}
		</div>
	}
	onCount = evt =>
	{
		const count = evt.currentTarget.getAttribute("n")
		this.setState({ value: parseInt( count ) }); 
		this.props.on( this.props.field, parseInt( count ) );
	}
}
export default Columns;