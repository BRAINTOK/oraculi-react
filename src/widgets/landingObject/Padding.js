import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import matrix from "../../states/LandingState/data/matrix";
import { Button, Intent, Icon, Dialog, Tag } from "@blueprintjs/core";
import FieldInput from "../../layouts/FieldInput";

class Padding extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			paddingTop: parseInt(this.props.value.paddingTop),
			paddingRight: parseInt(this.props.value.paddingRight),
			paddingBottom: parseInt(this.props.value.paddingBottom),
			paddingLeft: parseInt(this.props.value.paddingLeft)
		}
	}
	render()
	{
		const {paddingTop, paddingRight, paddingBottom, paddingLeft } = this.state;
		console.log( this.props );
		return <div className="d-flex flex-column mb-3">
			<div className="d-flex w-100">				
				<div className=" w-100" />
				<div className="d-flex justify-content-center w-100">
					<div>top:</div>
					<input 
						type="number"
						className="input dark w_45 ml-2 p-0"
						value={paddingTop}
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
						value={paddingLeft}
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
						value={paddingRight}
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
						value={paddingBottom}
						onChange={this.onBottom}
					/>
				</div>
				<div className=" w-100" />
			</div>
		</div>
	}
	
	onTop = () =>
	{
		
	}
	onLeft = () =>
	{
		
	}
	onRight = () =>
	{
		
	}
	onBottom = () =>
	{
		
	}
}
export default Padding;