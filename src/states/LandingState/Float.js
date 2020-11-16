import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import {components} from "./Section";
import $ from "jquery";
import Title from "./Title";
import FloatSetting from "./edit/FloatSetting";
import { Button, Intent, Icon, Dialog, ButtonGroup, Popover } from "@blueprintjs/core";

class Float extends Component
{
	
	state = {
		...this.props, 
		current_type 	: this.props.type,
		dwidth			: document.body.clientWidth,
		isOpen 			: false,
		isShowReg 		: false
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
			dheight: document.body.clientHeight
			
		});
	}
	componentDidUpdate(nextProps)
	{
		//console.log(nextProps);
		let isUpdate = false;
		let state = { };
		["is_edit", "data", "class_name", "style", "type", "position",  ]
			.forEach((e, i) =>
			{
				if(nextProps[e] != this.state[e])
				{
					isUpdate = true;
					state[e] = nextProps[e];			
				}
			})
		if( isUpdate )
		{
			//console.log(state);
			this.setState(state);
		}
	}
	render()
	{
		const { class_name, style, position, is_edit, type, isShowReg, isShowDelete } = this.state;
		//console.log( is_edit );
		const _Component = type ? components[ type ].c : Title;
		const size = "mc"; 
			
		const editble = is_edit && ( isShowReg || isShowDelete) 
			?
			<Fragment>
				<div className="float-btns">
					<div className={ " layout-centered " } >
						<Button  
							icon="annotation"
							intent={Intent.NONE} 
							className={ "" } 
							onClick={this.onDailogHandler}
						/>
						<Button 
							icon="move"
							intent={Intent.NONE} 
							className={ "hidden" }
						
						/>
						<Popover
							isOpen={ isShowDelete }
							content={
								<div className="p-3">
									<div>
										<div className="mb-2">
											{__("Delete this Float?")}
										</div>
										<ButtonGroup className="w-100">
											<Button intent={Intent.NONE} fill={true} onClick={this.onRemoveFloat}>
												{__("Yes")}
											</Button>
											<Button icon="cross" onClick={this.onDelete}  intent={Intent.DANGER} />
										</ButtonGroup>
									</div>
								</div>
							}
						>
							<Button 
								icon="cross"
								intent={Intent.DANGER} 
								className={ "" } 
								onClick={this.onDelete}
							/>
						</Popover>
					</div>
				</div>
				{/*
				<div className="botton-right-button" />
				<div className={ "float-draw-info" }>
					<div >
						<span>X</span> 
						<div 
							className={"dat " + ( position[size].x.ei == "px" ? " active" : "" ) }
							i={"x"} 
							onClick={this.onEI}
						>
							{position[size].x.value + position[size].x.ei}
						</div>
						<div
							className={"prst " + ( position[size].x.ei == "%" ? " active" : "" ) } 
							i={"x"} 
							onClick={this.onPRST}
						>
							 {position[size].x.psnt + "%"}
						</div>
						<span 
							className="pointer" 
							onClick={this.onH}						
							title={position[size].x.dst == "L" ? "from left" : "from right"}
						>
							{ position[size].x.dst }
						</span> 
					</div>
					<div >
						<span>Y</span>  
						<div
							className={"dat" +( position[size].y.ei == "px" ? " active" : "" ) } 
							i={"y"} 
							onClick={this.onEI}
						>
							{position[size].y.value + "px"}
						</div>
						<div 
							className={"prst " + ( position[size].y.ei == "%" ? " active" : "" ) } 
							i={"y"} 
							onClick={this.onPRST}
						>
							 {position[size].y.psnt + "%"}
						</div>
						<span 
							className="pointer" 
							onClick={this.onV}
							title={position[size].y.dst == "T" ? "from top" : "from bottom"}
						>
							{ position[size].y.dst }
						</span> 
					</div>
					<div >
						<span>W</span> 
						<div 
							className={"dat" +( position[size].w.ei == "px" ? " active" : "" ) } 
							i={"w"} 
							onClick={this.onEI}
						>
							{ position[size].w.value + "px" }
						</div>
						<div 
							className={"prst " + ( position[size].w.ei == "%" ? " active" : "" ) } 
							i={"w"} 
							onClick={this.onPRST}
						>
							 { position[size].w.psnt + "%"}
						</div>
					</div>
					<div >
						<span>H</span>  
						<div
							className={"dat" +( position[size].h.ei == "px" ? " active" : "" ) } 
							i={"h"} 
							onClick={this.onEI}
						>
							{ position[size].h.value + "px"}
						</div>
						<div 
							className={"prst " + ( position[size].h.ei == "%" ? " active" : "" ) } 
							i={"h"} 
							onClick={this.onPRST}
						>
							 { position[size].h.psnt + "%"}
						</div>
					</div>
				</div>
				*/}
			</Fragment>
			:
			null;
		return <div 
			id={"float-" + this.state.float_id }
			className={"landing-fload " + ( is_edit ? " edit " : "" ) + class_name} 
			style={{
				//...style,
				position: "absolute",
				left	: this.getDst("x") =="L" ?  this.getAttr("x") : "auto",
				right	: this.getDst("x") =="R" ?  this.getAttr("x") : "auto",
				top		: this.getDst("y") =="T" ?  this.getAttr("y") : "auto", 
				bottom	: this.getDst("y") =="B" ?  this.getAttr("y") : "auto", 
				width	: this.getAttr("w"),
				height	: this.getAttr("h") 
			}}
			onMouseEnter={ event => this.setState({ isShowReg : true  }) }
			onMouseOut={ this.onMouseOut }
		>
			<_Component 
				{ ...this.props } 
				columns={ 0 } 
				is_edit={ is_edit } 
				level={this.props.level+1}
			/> 
			{editble}
			<Dialog
				isOpen={this.state.isOpen}
				onClose={this.onDailogHandler}
				className="little2"
				title={__( "Edit Float" ) }
			>
				<div className="p-0">
					<FloatSetting
						float_id={ this.props.float_id }
						onChange={this.onUpdate}
					/>
				</div> 
			</Dialog>
		</div>
	}
	getScreenSize()
	{
		let p = "mc";
		if( this.state.dwidth > 940 )
		{
			p = "lg";
		}
		else if( this.state.dwidth > 760 )
		{
			p = "xl";
		}
		else if(this.state.dwidth > 560 )
		{
			p = "sm";
		}
		return p;
	}
	getDst( coord )
	{
		const { class_name, style, position } = this.props;
		if(!position) 
		{
			return;
		}
		let p = this.getScreenSize();
		// console.log( coord, p,  position.mc[coord], position );
		return position[p][coord] ? position[p][coord].dst : position.mc[coord].dst;
			
	}
	getAttr(coord)
	{
		const { class_name, style, position } = this.props;
		let p = this.getScreenSize();		
		if(!position) 
		{
			return;
		}
		//console.log( coord, p, position[p], position[p][coord] );
		const ei = position[p][coord] ? position[p][coord].ei : position.mc[coord].ei;
		
		let coo =  position[p][coord] ? position[p][coord].value : position.mc[coord].value;
		coo = isNaN( parseInt( coo ) ) ? coo : parseInt( coo ) ;
		coo = ei == "%" ? coo + "%" : coo;
		//console.log( coord,  position.mc[coord].ei, ei, position, coo );
		return coo;
	} 
	
	onDailogHandler = () =>
	{
		this.setState({isOpen : !this.state.isOpen});
	}
	onMouseOut = evt =>
	{
		const rect = evt.currentTarget.getBoundingClientRect();
		const usl = evt.clientX + window.scrollX > rect.left + window.scrollX 
			&& evt.clientX + window.scrollX < rect.right + window.scrollX + 124 
			&& evt.clientY + window.scrollY > rect.top + window.scrollY  
			&& evt.clientY + window.scrollY < rect.bottom + window.scrollY;
		//console.log( rect.right + 124, usl );
		if( usl )
			return;
		this.setState({ isShowReg : false })
	}
	onDelete =() =>
	{
		this.setState({ isShowDelete : !this.state.isShowDelete })
		//
	}
	onRemoveFloat = () =>
	{
		this.props.onRemoveFloat( this.state.float_id )
	}
	onUpdate = (data, float_id) =>
	{
		console.log( data );
		this.props.onUpdate(data, float_id);
		this.onDailogHandler();
	}
}
export default Float;