import React, {Component} from "react";
import Select from 'react-select'; //https://github.com/JedWatson/react-select
import {__} from "../utilities/i18n";
import {  
	Intent, Tag,
	Button, ButtonGroup,
	Position, Popover, 
	InputGroup 
} from "@blueprintjs/core";
import ScalarField from "./ScalarField";
import chroma from 'chroma-js';

export default class SingleSelect extends ScalarField
{
	constructor(props)
	{
		super(props);
		this.state = {
			value:this.props.value ? this.props.value : [ {_id:-1} ]
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
			this.setState({value: nextProps.value ? nextProps.value: [ {_id:-1}  });
		}
	}
	isEnabled()
	{
		const {field, title, data, multiple} = this.props;
		const {value} = this.state;
		const d = this.props.data 
			? 
			this.props.data.map((e,i) =>
			{				
				const label = Array.isArray(this.props.visibled_value)
					?
					this.props.visibled_value.map(ee => e[ee]).join(" ")
					:
					e[ this.props.visibled_value ];
				return {value : e._id, label: label, color: e[ this.props.color ]}
			})
			: 
			[];
		//console.log(field, data, d, this.props.visibled_value);
		const options = ( value || [] ).map((e, i) =>
		{			
			const label = Array.isArray(this.props.visibled_value)
				?
				this.props.visibled_value.map(ee => e[ee]).join(" ")
				:
				e[ this.props.visibled_value ];
			const dat = { value : e._id, label: label, color: e.color };
			return dat;
		});
		
		const colourStyles = 
		{
		  control: styles => ( {...styles, backgroundColor: '#EFEFEF', color: data.color ? data.color : "#333" } ),
		  option: (styles, { data, isDisabled, isFocused, isSelected }) => 
		  {
			const clr = data.color;
			const color = chroma(clr || "#111");
			return {
			  ...styles,
			  backgroundColor: isDisabled
				? null
				: isSelected
				? clr
				: isFocused
				? color.alpha(0.1).css()
				: null,
			  color: isDisabled
				? '#ccc'
				: isSelected
				? chroma.contrast(color, 'white') > 2
				  ? 'white'
				  : 'black'
				: clr,
			  cursor: isDisabled ? 'not-allowed' : 'default',

			  ':active': {
				...styles[':active'],
				backgroundColor: !isDisabled && (isSelected ? clr : color.alpha(0.3).css()),
			  },
			};
		  },
		  multiValue: (styles, { data }) => {
			const clr = data.color ? data.color : "#333";
			const color = chroma(clr || "#111");
			return {
			  ...styles,
			  backgroundColor: color.alpha(0.1).css(),
			};
		  },
		  multiValueLabel: (styles, { data }) => ({
			...styles,
			color: data.color ? data.color : "#111",
		  }),
		  multiValueRemove: (styles, { data }) => ({
			...styles,
			color: data.color ? data.color : "#333",
			':hover': {
			  backgroundColor: data.color ? data.color : "#333",
			  color: 'white',
			},
		  }),
		};
		
		return <Select
			value={options}
			styles={colourStyles}
			isMulti
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
			( value || [] ).map((e, i) => {
				const txt = e[ this.props.visibled_value ] ? e[ this.props.visibled_value ] : __("Untitled");
				return <Tag minimal={true} className="m-1" key={i}>{ txt }</Tag>
			}) 
		
		}</div>
	}
	handleChange = (newValue, actionMeta) => 
	{		
		const sel = newValue || [];
		const selected = sel.map(e => {
			let value={_id : e.value};
							
			const label = Array.isArray(this.props.visibled_value)
				?
				this.props.visibled_value.map(ee => e[ee]).join(" ")
				:
				e[ this.props.visibled_value ];
			
			value[ this.props.visibled_value ] = e.label;
			return value;
		})
		this.setState({ value: selected });
		this.on( selected );
	}
	onChange = evt =>
	{
		const selected = evt.currentTarget.selectedOptions;
		let value = [];
		for(let i in selected)
		{
			if(!selected[i].value) continue;
			let v = { _id: selected[i].value };
			v[this.props.visibled_value] = selected[i].label;
			value.push( v );
		}
		console.log( value );
		//this.setState({value: [selected]});
		//this.on( [selected] );
	}
	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}