import React,{Component,Fragment} from "react";
import { __ } from "../../../layouts/utilities/i18n";
import { Button, ButtonGroup, Intent, Icon, Dialog } from "@blueprintjs/core";
import DataContext from "../DataContext";
import FloatSetting from "./FloatSetting";
import matrix from "../data/matrix";
import {components} from "../Section";

class FlaotDettingDialog extends Component
{
	state = {
		...this.props,
		current_type : 0,
		isDialog : false
		
	}
	render()
	{
		//console.log( this.state );
		const btns = this.state.floats.map((e,i) =>
		{
			if(!e) return null;
			let cl = i == this.state.current_type ? " btn-danger " : " btn-light ";
			return <Button 
				key={i} 
				i={i}
				float_id={ e.float_id }
				small={true}
				onClick={this.onSwitch}
			>
				<div className="">
					{ e.type }
				</div>			
			</Button>			
		});
		return <div className="p-0">
			<ButtonGroup>
				{ btns }
				<Button intent={Intent.SUCCESS} >
					<Icon icon="plus" />
				</Button>
			</ButtonGroup>
			<Dialog
				isOpen={this.state.isDialog}
				onClose={this.onDialog}
				title={__("Float Settings")}
			>
				<FloatSetting
					float_id={this.state.float_id}
					onChange={this.onUpdate}
				/>
			</Dialog>
		</div>
	} 
	
	onSwitch = evt =>
	{
		//this.setState({ current_type: evt.currentTarget.getAttribute("i") });
		this.setState({
			isDialog : true,
			float_id : evt.currentTarget.getAttribute("float_id")
		});
	}
	onComponentSelect = evt =>
	{
		
	}
	onDialog = () =>
	{
		this.setState({isDialog:!this.state.isDialog});
	}
	onUpdate = (data, float_id) =>
	{
		console.log( data );
		this.props.onUpdate(data, float_id);
		this.onDialog();
	}
}
export default FlaotDettingDialog;