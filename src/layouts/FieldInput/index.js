import React, {Component} from "react";
import addEmpty from "./scalars/addEmpty";
import String from "./scalars/String";
import Password from "./scalars/Password";
import Address from "./scalars/Address";
import TextField from "./scalars/TextField";
import ID from "./scalars/ID";
import URL from "./scalars/URL";
import Email from "./scalars/Email";
import Link from "./scalars/Link";
import Int from "./scalars/Int";
import ExtendedLink from "./scalars/ExtendedLink";
import DateTime from "./scalars/DateTime";
import RGB from "./scalars/RGB";
import Color from "./scalars/Color";
import Geo from "./scalars/Geo";
import MultiSelect from "./scalars/MultiSelect";
import Selector from "./scalars/Selector";
import Radio from "./scalars/Radio";
import Checkbox from "./scalars/Checkbox";
import Array from "./scalars/Array";
import Phone from "./scalars/Phone";
import Boolean from "./scalars/Boolean";
import Reloadbled from "./scalars/Reloadbled";
import Media from "./scalars/Media";
import Upload from "./scalars/Upload";
import Text from "./scalars/Text";
import FloatSlider from "./scalars/FloatSlider";
import Loading from "../utilities/Loading";

import {compose} from "recompose";
import ArrayPlus from "./components/ArrayPlus";
import ExternalPlus from "./components/ExternalPlus";
import ComponentPlus from "./components/ComponentPlus";
import getWidget, { initArea } from "../../layouts/utilities/getWidget";


export {addEmpty};
export {Color};
export {String};
export {Password};
export {Address};
export {TextField};
export {Email};
export {URL};
export {ID};
export {Link};
export {ExtendedLink};
export {DateTime};
export {RGB};
export {Geo};
export {MultiSelect};
export {Radio};
export {Checkbox};
export {Phone};
export {Array};
export {Boolean};
export {Reloadbled};
export {Media};
export {Int};
export {Text};
export {FloatSlider};

