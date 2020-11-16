import React, {Component, Fragment} from "react";
import {__} from "../../utilities/i18n";
import { Tag, ButtonGroup, Button, Intent, Popover, Position } from "@blueprintjs/core";

//TODO rename to ScalarField
export default class ScalarField extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			value:this.props.value
		}
		window['form' + this.props._id] = this;
	}
	componentWillReceiveProps ( nextProps )
	{
		if(nextProps.value)
			this.setState({value:nextProps.value})
	}
	render()
	{
		//console.log(this.props.field);
		const { field, title, description } = this.props;
		const { value } = this.state;
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-9 layout-data";
		const descr = description
			?
			<Popover
				position={ Position.RIGHT }
				interactionKind={"hover"}
				content={ <div className="p-4 square">
					{__( description )}
				</div>}
			>
				<Button minimal={true} icon="help" />
			</Popover>
			:
			null
		return <div className="row dat" row_data={this.props.field}>
			<div className={col1}>
				{__( title )}
				{descr}
			</div>
			<div className={col2} >
			{
				this.props.prefix ? <span className="prefix">{this.props.prefix}</span> : null
			}
			{
				this.props.editable ? this.isEnabled() : this.isDesabled()
			}
			{
				this.props.postfix ? <span className="postfix">{this.props.postfix}</span> : null
			}
			</div>
		</div>
	}
	isEnabled()
	{
		const {field, title} = this.props; 
		let {value} = this.state;
		if(this.props.prefix && typeof this.state.value == "string"  )
		{
			value = this.state.value.replace(this.props.prefix, "");
		}
		return <Fragment>
			<input 
				autoFocus={this.props.autoFocus}
				type={this.props.type} 
				className={ (this.props.className ? this.props.className : "form-control input dark") + " flex-grow-100 pr-5" }
				value={ value ? value : ""}
				onChange={this.onChange}
			/>
			<Button 
				className="right"
				icon="cross"
				minimal={true}
				onClick={this.onClear}
			/>
		</Fragment>;
	}
	isDesabled()
	{
		const {field, title} = this.props;
		const visibled_value = this.props.visibled_value || "title";
		const {value} = this.state;
		return <div className="px-0 mb-1">
		{
			this.props.value 
				?
					visibled_value == field
						?
						<div className="lead">{ this.props.value + " "}</div>
						: 
						<Tag minimal={true} className="m-1">
							{ this.props.value + " " }
						</Tag>
					
				:
				null
		}
		</div>
	}
	onChange = evt =>
	{
		this.setState({value:evt.currentTarget.value});
		this.on(evt.currentTarget.value)
	}
	onClear = evt =>
	{
		this.setState({value : ""});
		this.on( "" );
	}
	on = val =>
	{
		if(!this.props.on) return;
		let value = this.props.prefix ?  val.replace(this.props.prefix, "") : val;
		this.props.on( value, this.props.field, this.props.title );
	}
}