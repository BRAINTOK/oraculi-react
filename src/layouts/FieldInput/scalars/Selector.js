import React, {Component} from "react";
import Select from 'react-select'; //https://github.com/JedWatson/react-select
import {__} from "../../utilities/i18n";
import {  
	Intent, Tag,
	Button, ButtonGroup,
	Position, Popover, 
	InputGroup 
} from "@blueprintjs/core";
import ScalarField from "./ScalarField";
import chroma from 'chroma-js';
import {getIdName} from '../../schema';

export default class Selector extends ScalarField
{
	constructor(props)
	{
		super(props);
		let mock = {}
		mock[getIdName()] = -1;
		this.state = {
			value:this.props.value ? this.props.value : [ mock ]
		}
	}
	componentWillReceiveProps ( nextProps )
	{
		if( nextProps.data != this.props.data )
		{
			this.setState({ data: [...nextProps.data] });
			
		}
		if( nextProps.value != this.state.value )
		{
			this.setState({value: nextProps.value });
		}
	}
	isEnabled()
	{
		const {field, title, data, multiple} = this.props;
		const {value} = this.state;
		//console.log(typeof this.props.data[0][getIdName()]);
		const noneVal = this.props.data[0] && typeof this.props.data[0][getIdName()] == "string" ? "" : -1
		let d = [{value:noneVal, label:"---"}];
		d = d.concat(this.props.data 
			? 
			this.props.data.map((e,i) =>
			{				
				const label = e[ this.props.visibled_value ];
				return {value : e[getIdName()], label: label, color: e[ this.props.color ]}
			})
			: 
			null);
		//console.log(  d  );
		return <Select
			value={{ 
				value: value ? value[getIdName()] : null, 
				label: value ? value[ this.props.visibled_value ] : null 
			}}
			isMulti={false}
			isSearchable={true}
			onChange={this.handleChange}
			options={d}
			placeholder={__("Select...")}
			className="basic-multi-select"
			classNamePrefix="select"
		/>
	}
	isDesabled()
	{
		const {field, title, data, multiple} = this.props;
		const {value} = this.state;
		return <div className="px-0 mb-1">
		{ 
			value ? value[ this.props.visibled_value ] : null  
		
		}</div>
	}
	handleChange = newValue => 
	{	
		
		let nnn			=  {};
		nnn[getIdName()] = newValue.value;
		nnn[this.props.visibled_value] = newValue.label;
		// nnn.__typename	= newValue.label;
		// delete newValue.__typename;
		// console.log( newValue );
		this.on( nnn );
		this.setState({ value: nnn });
	}
	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}