import React, {Component, Fragment} from "react"; 
import ReactDOM from 'react-dom';
import { ChromePicker } from 'react-color';
import $ from "jquery";

export default class ColorPicker extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			color:this.props.color || "#FFFFFF",
			isColorPicker: false
		}
	}
	componentWillMount ()
	{
		window.color_picker_id = typeof window.color_picker_id !== "undefined" ? window.color_picker_id + 1 : 1;
		this.color_picker_id = window.color_picker_id;
		document.body.addEventListener('click', this.onMouseLeaveHandler);
	}
    componentWillUnmount() 
	{
		document.body.removeEventListener('click', this.onMouseLeaveHandler);
	}
	onMouseLeaveHandler = e =>
	{	const $target = $(e.target);
		const p = ReactDOM.findDOMNode( this.input );
		if( $( p ).length > 0  && !$target.closest( p ).length )	
		{
			$( p ).css("display", "none");
		}
	}
	
	onColor = color =>
	{
		this.setState({ color: color.hex });
		this.props.onChoose( color );
	}
	onColorToggle = () =>
	{
		const p = $("#color-picker-chooser" + this.color_picker_id)
		if(!p.length) return;
		const offset = p.offset();
		const top = $( document ).height() - offset.top > 300 ? 30 : -240;
		const clone = $(ReactDOM.findDOMNode( this.input ))
		$("body").append( 
			$(clone)
				.css({
					top:offset.top + top,
					left:offset.left,
					display:"block",
					zIndex:1000
				})
		);			
	}
	render()
	{
		const picker = <div 
			style={{ position:"absolute", display:"none" }} 
			ref={(node) => { this.input = node; }}
		>
			<ChromePicker 
				disableAlpha = {true} 
				color={ this.state.color } 				
				onChange={this.onColor}
			/>
		</div>
		
		return <Fragment>
			<div 
				style={{
					padding: '5px',
					background: '#fff',
					borderRadius: '1px',
					boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer'
				 }}
				className="picker_form"
				id={ "color-picker-chooser" + this.color_picker_id }
			>
				<div 
					style={{ 
						width: '36px',
						height: '14px',
						borderRadius: '2px', 
						backgroundColor:this.state.color
					}} 
					onClick={this.onColorToggle}
				/>
			</div>
			{picker}
		</Fragment>
	 }
}