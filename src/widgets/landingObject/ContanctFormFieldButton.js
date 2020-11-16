import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import ContactFormVariant from "./ContactFormVariant";
import { Button, Intent, Icon, Dialog, Tag, Collapse, Slider, MultiSlider } from "@blueprintjs/core";
import LayoutIcon from "../../layouts/LayoutIcon";
import $ from "jquery";

import __string from "../../assets/img/landing/string.svg";
import __email from "../../assets/img/landing/email.svg";
import __phone from "../../assets/img/landing/phone.svg";
import __image from "../../assets/img/landing/picture.svg";
import __time from "../../assets/img/landing/time.svg";
import __calendar from "../../assets/img/landing/calendar.svg";

class ContanctFormFieldButton extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			object : this.props.object
		};
	}
	render()
	{
		console.log( this.props.object );
		let style = { minWidth: "100%", maxWidth: "100%", margin:2 };
		
		return <div 
			className=" btn-item "
			style={style}
		>
			<div className=" layout-centered flex-column card p-4 m-0">
				<div className="title">
					{ this.props.i }
				</div>
				<div>
					{ __("Put form label") }
				</div>
				<div className="mb-4">
					<input 
						type="text"
						value={ this.state.object.label }
						onChange={this.onLabel}
						className="form-control input dark"
						placeholder={__("label")}
					/>
				</div>
				<div>
					{ __("Select input type") }
				</div>
				<div className="mb-4">
					{ this.getSwitcher() }
				</div>
				{
					this.state.object.type == "radio"
						?
						<Fragment>
							<div>
								{ __("Set choosed variants") }
							</div>
							<div className="mb-4">
								{this.variantForm()}
							</div>
						</Fragment>
						:
						null
				}
				<div>
					{ __("Put form description") }
				</div>
				<div className="mb-4">
					<input 
						type="text"
						value={ this.state.object.description }
						onChange={this.onDescription}
						className="form-control input dark"
						placeholder={__("description")}
					/>
				</div>
				<div className="mb-4">
					<input 
						type="checkbox"
						value={ 1 }
						onChange={this.onIsReq}
						checked={this.state.object.is_required}
						className="checkbox"
						id={ "is_required_" + this.props.i }
						placeholder={__("description")}
					/>
					<label htmlFor={ "is_required_" + this.props.i }>
						{ __( "Is Required" ) }
					</label>
				</div>
				<button className="close top-right m-2" aria-label="Close" onClick={this.onClose} >
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</div>
	}
	getSwitcher = () =>
	{
		return formTypes().map((e, i) =>
		{
			return <div 
				key={ i } 
				i={ i }
				type={ e.type }
				className={ "l-icon " + ( e.type == this.state.object.type ? " active " : "" ) } 
				onClick={this.onType}
			>
				<div>
					<LayoutIcon
						src={ e.icon }
						className="layout-icon"
					/>
					<div className="">
						{ __( e.title ) }
					</div>
				</div>
			</div>
		});
	}
	variantForm = () =>
	{
		const data = Array.isArray(this.state.object.data) ? this.state.object.data : [];
		const vForms = data.map((e, i) =>
		{
			return <ContactFormVariant
				key={i}
				i={i}
				on={this.onChangeData}
				{...e}
			/>
		});
		
		return <div>
			{vForms}
			<Button icon="plus" onClick={this.onAddVariant}>
				
			</Button>
		</div>
	}
	onLabel = evt =>
	{
		const object = { object : { ...this.state.object, label : evt.currentTarget.value } }
		this.setState( object );
		this.onChange( object );
	}
	onDescription = evt =>
	{
		const object = { object : { ...this.state.object, description : evt.currentTarget.value } }
		this.setState( object );
		this.onChange( object );
	}
	onType = evt =>
	{
		const type = evt.currentTarget.getAttribute("type");		
		const object = { object : { ...this.state.object, type } }
		this.setState( object );
		this.onChange( object ); 
	}
	onAddVariant = () =>
	{ 		
		const data = Array.isArray(this.state.object.data) ? this.state.object.data : [];
		const object = { object : {
			...this.state.object, 
			data : [ 
				...data, 
				{
					label : "new variant",
					value : "" 
				}
			] 
		} }
		this.setState( object );
		this.onChange( object ); 
	}
	onIsReq = evt =>
	{
		const is_required = $(evt.currentTarget).is(":checked") ? 1  : 0;		
		const object = { object : { ...this.state.object, is_required } }
		this.setState( object );
		this.onChange( object ); 
	}
	onChangeData = (field, value, i) =>
	{
		let object = { ...this.state.object };
		if(!Array.isArray(object.data))
			object.data = [];
		if(!object.data[i])
			object.data[i] = {};
		object.data[i][field] = value;
		console.log( object )
		this.setState( object );
		this.onChange( object ); 
	}
	onChange = object =>
	{	
		console.log( this.props.i, object );
		this.setState( object );		
		this.props.onChange( object, this.props.i );
	}
	onClose = () =>
	{
		this.props.onClose( this.props.i )
	}		
}
export default ContanctFormFieldButton;

export function formTypes()
{
	return [
		{
			type	: "string",
			title	: "String",
			icon	: __string
		},
		{
			type	: "email",
			title	: "email",
			icon	: __email
		},
		{
			type	: "phone",
			title	: "phone",
			icon	: __phone
		},
		{
			type	: "file_loader",
			title	: "File loader",
			icon	: __image
		},
		{
			type	: "time",
			title	: "Time",
			icon	: __time
		},
		{
			type	: "calendar",
			title	: "Calendar",
			icon	: __calendar
		},
		{
			type	: "radio",
			title	: "Choosing one variant",
			icon	: __calendar
		}
	]
}