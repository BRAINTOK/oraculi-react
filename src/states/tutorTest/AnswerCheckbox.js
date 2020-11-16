import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import {Card, Intent, Button} from "@blueprintjs/core";

class AnswerCheckbox extends Component
{ 
	constructor(props)
	{
		super(props)
		this.state= {
			checked : this.props.checked 
		}
	}
	componentWillUpdate(nextProps)
	{
		if(nextProps.checked !==  this.state.checked)
		{
			if(this.state.checked)
				clearTimeout(this.timer);
			this.setState({ checked:nextProps.checked });
		}
		if(nextProps.is_right !==  this.state.is_right)
		{ 
			if(nextProps.is_right)
				clearTimeout(this.timer);
			this.setState({ is_right:nextProps.is_right });
		}
	}
	componentWillUnmount()
	{
		clearTimeout(this.timer);
	}
	render()
	{
		const ainmaClass = this.state.checked 
			?
			"pause-circle" //"pause-circle active"
			:
			"pause-circle";
		const rightClass = this.state.is_right ? "text-success text-bold" : ""; 
		const checkClass = !this.state.is_right ? "_lcheck_  " : "_lcheck_";
		return <div className="answer">
			<label className={checkClass} htmlFor={this.props.id}>
				<input 
					type="checkbox" 
					id={this.props.id} 
					name={this.props.name} 
					value={this.props.value} 
					checked={this.state.checked} 
					onChange={this.onChange}
				/> 
				<span className={rightClass}>
					{ this.props.post_content }
				</span>
			</label>
			<div className={ainmaClass}>
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<circle cx="50" cy="50" r="47" />
				</svg>
			</div>
		</div>
	}
	onChange = () =>
	{
		this.props.onChange(this.props.id);
		this.timer = setTimeout(() => 
		{
			//this.props.step();
		}, 7300 );
	}
}

export default AnswerCheckbox