import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { Button, Intent, Icon, Dialog, Tag, Card } from "@blueprintjs/core";
import LayoutIcon from "../../layouts/LayoutIcon";
import {CardFieldTypes} from "../../states/LandingState/Card";
import matrix from "../../states/LandingState/data/matrix";

class CardField extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...this.props 
			
		}
		this.ref = React.createRef();
	}
	render()
	{		
		return <div className=" w-100 layout-centered flex-column card p-2 m-1 ">
			
			<div className="mb-2">
				{ this.getSwitcher() }
			</div>
			<div className="mb-2">
				{ this.getSwitchVariant() }
			</div>
			<div className="mb-2">
				<div>
					<div>
						{ __( "Height of this element in all Cards" ) }
					</div>
					<input
						type="number"
						value={ this.state.object.height }
						onChange={this.onHeight}
						className="form control input dark"
					/>
				</div>
			</div>
			
			<div className="close top-right m-2" aria-label="Close" onClick={this.onClose}>
				<span aria-hidden="true">&times;</span>
			</div>
		</div>;
	}
	getSwitcher = () =>
	{
		return CardFieldTypes().map((e, i) =>
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
	getSwitchVariant = () =>
	{
		return matrix.CardField.variant.values.map((e, i) =>
		{
			let field = CardFieldTypes().filter(ee => ee.type == this.state.object.type)[0];
			field = field ? field : CardFieldTypes()[0];
			let variant = field.variants[e._id];			
			
			return <Button
				key={i}
				vid={ e._id }
				onClick={ this.onVariant }
				intent={ this.state.object.variant == e._id ? Intent.DANGER : Intent.NONE }
				minimal={ this.state.object.variant != e._id }
			>
				{ __( variant ? variant.title : "" ) }
			</Button>
		})
	}
	onType = evt =>
	{
		const type = evt.currentTarget.getAttribute("type");		
		const object = { object : { ...this.state.object, type } }
		this.setState( object );
		this.onChange( object ); 
	}
	onHeight = evt =>
	{
		const val = evt.currentTarget.value;		
		const object = { object : { ...this.state.object, height:val } }
		this.setState( object );
		this.onChange( object ); 
	}
	onVariant = evt =>
	{
		const variant = evt.currentTarget.getAttribute("vid");		
		const object = { object : { ...this.state.object, variant } }
		this.setState( object );
		this.onChange( object ); 
	}
	onChange = object =>
	{	
		if( this.props.onChange )		
			this.props.onChange( object.object, this.props.i );
	}
	onClose = () =>
	{
		this.props.onClose( this.props.i )
	}
	on = value =>
	{
		console.log( value );
		this.props.on( value )
	}
}
export default CardField;
