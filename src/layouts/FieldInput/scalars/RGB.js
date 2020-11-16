import React, {Component} from "react";
import {__} from "../../utilities/i18n";
import ColorPicker from "../../utilities/ColorPicker";

//TODO extends ScalarField
export default class RGB extends Component
{
	state = {value:this.props.value}
	render()
	{
		const {field, title} = this.props;
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-7 layout-data";
		return <div className="row dat" key={field}>
			<div className={col1}>
				{__( title )}
			</div>
			<div className={col2}>
			{
				this.props.editable 
					?
					<ColorPicker  
						color={this.state.value}
						onChoose={this.color}
					/>
					:
					<div 
						style={{ width:36, height:14, borderRadius: 2, backgroundColor: this.state.value }} 
						className=" my-2"
					/>
			}
			</div>
		</div>
	}
	color = color =>
	{
		this.setState({ value : color.hex });
		this.on(color.hex);
	}	
	
	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}