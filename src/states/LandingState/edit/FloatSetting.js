import React, {Component, Fragment} from "react";
import {__} from "../../../layouts/utilities/i18n";
import LayoutIcon from "../../../layouts/LayoutIcon"; 
import DataContext from "../DataContext";
import HTML from "../HTML";
import {components} from "../Section";
import InputForm from "./InputForm"; 
import InputPosition from "./InputPosition"; 
import FloatPosition from "./FloatPosition"; 
import {Button, ButtonGroup, Intent, Popover, Position, Tabs, Tab} from "@blueprintjs/core";

import matrix from "../data/matrix";
import FieldInput from "../../../layouts/FieldInput";

class FloatSetting extends Component
{
	constructor(props)
	{
		super(props);
		const floatData = !props.isNew
			?
			DataContext.getFloatId( props.float_id )
			:
			this.newFloat(); 
		this.state = {
			...floatData,
			current_type: floatData.type ? floatData.type : "html", 
			tab:"types"
		}
	}
	render()
	{
		//console.log( this.state);
		return <div >
			<Tabs
				onChange={ this.onTab }
				animate={ false }
				id="TabsType"
				key={ "horizontal" } 
				vertical={ false }
				className="tab-light-head"
			>
				<Tab id="types" title={__("Type")} panel={this.types()} />
				<Tab 
					id="prm" 
					title={ components[this.state.current_type].title } 
					panel={ 
						<InputForm 
							{ ...this.state }
							source={ this.state.current_type }
							id={ this.state.float_id }
							data={this.state.data}
							sourceType="float"
							on={this.onInputForm}
						/>
					} 
				/>
				<Tab id="html"  title={__("Style")}  panel={this.html()}  />
				<Tab id="postion"  title={__("Position")}  panel={this.postion()}  />
			</Tabs> 
			<div className="layout-simple-center p-2">
				<Button intent={Intent.DANGER} onClick={this.onClick}>
					{__("Update float")}
				</Button>
			</div>
		</div>
	}
	
	onTab = navbarTabId => this.setState({ navbarTabId });
	
	html()
	{
		//console.log( this.state.float_id, this.state );
		return <div className="p-4"> 			
			<FieldInput
				field={ "float_id" }
				key={ "float_id" }
				title={ "Unique html ID" }
				prefix="float-"
				type="string"
				id={ this.state.float_id } 
				on={ value => this.on( "float_id", value) } 
				onChange={ value => this.on( "float_id", value) }
				editable = { true }
				value={ this.state.float_id }
				vertical={ false }
			/>				
			<FieldInput
				field={ "class" }
				key={ "css-class" }
				title={ "css-class" }
				type="Style"
				id={ this.state.float_id } 
				on={ value => this.on( "class_name", value) } 
				onChange={ value => this.on( "class_name", value) }
				editable = { true }
				value={ this.state.class_name }
				vertical={ false }
			/>	
			<FieldInput
				field={ "style" }
				key={ "css-style" }
				title={ "css-style" }
				{...{type: "landing_object", visualization: "landing-object", landing_object: "Style"}}
				id={ this.state.float_id } 
				on={ this.onStyle }
				{ ...matrix.Style}
				onChange={ this.on }
				editable = { true }
				value={ this.state.style }
				vertical={ false }
			/>
		</div>
	}
	postion()
	{
		//console.log( this.state )
		return <FloatPosition
			float_id={this.state.float_id}
			position={this.state.position}
			onPosition={this.onPosition}
		/>
	}
	types()
	{
		let btns = [];
		for(let c in components)
		{
			let cl = c == this.state.current_type ? "active " : " " ;
			const ccl = c == this.state.type ? " text-danger " : " ";
			btns.push( <div 
				key={c} 
				type={c}
				className={"l-icon " + cl} 
				onClick={this.onTypeSwitch}
			> 
				<div>
					<LayoutIcon
						src={ components[ c ].icon }
						className="layout-icon"
					/>
					<div className={ccl}>
						{ __(components[ c ].title) }
					</div>
				</div>
			</div> ) 
		}
		return <div className="p-4">
			{ btns } 
		</div>
	}
	
	onTypeSwitch = evt =>
	{
		const current_type = evt.currentTarget.getAttribute("type");
		this.setState({current_type, is_change_type_enbl : current_type != this.state.type });
	}
	onClick = () =>
	{
		this.props.onChange( 
			{
				...this.state ,
				type : this.state.current_type
			}, 
			this.props.float_id,
			this.props.getID
		)
	}
	onStyle = val =>
	{
		console.log( val );
		this.setState({ style: val });
	}
	on = (field, value) =>
	{
		let state = {...this.state};
		state[field] = value;
		console.log(field, value, state);
		this.setState(state)
	}
	onInputForm = (value, field) =>
	{
		let data = {...this.state.data};
		data[field] = value;
		console.log( field, value, data );
		this.setState({ data });
	}
	onPosition = ( value, size) =>
	{
		let position = {...this.state.position };
		console.log( position )
		position[size] = value;
		console.log( value, size )
		console.log( position )
		this.setState({ position });
	}
	newFloat()
	{
		// console.log( this.props);
		return {
			float_id: DataContext.getMaxFloatID( true ) + 1,
			title : {text:""},								
			composition : {
				columns : 1,
				type : 0,
				proportia : [50, 50],
				is_blocked : 0,
				text_before: "",
				text_after : ""
			},
			position:{
				lg : {},
				xl : {},	
				sm : {},
				mc : {
					x: {
						value: this.props.position.x.ei == "px" ? this.props.position.x.value : this.props.position.x.psnt,
						ei: this.props.position.x.ei,
						dst: this.props.position.x.dst
					},
					y: {
						value: this.props.position.y.ei == "px" ? this.props.position.y.value : this.props.position.y.psnt,
						ei: this.props.position.y.ei,
						dst: this.props.position.y.dst
					},
					w: {
						value: this.props.position.w.ei == "px" ? this.props.position.w.value : this.props.position.w.psnt,
						ei: this.props.position.w.ei
					},
					h: {
						value: this.props.position.h.ei == "px" ? this.props.position.h.value : this.props.position.h.psnt,
						ei: this.props.position.h.ei
					}
				}
			},
			class_name : "",
			style : { },
			type: "",
			data: { }
		}
	}
	
	getDst( coord )
	{
		const { class_name, style, position } = this.props;
		let p = this.getScreenSize();
		//console.log( coord, p,  position.mc[coord], position );
		return position[p][coord] ? position[p][coord].dst : position.mc[coord].dst;
			
	}
	getAttr(coord)
	{
		const { class_name, style, position } = this.props;
		let p = this.getScreenSize();
		
		//console.log( coord, p, position[p], position[p][coord] );
		const ei = position[p][coord] ? position[p][coord].ei : position.mc[coord].ei;
		
		let coo =  position[p][coord] ? position[p][coord].value : position.mc[coord].value;
		coo = isNaN( parseInt( coo ) ) ? coo : parseInt( coo ) ;
		// coo = ei == "%" ? coo + "%" : coo;
		// console.log( coord,  position.mc[coord].ei, ei, position, coo );
		return coo;
	} 
	
}
export default FloatSetting;