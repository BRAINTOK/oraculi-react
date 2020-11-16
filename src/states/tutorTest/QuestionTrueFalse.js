import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import {Card, Intent, Button, ButtonGroup} from "@blueprintjs/core";
import AnswerRadio from "./AnswerRadio";

class QuestionTrueFalse extends Component
{
	
	constructor(props)
	{
		super(props); 
		this.state = { 
			checked	: -2,
			step 	: this.props.step,
			start 	: this.props.start,
			rights	: this.props.rights || []
		}
		this.timeout = -1;
	} 
	componentWillUpdate(nextProps)
	{
		if( nextProps.checked != null && nextProps.checked !==  this.state.checked)
		{ 
			console.log( nextProps.nextProps,  this.state.nextProps );
			this.setState({ checked:nextProps.checked });
		}
		if(nextProps.start !==  this.state.start)
		{ 
			console.log( nextProps.start,  this.state.start );
			this.setState({ start:nextProps.start });
		}
		if(nextProps.rights && nextProps.rights !==  this.state.rights)
		{ 
			console.log( nextProps.rights )
			this.setState({ rights:nextProps.rights });
		}
	}
	render()
	{
		console.log( this.state.checked );
		const thumbnail = this.props.thumbnail
			?
			<img src={this.props.thumbnail} alt={this.props.post_title} className="test-thumbnail" />
			:
			null;
			
		const className = this.state.start ? " animated animation-swipe-right " : " hidden";
		return <div className={ "test-cover " + className } >
			<h1>
				TRUEFLSE
			</h1>
			<div className="test-question-title">
				{this.props.post_title}
			</div> 
			{thumbnail}
			<div className="test-question-answers-cont"> 
					<Button 
						intent={ this.state.checked === "1" ? Intent.SUCCESS : "" } 
						onClick={this.onYes} 
						large={true} 
						className="px-sm-5 mr-2"
						icon={this.state.checked === "1" ? "tick" : "blank" }
						rightIcon="blank"
					>
						{__("Yes")}
					</Button>
					<Button 
						intent={ this.state.checked === "0" ? Intent.DANGER : "" } 
						onClick={this.onNo} 
						large={true} 
						className="px-sm-5"
						icon={this.state.checked === "0" ? "tick" : "blank" }
						rightIcon="blank"
					>
						{__("No")}
					</Button> 
			</div>
			<div className="mt-4">
				<Button onClick={this.onStep}>
					{__("No")}
				</Button>
			</div>
		</div>
	}
	onStep = () =>
	{
		this.props.onStep();
	}
	onYes = () =>
	{
		this.setState({checked:"1"});
		this.onChange( "1" );
	}
	onNo = () =>
	{
		this.setState({checked:"0"});
		this.onChange( "0" );
	}
	onChange = data =>
	{ 
		//console.log(data);
		this.props.onChange( data );
	}
}

export default QuestionTrueFalse;