import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import {Card, Intent, Button} from "@blueprintjs/core";
import QuestionMultichose from "./QuestionMultichose";
import QuestionTrueFalse from "./QuestionTrueFalse";

class Step extends Component
{ 
	constructor(props)
	{
		super(props);
		this.state = { 
			checked	: null,
			step 	: this.props.step,
			start 	: false,
			rights	: this.props.rights || []
		}
		this.timeout = -1;
	}
	componentDidMount()
	{
		this.timeout = setInterval(() =>
		{
			this.setState({ start : true });
		}, 100);
	}
	componentWillUnmount()
	{
		clearInterval(this.timeout);
	}
	componentWillUpdate(nextProps)
	{
		//console.log( nextProps.rights );
		if(nextProps.i !==  this.state.i)
		{ 
			this.setState({ i:nextProps.i, start:false });
		}
		if(nextProps.checked !==  this.state.checked)
		{ 
			this.setState({ checked:nextProps.checked });
		}
		if(nextProps.rights && nextProps.rights !==  this.state.rights)
		{ 
			//console.log( nextProps.rights )
			this.setState({ rights:nextProps.rights });
		}
	}
	render()
	{ 
		switch( this.props.type )
		{
			case "multichoice":
				return <QuestionMultichose
					{ ...this.props }
					{ ...this.state }
					onChange={this.onChange}
					onStep={this.onStep}
				/>
			case "truefalse":
				return <QuestionTrueFalse
					{ ...this.props }
					{ ...this.state }
					onChange={this.onChange}
					onStep={this.onStep}
				/>
			case "matching":
			default:
				return <QuestionMultichose
					{ ...this.props }
					{ ...this.state }
					onChange={this.onChange}
					onStep={this.onStep}
				/>
				
		}		
	}
	
	
	
	onStep = () =>
	{
		const checked = this.state.checked;
		console.log(this.state.checked);
		this.props.step( '{ id : "' + this.props.id +'", answers : [ ' + this.state.checked + ' ] }', this.props.id );
	}
	onChange = data =>
	{ 
		if( this.props.type == "multichoice" && !this.props.single )
		{
			let checked = Array.isArray( this.state.checked ) ? [ ...this.state.checked ] : [] ;
			const r = checked.filter(e => e == data);
			//console.log(r);
			if(r.length > 0)
			{
				checked = checked.filter(e => e != data);
			}
			else
			{
				checked.push(data);
			}
			console.log(checked);
			this.setState({ checked : checked.map( e => e.toString() ).join(",") });
		}
		else
		{
			this.setState({checked: data.toString()});
			
		}
		
	}
}
export default Step;