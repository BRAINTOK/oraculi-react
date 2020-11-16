import React, {Component, Fragment} from "react";
import { __ } from "../../layouts/utilities/i18n";
import { Button, ButtonGroup, Classes, Dialog, Intent } from "@blueprintjs/core";
import {withRouter} from "react-router";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import gql from 'graphql-tag';

class EventParticipation extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isOpen : false,
			member_status: this.props.member_status
		}
	}
	render()
	{
		console.log( this.props.time * 1000, Date.now() );
		if(this.props.time * 1000 < Date.now())
		{
			return <div className="alert alert-warning request-event">
				<div>
					{__("Event archived")}
				</div> 
			</div>
		}
		switch(this.state.member_status)
		{
			case 2:
				return  <div>
					<div className="alert alert-warning request-event">
						<div>
							{__("you are invited")}
						</div>
						<div className="btn btn-warning btn-sm mt-5" onClick={this.onToggle}>
							{__("Withdraw request")}
						</div>
					</div>
					{this.getDialog()}
				</div>
			case 1:
				return  <div>
					<div className="alert alert-warning request-event">
						<div>
							{__("your request is being processed")}
						</div>
						<div className="btn btn-warning btn-sm mt-5" onClick={this.onToggle}>
							{__("Withdraw request")}
						</div>
					</div>
					{this.getDialog()}
				</div>
			case 0:
			default:
				return <div>
					<div className="btn btn-primary btn-lg add-event mt-4" onClick={this.onApply}>
						{__("Apply for participation")}
					</div>
					
				</div>
		}
		
	}
	onToggle =() =>
	{
		this.setState({ isOpen : !this.state.isOpen });
	}
	onWithdraw =() =>
	{
		//
		const Withdraw_Request = gql`mutation Withdraw_Request ( $input: EventRequestInput ) 
		{
		  Withdraw_Request(input : $input)
		  
		}`;
		let pr 		= {};
		pr.user 	= this.props.user.id;
		pr.event 	= this.props.id;
		this.props.client.mutate({
			mutation: Withdraw_Request,
			variables: {input:pr},
			update: (store, { data: { Withdraw_Request } }) =>
			{
				console.log( Withdraw_Request );
				this.setState({ 
					isOpen : false,
					member_status : Withdraw_Request ? 0 : this.state.member_status
				});
			}
		});
	}
	onApply =() =>
	{
		const Apply_Request = gql`mutation Apply_Request ( $input: EventRequestInput ) 
		{
		  Apply_Request(input : $input)
		  
		}`;
		let pr 		= {};
		pr.user 	= this.props.user.id;
		pr.event 	= this.props.id;
		this.props.client.mutate({
			mutation: Apply_Request,
			variables: {input:pr},
			update: (store, { data: { Apply_Request } }) =>
			{
				console.log( Apply_Request );
				this.setState({ 
					isOpen : false,
					member_status : Apply_Request ? 1 : this.state.member_status
				});
			}
		});
	}
	getDialog()
	{
		return <Dialog
			title={__("Withdraw request")}
			isOpen={this.state.isOpen}
			onClose={this.onToggle}
		>
			<div className="p-4">
				
				<ButtonGroup>
					<Button intent={Intent.SUCCESS} onClick={this.onWithdraw}>
						{__("Withdraw request")}
					</Button>
					<Button intent={Intent.DANGER} onClick={this.onToggle}>
						{__("Cancel")}
					</Button>
				</ButtonGroup>
			</div>
		</Dialog>;
	}
	
}
export default compose(
	withApollo
)(EventParticipation);