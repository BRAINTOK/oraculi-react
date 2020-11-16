import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import {__} from "../../layouts/utilities/i18n";
import matrix from "../../states/LandingState/data/matrix";
import { Button, Intent, Icon, Dialog, Tag, Collapse } from "@blueprintjs/core";
import FieldInput from "../../layouts/FieldInput";
import ExternalStyle from "./ExternalStyle";

class Style extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...this.props,
			isCollapse:false,
			isExternal:false,
			down:false,
			dist:"",
			attr: "", 
			
			marginTop:50,
			marginLeft:5,
			marginRight:5,
			marginBottom:5,
			
		}
		this.ref = React.createRef();
	}
	
	componentDidMount() 
	{  
		document.body.addEventListener('click', this.onmUp); 
		document.addEventListener('mousemove', this.onmMove);
	}
	componentWillUnmount() 
	{
		document.body.removeEventListener('click', this.onmUp);
		document.removeEventListener('mousemove', this.onmMove);
	}	
	onmUp = evt =>
	{
		this.setState({down : false});
	}
	onmMove = evt =>
	{
		if(!this.state.down) return;
		const dist = this.state.dist;
		const attr = this.state.attr;
		let cdist;
		let d;
		let size;
		let ms;
		switch(dist)
		{
			case "Right":
				cdist = "Left";
				size = "width";
				d = "left";
				ms = "clientX";
				break;
			case "Left":
				//cdist = "Right";
				//size = "width";
				d = "left";
				ms = "clientX";
				break;
			case "Top":
				//cdist = "Bottom";
				//size = "height";
				d = "top";
				ms = "clientY";
				break;
			case "Bottom":
				cdist = "Top";
				size = "height";
				d = "top";
				ms = "clientY";
				break;
		}
		const cattr = cdist ? attr + cdist : null;
		
		const {marginTop, marginBottom, marginRight, marginLeft} = this.state;
		let m =  Math.abs(
			evt[ms] - (
				this.ref.current.getBoundingClientRect()[d] + 
				( size  ? this.ref.current.getBoundingClientRect()[size] : 0 ) + 
				( cattr ? this.state[ cattr ] : 0 )
			)
		);
		//console.log( m, ms, d, size , cattr);
		/**/
		console.log( 
			m,
			ms + "=" + evt[ms], 
			d + "=" + this.ref.current.getBoundingClientRect()[d],
			size + "=" + this.ref.current.getBoundingClientRect()[size], 
			cattr + "=" + this.state[ cattr ]
		);
		
		let style = {};
		style[ attr + dist ] = m; 
		this.setState( style );
	}
	
	render3()
	{ 
		const {marginTop, marginBottom, marginRight, marginLeft} = this.state;
		return <div 
			className="transition_500"
			style={{
				border:"1px dotted #00000050",
				margin:"0px",
				position: "relative"
			}}
		>
			<div
				className="transition_500"
				style={{					
					marginTop:marginTop,
					paddingTop:5,
					borderTopWidth : 10,
					borderTopColor : "#FF0000",
					borderTopStyle : "solid",
					
					paddingBottom:5,
					marginBottom:marginBottom,
					borderBottomWidth : 10,
					borderBottomColor : "#0000FF",
					borderBottomStyle : "solid",
					
					marginRight:marginRight,
					paddingRight:50,
					borderRightWidth : 10,
					borderRightColor : "#00FF00",
					borderRightStyle : "solid",
					
					paddingLeft:21,
					marginLeft:marginLeft,
					borderLeftWidth : 10,
					borderLeftColor : "#000000",
					borderLeftStyle : "solid",
					
					borderTopLeftRadius : 30,
					borderTopRightRadius : 30,
					borderBottomLeftRadius : 30,
					borderBottomRightRadius : 60,
					
					width : 300,
					height : 220,
					backgroundColor : "#FFFFFF",					
					display:"flex",
					justifyContent:"stretch",
					alignItems:"stretch",
					position:"relative"
				}}
				ref={ this.ref }
			>
					<div 
						className="transition_500"
						style={{
							backgroundColor: "darkblue",
							fontSize: 9,
							color: "#FFF",
							fontWeight: "bold",
							padding: "5px 8px",
							position: "absolute",
							left: "50%",
							marginLeft:-12,
							top: -22,
							cursor:"pointer"
						}}
					>
						T
					</div>
					<div 
						className="transition_500"
						style={{
							backgroundColor: "darkblue",
							fontSize: 9,
							color: "#FFF",
							fontWeight: "bold",
							padding: "5px 8px",
							position: "absolute",
							right: "50%",
							marginRight:-12,
							bottom: -22,
							cursor:"pointer"
						}}
					>
						B
					</div>
					<div 
						className="transition_500"
						style={{
							backgroundColor: "darkblue",
							fontSize: 9,
							color: "#FFF",
							fontWeight: "bold",
							padding: "5px 8px",
							position: "absolute",
							bottom: "50%",
							marginBottom:-12,
							left: -22,
							cursor:"pointer"
						}}
					>
						L
					</div>
					<div 
						className="transition_500"
						style={{
							backgroundColor: "darkblue",
							fontSize: 9,
							color: "#FFF",
							fontWeight: "bold",
							padding: "5px 8px",
							position: "absolute",
							top: "50%",
							marginTop:-12,
							right: -22,
							cursor:"pointer"
						}}
					>
						R
					</div>
				<div 
					className="transition_500"
					style={{
						border:"1px dotted #00000050", 
						position: "relative",
						width: "100%",
					}}
				>
					<div 
						className="transition_500"
						style={{
							backgroundColor: "darkgreen",
							fontSize: 9,
							color: "#FFF",
							fontWeight: "bold",
							padding: "5px 8px",
							position: "absolute",
							left: "50%",
							marginLeft: -36,
							top: -22,
							cursor:"n-resize"
						}}
					>
						T
					</div>
					
					<div 
						className="transition_500"
						style={{
							backgroundColor: "darkgreen",
							fontSize: 9,
							color: "#FFF",
							fontWeight: "bold",
							padding: "5px 8px",
							position: "absolute",
							right: "50%",
							marginRight: -36,
							bottom: -22,
							cursor:"n-resize"
						}}
					>
						B
					</div>
					
					<div 
						className="transition_500"
						style={{
							backgroundColor: "darkgreen",
							fontSize: 9,
							color: "#FFF",
							fontWeight: "bold",
							padding: "5px 8px",
							position: "absolute",
							bottom: "50%",
							marginBottom: -36,
							left: -22,
							cursor:"e-resize"
						}}
					>
						L
					</div>
					
					<div
						className="transition_500" 
						style={{
							backgroundColor: "darkgreen",
							fontSize: 9,
							color: "#FFF",
							fontWeight: "bold",
							padding: "5px 8px",
							position: "absolute",
							top: "50%",
							marginTop: -36,
							right: -22,
							cursor:"e-resize"
						}}
					>
						R
					</div>
				</div>
			</div>
			
			<div 
				className="transition_500"
				style={{
					backgroundColor: "darkred",
					fontSize: 9,
					color: "#FFF",
					fontWeight: "bold",
					padding: "5px 8px",
					position: "absolute",
					left: "50%",
					marginLeft:12,
					top: -22,
					cursor:"n-resize"
				}}
				attr="margin"
				dist="Top"
				onMouseDown={this.onMouseDown}
			>
				T
			</div>
			
			<div 
				className="transition_500"
				style={{
					backgroundColor: "darkred",
					fontSize: 9,
					color: "#FFF",
					fontWeight: "bold",
					padding: "5px 8px",
					position: "absolute",
					right: "50%",
					marginRight:12,
					bottom: -22,
					cursor:"n-resize"
				}}
				attr="margin"
				dist="Bottom"
				onMouseDown={this.onMouseDown}
			>
				B
			</div>
			
			<div 
				className="transition_500"
				style={{
					backgroundColor: "darkred",
					fontSize: 9,
					color: "#FFF",
					fontWeight: "bold",
					padding: "5px 8px",
					position: "absolute",
					bottom: "50%",
					marginBottom:12,
					left: -22,
					cursor:"e-resize"
				}}
				attr="margin"
				dist="Left"
				onMouseDown={this.onMouseDown}
			>
				L
			</div>
			
			<div 
				className="transition_500"
				style={{
					backgroundColor: "darkred",
					fontSize: 9,
					color: "#FFF",
					fontWeight: "bold",
					padding: "5px 8px",
					position: "absolute",
					top: "50%",
					marginTop:12,
					right: -22,
					cursor:"e-resize"
				}} 
				attr="margin"
				dist="Right"
				onMouseDown={this.onMouseDown}
			>
				R
			</div>
			
		</div>
	} 
	onMouseDown = evt =>
	{
		this.setState({ 
			down : true, 
			attr : evt.currentTarget.getAttribute("attr"), 
			dist : evt.currentTarget.getAttribute("dist")
		});
	} 
	
	render()
	{		
		return <div className="w-100">
				<ExternalStyle {...this.state} value={this.state.value} on={this.on}/>
		</div>;
	}
	/*
	render()
	{		
		let html = [];
		//for(let m in matrix.Style)
		for( let m in this.state.value )
		{
			if(matrix.Style[ m ] && matrix.Style[ m ].hidden) continue;
			html.push( 
				<FieldInput
					field={ m }
					key={ m }
					id={this.props.ID} 
					on={this.on}
					onChange={this.on}
					{ ...matrix.Style[m] }
					full_style={ this.state.value }
					editable = { true }
					value={ 
						matrix.Style[m]	&& matrix.Style[m].type == "landing_object" 
							? 
							this.state.value 
							: 
							this.state.value
								?
								this.state.value[ m ] 
								:
								""
					}
					vertical={ true }
					visibled_value={ "title" }
				/> 
			)
		} 
		
		return <div className="w-100">
			<Button 
				onClick={this.onCollapse} 
				minimal={true} 
				fill={true}
				intent={Intent.DANGER} 
				alignText="left"
				className="pl-2"
			>
				{__(this.state.isCollapse ? "Close" : "edit basic")}
			</Button>
			<Collapse isOpen={this.state.isCollapse} className="w-100">
				<div className="alert alert-danger p-0">
					<div className="p-2">
						{ html }
					</div>
				</div> 
			</Collapse>
			<Button 
				onClick={this.onExternal}
				minimal={true} 
				fill={true} 
				intent={Intent.DANGER} 
				alignText="left"
				className="pl-2"
			>
				{__(this.state.isExternal ? "Close" : "edit external (need knowleges in CSS technology)")}
			</Button>
			<Collapse isOpen={ this.state.isExternal } className="w-100">
				<ExternalStyle {...this.state} value={this.state.value} on={this.on}/>
			</Collapse>
		</div>;
	}
	*/
	
	onCollapse =() =>
	{
		this.setState({isCollapse:!this.state.isCollapse});	
	}
	onExternal =() =>
	{
		this.setState({isExternal:!this.state.isExternal});	
	}
	on = value =>
	{
		console.log( value );
		this.props.on( value )
	}
}
export default Style;