import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import {Card, Intent, Button} from "@blueprintjs/core";
import AnswerRadio from "./AnswerRadio";
import AnswerCheckbox from "./AnswerCheckbox";

class QuestionMultichose extends Component
{
	
	constructor(props)
	{
		super(props);
		this.state = { 
			checked	: [],
			step 	: this.props.step,
			start 	: this.props.start,
			rights	: this.props.rights || []
		}
		this.timeout = -1;
	}
	
	componentWillUpdate(nextProps)
	{
		//console.log( nextProps.rights );
		if(nextProps.checked !==  this.state.checked)
		{ 
			this.setState({ checked:nextProps.checked });
		}
		if(nextProps.start !==  this.state.start)
		{ 
			this.setState({ start:nextProps.start });
		}
		if(nextProps.rights && nextProps.rights !==  this.state.rights)
		{ 
			//console.log( nextProps.rights )
			this.setState({ rights:nextProps.rights });
		}
	}
	
	render()
	{
		//console.log(this.props.single, this.state.checked);
		
		let answers = this.props.answers.map((e, i) =>
		{ 
			const is_right = this.state.rights.filter(ee =>
			{
				return ee.id == e.id;
			}).length > 0;
			
			console.log( this.state.checked
				?
				this.state.checked.toString()
					.split(",")
						.filter(ee => ee == e.id).length > 0 
				:
				false 
			);
			console.log( this.state.checked ? this.state.checked.toString().split(",") : "", e.id );
			
			
			return this.props.single
				?
				<AnswerRadio
					{...e}
					key={i}
					id={e.id}
					value={e.id}
					name={this.props.id}
					checked={this.state.checked == e.id}
					onChange={this.onChange}
					step={this.props.step}
					is_right={is_right}
				/>
				:
				<AnswerCheckbox
					{...e}
					key={i}
					id={e.id}
					value={e.id}
					name={this.props.id}
					checked={
						this.state.checked
							?
							this.state.checked.toString()
								.split(",")
									.filter(ee => ee == e.id).length > 0 
							:
							false
					}
					onChange={this.onChange}
					step={this.props.step}
					is_right={is_right}
				/>
		});
		const thumbnail = this.props.thumbnail
			?
			<img src={this.props.thumbnail} alt={this.props.post_title} className="test-thumbnail" />
			:
			null 
			;
		const className = this.state.start ? " animated animation-swipe-right " : " hidden";
		return <div className={ "test-cover " + className } >
			<div className="test-question-title">
				{this.props.post_title}
			</div> 
			<h1>{ this.props.single ? "SINGLE" : "MULTI" }</h1>
			{ thumbnail }
			<div className="test-question-answers-cont"> 
				{answers}
			</div>
			<div className="mt-4">
				<Button onClick={this.onStep}>
					{__("Next")}
				</Button>
			</div>
		</div>
	}
	onStep = () =>
	{
		this.props.onStep();
	}
	onChange = data =>
	{ 
		console.log(data);
		this.props.onChange( data );
	}
}

export default QuestionMultichose;