import React, {Component, Fragment} from "react";
import {__} from "../../../layouts/utilities/i18n";
import LayoutIcon from "../../../layouts/LayoutIcon"; 
import DataContext from "../DataContext";
import HTML from "../HTML";
import {components} from "../Section";
import InputForm from "./InputForm"; 
import InputPosition from "./InputPosition"; 
import {Button, ButtonGroup, Intent, Popover, Position, Tabs, Tab} from "@blueprintjs/core";

import matrix from "../data/matrix";
import FieldInput from "../../../layouts/FieldInput";

export function positions()
{
	return [
		{
			id: "lg",
			title: "Large",
			icon: "fas fa-tv"
		},
		{
			id: "xl",
			title: "Screen",
			icon: "fas fa-desktop"
		},
		{
			id: "sm",
			title: "Tablet",
			icon: "fas fa-tablet-alt"
		},
		{
			id: "mc",
			title: "Mobile",
			icon: "fas fa-mobile-alt"
		}
	];
}
export function defaultPosition()
{
	return {
		x: {
			value	: 0,
			ei		: "px",
			dst		: "L"		
		},
		y: {
			value	: 0,
			ei		: "px",
			dst		: "T"		
		},
		w: {
			value	: 0,
			ei		: "px",
			dst		: ""		
		},
		h: {
			value	: 0,
			ei		: "px",
			dst		: ""		
		}
	}
}
class FloatPosition extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			...props,
			current : "lg"
		}
	}
	componentWillReceiveProps(nextProps)
	{
		let state = {};
		if( nextProps.float_id != this.state.float_id )
		{
			state.float_id = nextProps.float_id;
		}
		if(nextProps.position != this.state.position)
		{
			state.position = nextProps.position;
		}
		if( Object.keys(state).length > 0 )
			this.setState( state );
	}
	componentDidMount()
	{
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	componentWillUnmount() 
	{
		window.removeEventListener('resize', this.updateWindowDimensions);
	}
	updateWindowDimensions = () =>
	{
		
		this.setState({ 
			dwidth : document.body.clientWidth, 
			dheight: document.body.clientHeight,
			current: this.getScreenSize( document.body.clientWidth )
		});
	}
	getScreenSize(dwidth)
	{
		let p = "mc";
		if( dwidth > 940  )
		{
			p = "lg";
		}
		else if( dwidth > 760 )
		{
			p = "xl";
		}
		else if( dwidth > 560)
		{
			p = "sm";
		}
		console.log( p, dwidth );
		return p;
	}
	
	render()
	{
		const {current} = this.state;
		const pos = Object.keys(this.state.position[current]).length > 0
			?
			this.state.position[current]
			:
			this.state.position.mc
				?
				{ ...this.state.position.mc }
				:
				defaultPosition();
		
		let btns=[];
		//console.log(current, pos);
		positions().forEach((e, i) =>
		{
			let cl = e.id == current ? "active " : " " ;
			btns.push(<div
				key={i} 
				type={e.id}
				className={"l-icon " + cl} 
				onClick={this.onSwitch}
			>
				<LayoutIcon
					src={ e.icon + " fa-3x pt-3"}
					className="layout-icon mb-1"
				/>
				<div className={""}>
					{ __(e.title) }
				</div>
			</div>)
			
		});
		return <div className="d-flex px-4 pb-2 flex-column">
			<div className="d-flex justify-content-center pb-3 flex-wrap">
				{btns}
			</div>
			<div className="flex-grow-100">
				{
					this.posit(pos)
				}
			</div>
		</div>
	}
	posit(pos)
	{
		if(this.state.hide) return ;
		return <div className=""> 
			<FieldInput
				field={ "x" }
				key={ "x" }
				title={ matrix.ScreenSize.x.title }
				type={ "ScreenSize" }
				id={ this.state.float_id }
				{ ...matrix.ScreenSize.x } 
				on={ value => this.onPosition( "x", value) }
				onChange={ value => this.onPosition( "x", value) }
				editable = { true }
				value={ pos.x }
				vertical={ false }
			/>
			<FieldInput
				field={ "y" }
				key={ "y" }
				title={ matrix.ScreenSize.y.title }
				type={ "ScreenSize" }
				id={ this.state.float_id }
				{ ...matrix.ScreenSize.y } 
				on={ value => this.onPosition( "y", value) }
				onChange={ value => this.onPosition( "y", value) }
				editable = { true }
				value={ pos.y }
				vertical={ false }
			/>
			<FieldInput
				field={ "w" }
				key={ "w" }
				title={ matrix.ScreenSize.w.title }
				type={ "ScreenSize" }
				id={ this.state.float_id } 
				{ ...matrix.ScreenSize.w }
				on={ value => this.onPosition( "w", value) }
				onChange={ value => this.onPosition( "w", value) }
				editable = { true }
				value={ pos.w }
				vertical={ false }
			/>
			<FieldInput
				field={ "h" }
				key={ "h" }
				title={ matrix.ScreenSize.h.title }
				type={ "ScreenSize" }
				id={ this.state.float_id } 
				on={ value => this.onPosition( "h", value) }
				onChange={ value => this.onPosition( "h", value) }
				{ ...matrix.ScreenSize.h }
				editable = { true }
				value={ pos.h }
				vertical={ false }
			/>
		
		</div>
	}
	onPosition = (field, value ) =>
	{
		let pos = Object.keys(this.state.position[this.state.current]).length > 0
			?
			this.state.position[this.state.current]
			:
			this.state.position.mc
				?
				{ ...this.state.position.mc }
				:
				defaultPosition();
		pos[field] = value; 
		
		this.props.onPosition(pos, this.state.current);
	}
	onSwitch = evt =>
	{
		const type = evt.currentTarget.getAttribute("type");
		this.setState(
			{hide : true},
			() => this.setState({current : type, hide : false})
		); 
	}
}
export default FloatPosition;