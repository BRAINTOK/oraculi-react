import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo";  
import gql from "graphql-tag";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";

class EventUserUser extends Component
{
	render()
	{
		const {display_name, user_email, id, event_id} = this.props;
		return <div className="row mx-1" >
			<div className="col-md-4 py-1 border-bottom border-secondary">
				{ display_name }
			</div>
			<div className="col-md-4 py-1 border-bottom border-secondary">
				{ user_email }
			</div>
			<div className="col-md-4 py-1 border-bottom border-secondary">
				<ButtonGroup>
					<Button intent={Intent.SUCCESS} onClick={this.onAccept}>
						{__("Agree")}
					</Button>
					<Button intent={Intent.DANGER} onClick={this.onRefuse}>
						{__("Refuse")}
					</Button>
				</ButtonGroup>
			</div>
		</div> 
	}
	onAccept = () =>
	{
		/*
		if(this.props.onAccept)
			this.props.onAccept();
		return;
		*/
		
		const user_id = this.props.id ;
		const event_id = this.props.event_id ;
		let mutation = gql`
			mutation Accept_Request
			{
			  Accept_Request(input:{
				user:${user_id},
				event: ${event_id}
			  })
			}
		`;  
		this.props.client.mutate( { mutation: mutation })
			.then(result  => 
				{  
					console.log(result)
					if(this.props.onAccept)
						this.props.onAccept();
				}
			)
	}
	onRefuse = () =>
	{
		
		if(this.props.onRefuse)
			this.props.onRefuse();
		return;
	}
}
export default compose(
	withApollo 
)(EventUserUser);