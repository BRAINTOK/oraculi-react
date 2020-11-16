import React, {Component, Fragment} from "react";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo"; 
import gql from "graphql-tag";
import Answer from "./Answer";
import AnswerMatching from "./AnswerMatching";
import $ from "jquery";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";

class QuestionAnswers extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...props,
			answers	: [],
			selected 	: null,
			loading  	: true,
			added		: [],
			deleted		: []
		};
	}
	componentDidMount()
	{ 
		const test_id = '"' + this.props.id + '"';
		let query = gql`
			query
			{
			  getBio_TestQuestion ( id: ${test_id} )
			  {
				id
				type
				answers 
				{
					id
					is_deleted
					is_subquestion
					subquestion_answer_id
					order
					post_content
					__typename
				}
			  }
			}
		`;  
		this.props.client.query( { query: query, variables:{id : test_id } })
			.then(result  => 
				{
					console.log( result.data.getBio_TestQuestion.answers ); 
					this.setState({
						answers : result.data.getBio_TestQuestion.answers,
						loading:false
					})
				}
			)
	}
	render()
	{
		if(this.state.loading)
			return <Loading />
		
		let answers; 
		if(this.state.answers)
		{
			switch(this.state.type)
			{
				case "matching":
					answers = this.state.answers
					.filter(e => !e.is_subquestion)
						.map((e,i) =>
						{
							const subAnswer = this.state.answers.filter((ee, i) => ee.subquestion_answer_id == e.id)[0];
							return <AnswerMatching
								key={ i }
								{ ...e }
								subAnswer={subAnswer}
								i={i}
								is_first={i==0}
								is_last={ i == this.state.answers.length - 1 }
								selected={ this.state.selected == e.id }
								onSwitchUp={ this.onSwitchUp }
								onSwitchDn={ this.onSwitchDn }
								onSwitchOrder={ this.onSwitchOrder }
								onAddQuestion={ this.onAddQuestion }
								changeQuestion={ this.changeQuestion }
								onDelete={ this.onDelete }
							/>
						});
					break;
				case "truefalse":
					answers = <div className="alert alert-secondary">
						{__("No edit answers true and false.")}
					</div>
					break;
				case "multichoice":
				default:
					answers = this.state.answers.map((e,i) =>
					{
						return <Answer
							key={ i }
							{ ...e }
							i={i}
							single={ this.state.single }
							name={ this.props.id }
							is_first={i==0}
							is_last={ i == this.state.answers.length - 1 }
							selected={ this.state.selected == e.id }
							onSwitchUp={ this.onSwitchUp }
							onSwitchDn={ this.onSwitchDn }
							onSwitchOrder={ this.onSwitchOrder }
							onAddQuestion={ this.onAddQuestion }
							changeQuestion={ this.changeQuestion }
							onDelete={ this.onDelete }
						/>
					})
					break;
			}
		} 
		return <div className="row"> 
				<div className="col-md-3">
				
				</div>
				<div className="col-md-9">
					<Link
						to={this.props.parent_route }
						className="btn btn-link"
					>
						{ __( "edit Question" ) }
					</Link>
				</div> 
				<div className="col-md-3"> 
				
				</div>
				<div className="col-md-9 ">
					{answers}
				</div>
				<div className="col-md-3">
					
				</div>
				<div className="col-md-9 ">
					<Button className="ml-2 my-2" onClick={this.onInsertQuestion} icon="plus" /> 
				</div>
			</div>
	}
	onSwitchUp = data =>
	{
		let answers = [...this.state.answers], selected;
		this.state.answers.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = answers.splice(i, 1);
				answers.splice(i-1, 0, me[0]); 
			}
		});		
		$(".question").removeClass("active"); 
		this.setState({answers, selected : data}, ()=> $("#" + data).addClass("active"));
		if(this.props.onChange)
			this.props.onChange(["answers", answers.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onSwitchDn = data =>
	{
		let answers = [...this.state.answers], selected;
		this.state.answers.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = answers.splice(i, 1);
				answers.splice(i+1, 0, me[0]); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({answers, selected : data }, ()=> $("#" + data).addClass("active"));
		if(this.props.onChange)
		this.props.onChange(["answers", answers.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onInsertQuestion = () =>
	{
		let answers = [...this.state.answers], selected;
		const newId = this.state.answers.length.toString();
		answers.push({
			post_title : "",
			id: newId,
			saved:false,
			isNew:true
		});
		$(".question").removeClass("active");
		this.setState({
			answers, 
			selected : newId 
		} );
		if(this.props.onChange)
			this.props.onChange(["answers", answers.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onAddQuestion = data =>
	{
		let answers = [...this.state.answers], selected;
		const newId = this.state.answers.length.toString();
		this.state.answers.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = {
					post_title : "",
					id: newId,
					saved:false,
					isNew:true
				};
				answers.splice( i + 1, 0, me ); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({
			answers, 
			selected : newId 
		} );
		if(this.props.onChange)
			this.props.onChange(["answers", answers.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onSwitchOrder = data =>
	{
		let answers = [...this.state.answers], selected;
		this.state.answers.forEach((e,i) => 
		{
			if(e.id == data[0])
			{
				const me = answers.splice(i, 1);
				answers.splice(data[1], 0, me[0]); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({answers, selected : data[0] }, ()=> $("#" + data[0]).addClass("active"));
		if(this.props.onChange)
			this.props.onChange(["answers", answers.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	changeQuestion = data =>
	{
		let answers = [...this.state.answers], me;
		this.state.answers.forEach((e,i) => 
		{
			if(e.id == data[0])
			{
				me = answers.splice(i, 1, data[1]); 
			}
		});		
		// console.log("added:", 	[ ...this.state.added, data[1] ] );
		let deleted =  me[0].isNew ? this.state.deleted : [...this.state.deleted, me[0]]
		let added = [...this.state.added, data[1]]; 
		$(".question").removeClass("active");
		this.setState( 
			{ 
				answers, 
				selected	: data[1].id, 
				deleted		: deleted, 
				added		: added 
			}, 
			()=> $( "#" + data[1].id ).addClass("active") 
		);
		if(this.props.onChange)
			this.props.onChange(["answers", answers.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onDelete = data =>
	{
		let answers = [...this.state.answers], me;
		this.state.answers.forEach((e,i) => 
		{
			if(e.id == data )
			{
				me = answers.splice(i, 1);
			}
		});		
		$(".question").removeClass("active");
		this.setState( 
			{ 
				answers, 
				selected 	: -1,
				deleted		: me[0].isNew ? this.state.deleted : [...this.state.deleted, me[0]]
			} 
		);
		if(this.props.onChange)
			this.props.onChange(["answers", answers.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
}
export default compose(
	withApollo,
	withRouter
)(QuestionAnswers)