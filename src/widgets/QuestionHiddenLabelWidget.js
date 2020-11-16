import React, {Component, Fragment} from "react";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo"; 
import gql from "graphql-tag";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";

class QuestionHiddenLabelWidget extends Component
{
	state = {
		col:0
	}
	componentDidMount()
	{
		if(this.props.data.data_type == "Bio_TestQuestion" )
		{
			const query = gql`
				query getFullQuestionHiddenCount
				{
					getFullQuestionHiddenCount
				}
			`;
			this.props.client.query({query:query})
				.then( result =>
				{
					//console.log( result );
					this.setState({ col : result.data.getFullQuestionHiddenCount })
				})
		}
	}
	render()
	{
		//console.log( this.props.data ); 
		return this.props.data.data_type == "Bio_TestQuestion" 
			?
			<Fragment>
				{
					this.state.col > 0
					?
					<div className="menu-labla hint hint--left" data-hint={__("Need approve")}>
						{this.state.col}
					</div>
					:
					null
				}
			</Fragment>
			:
			null;
	}
}
export default compose(
	withApollo
)(QuestionHiddenLabelWidget);
