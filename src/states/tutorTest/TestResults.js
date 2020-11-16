import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import QuestionTestResults from "./QuestionTestResults";
import Loading from "../../layouts/utilities/Loading";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core"; 


class TestResults extends Component
{
	constructor(props)
	{
		super(props);
		this.state ={
			isOpen: false
		}
	}
	render()
	{ 
		if( this.props.results == undefined )
		{
			return <Loading/>
		}
		let questions = this.props.questions.map((e, i) =>
		{
			const result = this.props.results.questions.filter(ee =>
			{
				return e.id == ee.id
			});
			return <QuestionTestResults
				key={i}
				origin={ e }
				result={ result[0] } 
			/>
		});
		return <div className="d-flex justify-content-center flex-column">
			<div className="test-result-data row">
				<div className="test-descr-title col-md-6">
					{__("Right count")}:
				</div>
				<div className="test-descr-cont col-md-6">
					{this.props.results.right_count}
				</div>
			</div>
			<div className="test-result-data row">
				<div className="test-descr-title col-md-6">
					{__("Credits")}:
				</div>
				<div className="test-descr-cont col-md-6">
					{this.props.results.credits}
				</div>
			</div>
			<div className="show-test-results">
				<Button onClick={this.handleOpen} minimal={true} className="small " rightIcon="chevron-down" fill={true}>
					{ __( this.state.isOpen ? "Hide all results" : "Show all results" ) } 
				</Button>
				<Collapse isOpen={this.state.isOpen} transitionDuration={2000}  className="">
					<div className="px-4 py-3">
						{ questions }
					</div>
				</Collapse>
			</div>
		</div>;
	}
	handleOpen = () =>
	{
		this.setState({isOpen : !this.state.isOpen});
	}
}
export default TestResults;
