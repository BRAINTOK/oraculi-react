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

class EventsRequestLabelWidget extends Component
{
	state = {
		col:0
	}
	componentDidMount()
	{
		if(this.props.data.data_type == "Bio_Event" )
		{
			const query = gql`
				query getFullEventMembersCount
				{
					getFullEventMembersCount
				}
			`;
			this.props.client.query({query:query})
				.then( result =>
				{
					console.log( result );
					this.setState({ col : result.data.getFullEventMembersCount })
				})
		}
	}
	render()
	{
		//console.log( this.props.data ); 
		switch(this.props.data.data_type)
		{
			case "Bio_Event":
				return <Fragment> 
					{
						this.state.col > 0
						?
						<div className="menu-labla hint hint--left" data-hint={__("Requests")}>
							{this.state.col}
						</div>
						:
						null
					}
				</Fragment>
			default:
				return null;
		}
		
			
	}
}
export default compose(
	withApollo
)(EventsRequestLabelWidget);
