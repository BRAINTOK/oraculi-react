import React, {Component, Fragment} from "react";
import {__} from "../../utilities/i18n";
import {String} from "../arrayForm";
import { 
	Icon, Tag, Classes,
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, 
	InputGroup 
} from "@blueprintjs/core";
import ScalarField from "./ScalarField";

export default class Array extends ScalarField
{
	constructor(props)
	{
		super(props);
		this.state = {
			...this.state,
			value:this.props.value ? this.props.value : [],
			newWord:"",
			newWordComment:"",
			isOpen:false
		}
	}
	isEnabled()
	{
		const {field, title, component} = this.props;
		const {value} = this.state;
		let text;
		switch(component)
		{
			case "string":
			default:
				if(value)
				{
					text = value.map((e, i) =>
					{
						return <String 
							value={ e } 
							_id={ i }
							onRemove={ this.onDeleteWord } 
							editable={ this.props.editable } 
							key={ i } 
						/>					
					});
				}
				break;
		}
		return <Fragment>
			{text}
			<Popover
				popoverClassName={ Classes.POPOVER_CONTENT_SIZING }
				portalClassName="foo"
				isOpen={ this.state.isOpen }
				content={<Fragment>
					<div className="lead">{__("Insert word")}</div>
					<input 
						type="text" 
						value={this.state.newWord} 
						onChange={this.onnewWord} 
						className="my-2 p-2"
						autoFocus={true}
					/>
					<small className="text-danger w-100 text-center">{this.state.newWordComment}</small>
					<Button fill={true} onClick={this.insertNew} intent={Intent.SUCCESS} minimal={true}>
						{__("do insert")}
					</Button>
				</Fragment>}
			>                    
				<Button 
					icon="plus" 
					intent={Intent.DANGER} 
					className="m-1" 
					minimal={true}
					onClick={() => {this.setState({isOpen:!this.state.isOpen})}}
				/>
			</Popover>
		</Fragment>
	}
	isDesabled()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		const text = this.state.value ? this.props.value.map((e, i) => <Tag minimal={true} key={i}> { e + " "} </Tag>) : null;
		return <div className="px-0 mb-1">
			{text}
		</div>
	}
	onnewWord = evt =>
	{
		this.setState({newWord:evt.currentTarget.value, newWordComment: ""});
	}
	insertNew = () =>
	{
		if(this.state.newWord == "")
		{
			this.setState({newWord:"", newWordComment: __("Insert not empty word")});
			return; 
		}
		let value = this.state.value;
		value.push(this.state.newWord);
		this.setState({value, newWord:"", newWordComment: "", isOpen:false});
		this.on(value);
	}
	onDeleteWord = id =>
	{
		console.log(id);
		let value = this.state.value.filter((e, i) => i != id);
		this.setState({value, newWord:"", newWordComment: "", isOpen:false});
		this.on(value);
	}
}