import React, {Component, Fragment} from "react";
import { Button, ButtonGroup, Classes, Dialog, Intent, NumericInput, Popover, Position, Toaster, Tooltip, Tag, Card, Icon, Alignment, Collapse, RangeSlider } from "@blueprintjs/core";
import { ChromePicker } from 'react-color';
import i18n from "../i18n";

export const AppToaster = Toaster.create({
    position: Position.BOTTOM_LEFT,
	maxToasts: 4
});

export {Dialog};
export {Intent};
export {Tooltip};
export {Classes};
export {Position};
export {Popover};
export {Button};
export {ButtonGroup};
export {Tag};
export {NumericInput};
export {Card};
export {Icon};
export {Alignment};
export {Collapse};
export {RangeSlider};

export class ColorPicker extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			color:this.props.color || "#FFFFFF",
			isColorPicker: false
		}
	}
	
	onColor = color =>
	{
		this.setState({ color: color.hex });
		this.props.onChoose( color );
	}
	onColorToggle = () =>
	{
		this.setState({isColorPicker:!this.state.isColorPicker});
	}
	render()
	{
		const picker = this.state.isColorPicker ? 
		<div style={{ position:"absolute", zIndex:2 }} onClick={this.onColorToggle} >
			<ChromePicker 
				disableAlpha = {true} 
				color={ this.state.color } 				
				onChange={this.onColor}
			/>
		</div>
		: null;
		return <Fragment>
			<div 
				style={{
					padding: '5px',
					background: '#fff',
					borderRadius: '1px',
					boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer'
				 }}
			>
				<div 
					style={{ 
						width: '36px',
						height: '14px',
						borderRadius: '2px', 
						backgroundColor:this.state.color
					}} 
					onClick={this.onColorToggle}
				/>
			</div>
			{picker}
		</Fragment>
	 }
}
export class DeleteButton extends Component
{
	constructor(props)
	{
		super(props);
		this.state={
			isRemoveDialog:false
		}
	}
	onRemoveDialog = () =>
	{
		this.setState({isRemoveDialog:!this.state.isRemoveDialog});
	}
	onRemove = () => 
	{
		this.setState({isRemoveDialog:!this.state.isRemoveDialog});
		this.props.onRelease();
	}
	render()
	{
		return this.props.isDisabled ? <span/> : <Fragment>
			<div className="btn bg-danger tx-wt" onClick={this.onRemoveDialog}>
			   <i className="fas fa-trash-alt mr-2"></i>  {i18n.t("Delete")}
			</div>
			<Dialog
				icon="trash"
				isOpen={this.state.isRemoveDialog}
				onClose={this.onRemoveDialog}
				title={i18n.t("Do you realy want delete ") + this.props.post_title + "?" }
			>
				<div className="pt-dialog-footer">
					<div className={Classes.DIALOG_BODY}>
					 
					</div>
					<div className={Classes.DIALOG_FOOTER}>
						<div className={Classes.DIALOG_FOOTER_ACTIONS}>
							
							<Button
								onClick={this.onRemoveDialog}
								text= {i18n.t("oh, No! Sorry") }
							/>
							<Button
								intent={Intent.PRIMARY}
								onClick={this.onRemove}
								text= {i18n.t("Yes, I want finaly delete this") }
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</Fragment>
	}
	
}