//TODO проверить все ли перенесено в отдельные файлы
export function toFieldInput( params )
{	
	//console.log(params);
	const {
		field, 
		description, 
		className, 
		external_state, 
		external_link_data,
		vertical, 
		list, 
		addList, 
		isOpen, 
		title, 
		value, 
		onChange, 
		type,
		step_size,
		min,
		max
	} = params; 
	
	const editable = typeof params.editable !== "undefined" ? params.editable : true;	
	const visibled_value = 
		params.visibled_value 
			? 
			params.visibled_value
			: 
			'title';      
	
	if(params.kind == "type" && params.component){

	}else if (params.type == "array" && params.component == "string"){

	}else{
		params.component = params.type
	}
	if (params.visualization) 
	{ 
		
		return initArea( params.visualization, { ...params } );
	}
	switch(type)
	{
		case "html":
			return <TextField
				title={ title }
				description={ description }
				field={ field }
				prefix={ params.prefix }
				posrfix={ params.posrfix }
				editable={ editable }
				className={ params.className }
				visibled_value={visibled_value}
				style={ params.style }
				value={ value }
				values={params.values}
				vertical={ vertical }
				on={ onChange }
			/>
		case "array":
			return ArrayPlus(params);
			break;
		case "external":
			return ExternalPlus(params);
			break;
		case "component":
			ComponentPlus(params);
			break;
		case "text":
			return (
				<Text
					title={ title }
					description={ description }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
			break;
		case "int":
		case "number":
			return (
				<Int
					title={ title }
					description={ description }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
			break;
		case "slider":
			return (
				<FloatSlider
					title={ title }
					description={ description }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value ? value : 0 }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
					min={min}
					max={max}
					step_size={step_size}
					
				/>
			);
			break;
		case "media":
			//TODO : требует обязательное поле с ID - имя поля + постфикс "_id"
			return (
				<Media
					title={ title }
					description={ description }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					id={ params._id }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
					media_id={ params[ field + "_id" ] }
				/>
			);
			break;
		case "upload":
			//TODO : требует обязательное поле с ID - имя поля + постфикс "_id"
			return (
				<Upload
					title={ title }
					description={ description }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					id={ params._id }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
			break;
		case "date":
			return (
				<DateTime
					component={ params.component }  
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className } 
					value={ value }
					values={params.values}
					visibled_value={visibled_value}
					vertical={ vertical }
					on={onChange}
				/>
			);
			break;
		case "color":
			return (
				<Color
					component={ params.component }
					field={ field }
					title={ title }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className }
					value={ value }
					visibled_value={visibled_value}
					values={params.values}
					vertical={ vertical }
					on={onChange}
				/>
			);
			break;
		case "rgb":
			return (
				<RGB 
					component={ params.component } 
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className } 
					value={ value } 
					visibled_value={visibled_value}
					values={params.values}
					vertical={ vertical }
					on={onChange}
				/>
			);
			break;
		case "boolean":
			return (
				<Boolean 
					component={ params.component }
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className } 
					value={ value }
					values={params.values}
					vertical={ vertical }
					_id={params._id}
					on={onChange}
				/>
			);
			break;
		case "phone":
			return (
				<Phone 					
					component={ params.component } 
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className } 
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={onChange}
				/>
			);
			break;
		case "geo":
			//console.log(params._id);
			return (
				<Geo					
					component={ params.component } 
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className } 
					value={ value }
					values={params.values}
					vertical={ vertical }
					_id={params._id}
					on={onChange}
					isOpen={isOpen}
				/>
			);
			break;
		case "address":
			//console.log(params._id);
			return (
				<Address
					component={ params.component }
					title={ title }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					field={ field }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
			break;
		case "select":
			let listData = [];
			if(addList)
			{
				//listData = data[aq].concat( addList );
			}
			else if(list)
			{
				//listData = list;
			}
			else
			{
				//listData = data[aq];
			}
			return (
				<MultiSelect 
					component={ params.component } 
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className } 
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={onChange}
					data={listData}
				/>
			);
			break;
		case "checkbox":
			return (
				<Checkbox 
					component={ params.component } 
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className } 
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={onChange}
				/>
			);
			break;
		case "radio":
			// console.log(params);
			return (
				<Radio 
					component={ params.component } 
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className } 
					visibled_value={visibled_value}
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={onChange}
				/>
			);
			break;
		case "link":
			//console.log(value);
			return (
				<Link 
					field={ field }
					title={ title } 
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					className={ params.className } 
					value={ value }
					_id={params._id}
					external_state={external_state}
					external_link_data={external_link_data}
					vertical={ vertical }
				/>
			);
			break;
		case "email":
			return (
				<Email
					title={ title }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className }
					style={ params.style }
					value={ value }
					visibled_value={visibled_value}
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
			break;
		case "url":
			return (
				<URL
					title={ title }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
			break;
		case "reloaditabled":
			return (
				<Reloadbled
					title={ title }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
			break;
		case "id":
			return (
				<ID
					title={ title }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className }
					style={ params.style }
					visibled_value={visibled_value}
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
			break;
		case "password":
			return (
				<Password
					title={ title }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
		case "string":
		default:
			return (
				<String
					title={ title }
					field={ field }
					prefix={ params.prefix }
					posrfix={ params.posrfix }
					description={ description }
					editable={ editable }
					className={ params.className }
					visibled_value={visibled_value}
					style={ params.style }
					value={ value }
					values={params.values}
					vertical={ vertical }
					on={ onChange }
				/>
			);
	}
}

export default class FieldInput extends Component 
{
	constructor(props)
	{
		super(props);
		let state = { };
		for(var n in props)
		{ 
			state[n] = props[n];
		}
		this.state = state;
	}
	componentWillReceiveProps ( nextProps )
	{
		//console.log({...nextProps})
		//this.setState({...nextProps})
		let state = {};
		for(var n in nextProps)
		{ 
			if(nextProps[n] != this.state[n] && typeof nextProps[n] !== "function" )
			{
				state[n] = nextProps[n];
				//console.log( state[n], nextProps[n] );
			}
		}
		
		//console.log( Object.keys(state).length );
		if(Object.keys(state).length > 0)
		{
			this.setState(state);
		}
	}
	
	render() 
	{
		//console.log(this.state); 
		return toFieldInput( { ...this.state } );

	}
}