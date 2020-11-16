import React, {Component, Fragment} from "react";
import ReactDOM from 'react-dom';
import {__} from "../../../layouts/utilities/i18n";
import {Button, ButtonGroup, Intent, Popover, Position, Dialog} from "@blueprintjs/core";
import DataContext from "../DataContext";
import FloatSetting from "./FloatSetting";
import $ from "jquery";


class FloatDrawer extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isAddFloat 		: this.props.isAddFloat, 
			isDrawFloat 	: false, 
			newFloatPos 	: { 
				x: {value:0, psnt:0, dst:"T" },
				y: {value:0, psnt:0, dst:"L"},
				w: {value:0, psnt:0},
				h: {value:0, psnt:0},
				o: {value:0, psnt:0} 
			},
			floatData : { }  
		};
		this.car = React.createRef();
	}	
	componentWillUpdate(nextProps)
	{
		if(nextProps.is_edit != this.state.is_edit)
		{
			this.setState({is_edit: nextProps.is_edit});
		}
		if(nextProps.isAddFloat != this.state.isAddFloat)
		{
			this.setState({isAddFloat: nextProps.isAddFloat});
		}
	}
	componentDidMount() 
	{  
		document.body.addEventListener('click', this.onMouseLeaveHandler); 
		document.addEventListener('mousedown', this.onAddFloatPosition); 
		//document.body.addEventListener('mouseover', this.onOver); 
	}
	componentWillUnmount() 
	{
		document.body.removeEventListener('click', this.onMouseLeaveHandler);
		document.removeEventListener('mousedown', this.onAddFloatPosition);
		//document.body.removeEventListener('mouseover', this.onOver); 
	}
	onOver = e =>
	{	
		const domNode = ReactDOM.findDOMNode( this );
		if ( domNode )	
		{
			this.setState({  
				isShowReg : !this.state.isShowReg
			});
		}
	}
	onMouseLeaveHandler = e =>
	{	
		const domNode = ReactDOM.findDOMNode( this );
		if (!domNode || !domNode.contains(e.target))	
		{
			this.setState({  
				isAddFloat: false,
				// isShowReg: false,
				isDrawFloat: false
			});
		}
		document.removeEventListener('mousemove', this.onDrawFloatPosition);
	}
	onDrawFloatPosition = evt =>
	{
		if(!this.state.is_edit  || !this.state.isAddFloat || !this.state.isDrawFloat) return;
		const offset = $( "#section-" + this.props.getID ).offset(); 
		const w = parseInt( $( "#section-" + this.props.getID ).width() );
		const h = parseInt( $( "#section-" + this.props.getID ).height() );
		const x = Math.abs( evt.offsetX  - this.state.newFloatPos.x.value + window.scrollX );
		const y = Math.abs( evt.offsetY  - this.state.newFloatPos.y.value);
		this.setState({  
			newFloatPos : {
				x : this.state.newFloatPos.x,
				y: this.state.newFloatPos.y,
				w: { 
					value: x, 
					psnt: parseInt( x / w * 100), 
					ei:"px"
				},
				h: { 
					value: y, 
					psnt : parseInt( y / h * 100),
					ei:"px"
				},
				o: { value: 1, ei:"%"},				
			}
		});
		
	}
	onAddFloatPosition = evt => 
	{
		if(!this.state.is_edit || !this.state.isAddFloat) return;
		const offset = $("#section-" + this.props.getID ).offset(); 
		const w = parseInt( $( "#section-" + this.props.getID ).width() );
		const h = parseInt( $( "#section-" + this.props.getID ).height() );
		const x = Math.abs( evt.offsetX + window.scrollX );
		const y = Math.abs( evt.offsetY );
		this.setState({ 
			isDrawFloat : true,
			isShowReg : true,
			newFloatPos : {
				x: { 
					value: x, 
					psnt: parseInt( x / w * 100),
					ei:"px",
					dst:"L"
				},
				y: { 
					value: y, 
					psnt : parseInt( y / h * 100),
					ei:"px",
					dst:"T"
				},
				w: {
					value: 0, 
					psnt : 0,
					ei:"px"
				},
				h: { 
					value: 0, 
					psnt : 0,
					ei:"px"
				},
				o: { 
					value: 0, 
					psnt : 0,
					ei:"%"
				}
			}
		});
		document.addEventListener('mousemove', this.onDrawFloatPosition);
	}
	render()
	{
		return <div 
			className="new-float-rect"
			style={{
				left:  this.state.newFloatPos.x.dst == "L" ? this.state.newFloatPos.x.value : "auto",
				right: this.state.newFloatPos.x.dst == "R" ? this.state.newFloatPos.x.value : "auto",
				top:   this.state.newFloatPos.y.dst == "T" ? this.state.newFloatPos.y.value : "auto",
				bottom:this.state.newFloatPos.y.dst == "B" ? this.state.newFloatPos.y.value : "auto",
				width:this.state.newFloatPos.w.value,
				height:this.state.newFloatPos.h.value,
				opacity:this.state.newFloatPos.o.value
			}} 
			onMouseEnter={ event => this.setState({ isShowReg : true  }) }
			onMouseOut={ this.onMouseOut }
			ref={ this.car }
		>
			<div className={ "layout-centered " + ( this.state.isShowReg ? " " : " hidden" ) } >
				<Button  
					icon="annotation"
					intent={Intent.NONE} 
					className={ this.state.newFloatPos.w.value ? " " : " hidden" } 
					onClick={this.onDialog}
				/>
				<Button 
					icon="move"
					intent={Intent.NONE} 
					className={ this.state.newFloatPos.w.value ? " hidden" : "hidden" }
				
				/>
				<Button 
					icon="cross"
					intent={Intent.DANGER} 
					className={ this.state.newFloatPos.w.value ? "" : "hidden" }
					onClick={ () => this.setState({ 
						newFloatPos: {
							x:{value:0, psnt:0, dst:"L" },
							y:{value:0, psnt:0, dst:"T" },
							w:{value:0, psnt:0},
							h:{value:0, psnt:0},
							o:{value:0, psnt:0}
						}
					})}
				/>
			</div>
			<div className="botton-right-button" /> 
			<div className={ this.state.isShowReg ? "float-draw-info" : "hidden"}>
				<div >
					<span>X</span> 
					<div 
						className={"dat " + ( this.state.newFloatPos.x.ei == "px" ? " active" : "" ) }
						i={"x"} 
						onClick={this.onEI}
					>
						{
							this.state.newFloatPos.x 
								? 
								"" + this.state.newFloatPos.x.value + this.state.newFloatPos.x.ei 
								: 
								""
						}
					</div>
					<div
						className={"prst " + ( this.state.newFloatPos.x.ei == "%" ? " active" : "" ) } 
						i={"x"} 
						onClick={this.onPRST}
					>
						 {this.state.newFloatPos.x.psnt + "%"}
					</div>
					<span 
						className="pointer" 
						onClick={this.onH}						
						title={this.state.newFloatPos.x.dst == "L" ? "from left" : "from right"}
					>
						{ this.state.newFloatPos.x.dst }
					</span> 
				</div>
				<div >
					<span>Y</span>  
					<div
						className={"dat" +( this.state.newFloatPos.y.ei == "px" ? " active" : "" ) } 
						i={"y"} 
						onClick={this.onEI}
					>
						{this.state.newFloatPos.y.value + "px"}
					</div>
					<div 
						className={"prst " + ( this.state.newFloatPos.y.ei == "%" ? " active" : "" ) } 
						i={"y"} 
						onClick={this.onPRST}
					>
						 {this.state.newFloatPos.y.psnt + "%"}
					</div>
					<span 
						className="pointer" 
						onClick={this.onV}
						title={this.state.newFloatPos.y.dst == "T" ? "from top" : "from bottom"}
					>
						{ this.state.newFloatPos.y.dst }
					</span> 
				</div>
				<div >
					<span>W</span> 
					<div 
						className={"dat" +( this.state.newFloatPos.w.ei == "px" ? " active" : "" ) } 
						i={"w"} 
						onClick={this.onEI}
					>
						{this.state.newFloatPos.w.value + "px"}
					</div>
					<div 
						className={"prst " + ( this.state.newFloatPos.w.ei == "%" ? " active" : "" ) } 
						i={"w"} 
						onClick={this.onPRST}
					>
						 {this.state.newFloatPos.w.psnt + "%"}
					</div>
				</div>
				<div >
					<span>H</span>  
					<div
						className={"dat" +( this.state.newFloatPos.h.ei == "px" ? " active" : "" ) } 
						i={"h"} 
						onClick={this.onEI}
					>
						{this.state.newFloatPos.h.value + "px"}
					</div>
					<div 
						className={"prst " + ( this.state.newFloatPos.h.ei == "%" ? " active" : "" ) } 
						i={"h"} 
						onClick={this.onPRST}
					>
						 {this.state.newFloatPos.h.psnt + "%"}
					</div>
				</div>
			</div>
			<Dialog
				isOpen={this.state.isDialog}
				title={"--"}
				onClose={this.onDialog}
			>
				<FloatSetting
					position={this.state.newFloatPos} 
					isNew={true}
					onChange={this.onChange}
				/>
			</Dialog>
		</div>
	}
	onEI = evt =>
	{
		const i = evt.currentTarget.getAttribute("i") ;
		let newFloatPos = {...this.state.newFloatPos};
		newFloatPos[i].ei = "px" ;		
		this.setState({newFloatPos});
	}
	onPRST = evt =>
	{
		const i = evt.currentTarget.getAttribute("i");
		let newFloatPos = {...this.state.newFloatPos};
		newFloatPos[i].ei = "%";		
		this.setState({newFloatPos});
	}
	onH = () =>
	{
		let newFloatPos = {...this.state.newFloatPos};		
		const offset = $( "#section-" + this.props.getID ).offset(); 
		const w = parseInt( $( "#section-" + this.props.getID ).width() ); 
		if(newFloatPos.x.dst == "L")
		{
			newFloatPos.x.dst 		= "R";
			newFloatPos.x.value 	= w   - newFloatPos.x.value - newFloatPos.w.value;
			newFloatPos.x.psnt 		= 100 - newFloatPos.x.psnt  - newFloatPos.w.psnt;
		}
		else
		{
			newFloatPos.x.dst 		= "L"; 
			newFloatPos.x.value 	= w   - newFloatPos.x.value - newFloatPos.w.value;
			newFloatPos.x.psnt 		= 100 - newFloatPos.x.psnt  - newFloatPos.w.psnt;
		}
		this.setState({newFloatPos});		
	}
	onV = () =>
	{
		let newFloatPos = {...this.state.newFloatPos};
		const offset = $( "#section-" + this.props.getID ).offset();  
		const h = parseInt( $( "#section-" + this.props.getID ).height() );
		if(newFloatPos.y.dst == "T")
		{
			newFloatPos.y.dst 		= "B";
			newFloatPos.y.value 	= h   - newFloatPos.y.value - newFloatPos.h.value;
			newFloatPos.y.psnt 		= 100 - newFloatPos.y.psnt  - newFloatPos.h.psnt;
		}
		else
		{
			newFloatPos.y.dst 		= "T"; 
			newFloatPos.y.value 	= h   - newFloatPos.y.value - newFloatPos.h.value;
			newFloatPos.y.psnt 		= 100 - newFloatPos.y.psnt  - newFloatPos.h.psnt;
		}
		this.setState({newFloatPos});	
	}
	onDialog = () =>
	{
		this.setState({isDialog:!this.state.isDialog});
	}
	onChange = data =>
	{
		///console.log( data, this.props );
		this.props.onUpdateFloat(data, "no-float-id", this.props.getID)
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
}
export default FloatDrawer;