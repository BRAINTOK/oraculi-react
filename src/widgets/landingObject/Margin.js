import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import matrix from "../../states/LandingState/data/matrix";
import { Button, Intent, Icon, Dialog, Tag } from "@blueprintjs/core";
import FieldInput from "../../layouts/FieldInput";

class Margin extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			marginTop: parseInt(this.props.value.marginTop),
			marginRight: parseInt(this.props.value.marginRight),
			marginBottom: parseInt(this.props.value.marginBottom),
			marginLeft: parseInt(this.props.value.marginLeft)
		}
	}
	render()
	{
		const {marginTop, marginRight, marginBottom, marginLeft } = this.state;
		//console.log( this.props );
		return <div className="d-flex flex-column  mb-3">
			<div className="d-flex w-100">				
				<div className=" w-100" />
				<div className="d-flex justify-content-center w-100">
					<div>top:</div>
					<input 
						type="number"
						className="input dark w_45 ml-2 p-0"
						value={marginTop}
						onChange={this.onTop}
					/>
				</div>
				<div className=" w-100" />
			</div>
			<div className="d-flex w-100">
				<div className="d-flex align-items-end justify-content-center flex-column w-100">
					<div className="text-right">left:</div>
					<input 
						type="number"
						className="input dark w_45 p-0"
						value={marginLeft}
						onChange={this.onLeft}
					/>
				</div>
				<div className="landing-padding-icon " >
					<i className="fas fa-align-justify" />
				</div>
				<div className="d-flex align-items-start  justify-content-center flex-column w-100">
					<div>right:</div>
					<input 
						type="number"
						className="input dark w_45 p-0"
						value={marginRight}
						onChange={this.onRight}
					/>
				</div>
			</div>
			<div className="d-flex w-100">						
				<div className=" w-100" />
				<div className="d-flex justify-content-center w-100">
					<div >bottom:</div>
					<input 
						type="number"
						className="input dark w_45 mr-2 p-0"
						value={marginBottom}
						onChange={this.onBottom}
					/>
				</div>
				<div className=" w-100" />
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
export default Margin;