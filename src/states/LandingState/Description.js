import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import EditLabel from "./EditLabel"
import {Button, ButtonGroup, Intent, Popover, Position, Icon} from "@blueprintjs/core";
import matrix from "./data/matrix";
import {getStyle} from "./Section";

class Description extends Component
{
	constructor(props)
	{
		super( props );
		this.state= { ...this.props }
	}
	componentWillUpdate(nextProps)
	{
		if(nextProps.is_edit != this.state.is_edit)
		{
			this.setState({is_edit: nextProps.is_edit});
		}
		let state = {  };		
		for(let i in matrix.descriptions)
		{
			if(nextProps[i] != this.state[i])
			{
				state[i] = nextProps[i]; 
			}
		}
		
		if( Object.keys(state).length > 0 )
		{
			// console.log( Object.keys(state).length, state );
			this.setState({...state});
		}
	}
	render()
	{
		const { type, text, text_src, class_name, style} = this.state;
		const styleObj = getStyle(style);
		return text || text_src 
			?
			<div className={ "landing-description " + class_name} style={ styleObj }>
				<span>
					{ text }
					{
						/*
						<EditLabel
							{ ...this.state } 
							source="descriptions"
							onEdit={ this.props.onEdit } 
						/>
						*/
					}
				</span>
			</div>
			:
			null;
	}
}
export default Description;