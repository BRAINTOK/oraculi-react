import React, {Component, Fragment} from "react";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo"; 
import gql from "graphql-tag";
import TestQuestions from "./testCategoryForm/TestQuestions";
import QuestionAnswers from "./testCategoryForm/QuestionAnswers";
import EventUser from "./testCategoryForm/EventUser";


class TestCategoryForm extends Component
{
	render()
	{ 
		switch(this.props.data_type)
		{
			case "Bio_Test":
				return this.onTest();
			case "Bio_TestQuestion":
				return this.onQuestion();
			case "Bio_Event":
				return this.onEvent();
			default:
				return this.props.defArea;
		}
	}
	onTest()
	{
		return <Fragment>
					<Switch>
						<Route
							exact
							path = { this.props.parent_route } 
						>
							<Fragment>
								<div className="row">
									<div className="col-md-3">
									
									</div>
									<div className="col-md-9">
										<Link
											to={this.props.parent_route + "/questions" }
											className="btn btn-link"
										>
											{ __( "edit Questions" ) }
										</Link>
									</div>
								</div>
								{this.props.defArea}
							</Fragment>
						</Route>
						<Route
							exact
							path = { this.props.parent_route + "/questions" } 
						>
							<TestQuestions 
								{...this.props} 
								onChange={this.onChange}
							/>
						</Route>
					</Switch>						
				</Fragment>
	}
	onQuestion()
	{ 
		return <Fragment>
					<Switch>
						<Route
							exact
							path = { this.props.parent_route } 
						>
							<Fragment>
								<div className="row">
									<div className="col-md-3">
									
									</div>
									<div className="col-md-9">
										<Link
											to={this.props.parent_route + "/answers" }
											className="btn btn-link"
										>
											{ __( "edit Answers" ) }
										</Link>
									</div>
								</div>
								{this.props.defArea}
							</Fragment>
						</Route>
						<Route
							exact
							path = { this.props.parent_route + "/answers" } 
						>
							<QuestionAnswers 
								{...this.props} 
								onChange={this.onChangeQuestion}
							/>
						</Route>
					</Switch>						
				</Fragment>
	}
	onEvent()
	{  
		return <Fragment>
					<Switch>
						<Route
							exact
							path = { this.props.parent_route } 
						>
							<Fragment>
								<div className="row">
									<div className="col-md-3">
										
									</div>
									<div className="col-md-9">
										<Link
											to={this.props.parent_route + "/answers" }
											className="btn btn-link"
										>
											{ __( "edit Requesters" ) }
										</Link>
									</div>
								</div>
								{this.props.defArea}
							</Fragment>
						</Route>
						<Route
							exact
							path = { this.props.parent_route + "/answers" } 
						>
							<EventUser 
								{...this.props} 
								onChange={this.onChangeEventUser}
								onRefresh={this.onRefresh}
							/>
						</Route>
					</Switch>						
				</Fragment>
	}
	onChange = data =>
	{
		this.props.on(data[1], data[0]);
	}
	onChangeQuestion = data =>
	{
		console.log(data);
	}
	onRefresh = () =>
	{
		console.log( this.props );
		if(this.props.onRefresh)
			this.props.onRefresh();
	}
	onChangeEventUser = () =>
	{
		console.log( "data" );
	}
	
}
export default compose(
	withApollo,
	withRouter
)(TestCategoryForm);