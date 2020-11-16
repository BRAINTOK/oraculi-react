import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import TextEditor from "../../layouts/utilities/TextEditor";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing, default_menu} from "../../layouts/routing";

class Scalars extends Component
{
	
	render()
	{
		switch(this.props.type)
		{
			case "routing":
				return this.routing();
			case "text":
				return this.text();
			case "code":
				return this.code();
			default:
				return this.dflt();
				
		}
	}
	routing()
	{		
		console.log(this.props);
		const menuDatas = routing();
		let i = 0, menus_selector = [];
		for( var route in menuDatas)
		{ 
			const def = default_menu().filter(e => e.id == route)[0];
			if("extended_routes" != route)
			{
				const selected = route == this.props[this.props.title];
				menus_selector.push(
					<option key={i} value={route} selected={selected} >
						{ (def ? def.title : route) + " | " + menuDatas[route].length }
					</option>
				);
			}
			i++;
		}
		return <div className="row dat">
			<div className="col-md-3 layout-label">
				{ __(this.props.title) } 
			</div>
			<div className="col-md-9 layout-data"> 
				<select 
					className="form-control input dark" 
					value={this.props[this.props.title]} 
					onChange={this.onChangeEvent}
				>
					{menus_selector}
				</select>
			</div>
		</div>
	}
	text()
	{
		
		return <div className="row dat">
			<div className="col-md-3 layout-label">
				{ __(this.props.title) } 
			</div>
			<div className="col-md-9 layout-data"> 
				<TextEditor text={this.props[this.props.title]} onChange={this.onChange}/>
			</div>
		</div>
	}
	code()
	{
		
		return <div className="row dat">
			<div className="col-md-3 layout-label">
				{ __(this.props.title) } 
			</div>
			<div className="col-md-9 layout-data"> 
				<textarea  
					className="form-control"
					rows={10}
					onChange={this.onChangeEvent}
				>
					{this.props[this.props.title]}
				</textarea>
			</div>
		</div>
	}
	dflt()
	{
		
		return <div className="row">
			<div className="col-md-3">
				{ __(this.props.title) }  
			</div>
			<div className="col-md-9">
				<textarea  
					className="form-control"
					rows={1}
					onChange={this.onChangeEvent}
				>
					{this.props[this.props.title]}
				</textarea>
			</div>
		</div>
	}
	onChangeEvent = evt =>
	{ 
		const val = evt.currentTarget.value;
		const type = this.props.title;
		console.log(type, val);
		this.props.onChange(type, val);
	}
	onChange = val =>
	{
		const type = this.props.title; 
		console.log(type, val);
		this.props.onChange(type, val);
	}
}
export default Scalars;