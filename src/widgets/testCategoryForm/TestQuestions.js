import React, {Component, Fragment} from "react";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo"; 
import gql from "graphql-tag";
import Question from "./Question";
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

class TestQuestions extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			questions	: [],
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
			  getBio_Test( id: ${test_id} )
			  {
				id
				questions
				{
				  id
				  post_title 
				  thumbnail
				  hidden
				  penalty
				  single
				  is_deleted
				  order
				  bio_biology_theme
				  {
					  id
					  post_title
				  }
				  bio_test
				  {
					  id
					  post_title					  
				  }
				  answers
				  {
					  post_content
					  id
					  order
				  }
				}
			  }
			}
		`;  
		this.props.client.query( { query: query, variables:{id : test_id } })
			.then(result  => 
				{
					 //console.log( result.data.getBio_Test.questions ); 
					 this.setState({
						 questions : result.data.getBio_Test.questions,
						 loading:false
					 })
				}
			)
	}
	render()
	{
		if(this.state.loading)
			return <Loading />
		
		//console.log("added:", 	this.state.added);
		//console.log("deleted:", this.state.deleted);
		const questions = this.state.questions.map((e, i) =>
		{ 
			return <Question 
				key={ i }
				{ ...e }
				i={i}
				is_first={i==0}
				is_last={ i == this.state.questions.length - 1 }
				selected={ this.state.selected == e.id }
				onSwitchUp={ this.onSwitchUp }
				onSwitchDn={ this.onSwitchDn }
				onSwitchOrder={ this.onSwitchOrder }
				onAddQuestion={ this.onAddQuestion }
				changeQuestion={ this.changeQuestion }
				onDelete={ this.onDelete }
			/>
		});
		return <div className="row"> 
				<div className="col-md-3">
				
				</div>
				<div className="col-md-9">
					<Link
						to={this.props.parent_route }
						className="btn btn-link"
					>
						{ __( "edit Test" ) }
					</Link>
				</div> 
				<div className="col-md-3"> 
				
				</div>
				<div className="col-md-9 ">
					{questions}
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
		let questions = [...this.state.questions], selected;
		this.state.questions.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = questions.splice(i, 1);
				questions.splice(i-1, 0, me[0]); 
			}
		});		
		$(".question").removeClass("active"); 
		this.setState({questions, selected : data}, ()=> $("#" + data).addClass("active"));
		if(this.props.onChange)
			this.props.onChange(["questions", questions.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onSwitchDn = data =>
	{
		let questions = [...this.state.questions], selected;
		this.state.questions.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = questions.splice(i, 1);
				questions.splice(i+1, 0, me[0]); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({questions, selected : data }, ()=> $("#" + data).addClass("active"));
		if(this.props.onChange)
		this.props.onChange(["questions", questions.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onInsertQuestion = () =>
	{
		let questions = [...this.state.questions], selected;
		const newId = this.state.questions.length.toString();
		questions.push({
			post_title : "",
			id: newId,
			saved:false,
			isNew:true
		});
		$(".question").removeClass("active");
		this.setState({
			questions, 
			selected : newId 
		} );
		if(this.props.onChange)
			this.props.onChange(["questions", questions.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onAddQuestion = data =>
	{
		let questions = [...this.state.questions], selected;
		const newId = this.state.questions.length.toString();
		this.state.questions.forEach((e,i) => 
		{
			if(e.id == data)
			{
				const me = {
					post_title : "",
					id: newId,
					saved:false,
					isNew:true
				};
				questions.splice( i + 1, 0, me ); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({
			questions, 
			selected : newId 
		} );
		if(this.props.onChange)
			this.props.onChange(["questions", questions.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onSwitchOrder = data =>
	{
		let questions = [...this.state.questions], selected;
		this.state.questions.forEach((e,i) => 
		{
			if(e.id == data[0])
			{
				const me = questions.splice(i, 1);
				questions.splice(data[1], 0, me[0]); 
			}
		});		
		$(".question").removeClass("active");
		this.setState({questions, selected : data[0] }, ()=> $("#" + data[0]).addClass("active"));
		if(this.props.onChange)
			this.props.onChange(["questions", questions.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	changeQuestion = data =>
	{
		let questions = [...this.state.questions], me;
		this.state.questions.forEach((e,i) => 
		{
			if(e.id == data[0])
			{
				me = questions.splice(i, 1, data[1]); 
			}
		});		
		// console.log("added:", 	[ ...this.state.added, data[1] ] );
		let deleted =  me[0].isNew ? this.state.deleted : [...this.state.deleted, me[0]]
		let added = [...this.state.added, data[1]]; 
		$(".question").removeClass("active");
		this.setState( 
			{ 
				questions, 
				selected	: data[1].id, 
				deleted		: deleted, 
				added		: added 
			}, 
			()=> $( "#" + data[1].id ).addClass("active") 
		);
		if(this.props.onChange)
			this.props.onChange(["questions", questions.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
	onDelete = data =>
	{
		let questions = [...this.state.questions], me;
		this.state.questions.forEach((e,i) => 
		{
			if(e.id == data )
			{
				me = questions.splice(i, 1);
			}
		});		
		$(".question").removeClass("active");
		this.setState( 
			{ 
				questions, 
				selected 	: -1,
				deleted		: me[0].isNew ? this.state.deleted : [...this.state.deleted, me[0]]
			} 
		);
		if(this.props.onChange)
			this.props.onChange(["questions", questions.filter(e => !e.isNew).map(e => { delete e.saved; return e;}) ]);
	}
}
export default compose(
	withApollo,
	withRouter
)(TestQuestions)