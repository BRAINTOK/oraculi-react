import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import matrix from "../../states/LandingState/data/matrix";
import { Button, Intent, Icon, Dialog, Tag } from "@blueprintjs/core";
import FieldInput from "../../layouts/FieldInput";

class Border extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			borderTop: 		this.props.value.borderTop,
			borderRight: 	this.props.value.borderRight,
			borderBottom: 	this.props.value.borderBottom,
			borderLeft: 	this.props.value.borderLeft
		}
	}
	render()
	{
		const {marginTop, marginRight, marginBottom, marginLeft } = this.state;
		//console.log( this.props );
		return <div className="d-flex flex-column p-5 mb-3">
			<div 
				className=""
				style={{
					width : 200,
					position : "absolute",
					left : "50%",
					marginLeft : -100,
					height: 10,
					marginTop:0
				}}
			>
			
			</div>
		</div>
	}
	onTop = evt =>
	{
		const marginTop = evt.currentTarget.value;
		this.setState({marginTop});
	}
	onLeft = evt =>
	{
		const marginLeft = evt.currentTarget.value;
		this.setState({marginLeft});
	}
	onRight = evt =>
	{
		const marginRight = evt.currentTarget.value;
		this.setState({marginRight});
	}
	onBottom = evt =>
	{
		const marginBottom = evt.currentTarget.value;
		this.setState({marginBottom});
	}
}
export default Border;