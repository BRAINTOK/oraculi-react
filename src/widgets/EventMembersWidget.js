import React from "react";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo"; 
import gql from "graphql-tag";

class EventMembersWidget extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...props,
			users	: [],
			selected 	: null,
			loading  	: true,
			added		: [],
			deleted		: []
		};
	}
	refresh()
	{
		const test_id = '"' + this.props.id + '"';
		let query = gql`
			query getEventMembers
			{
					getEventMembers(paging:{
					event:[${test_id}]
				})
				{
					user
					{
						id
						display_name
						user_email
					}
				}
			}
		`;  
		this.props.client.query( { query: query, variables:{id : test_id } })
			.then(result  => 
				{
					console.log( result.data.getEventMembers[0].user ); 
					this.setState({
						users : result.data.getEventMembers[0].user,
						loading:false
					})
				}
			)
	}
	componentDidMount()
	{ 
		this.refresh();
	}
	render()
	{
		console.log(this.props);
		const _users = this.state.users.length > 0
			?
			this.state.users.map((e, i) =>
			{
				return <div className="row mx-1">
					<div className="col-md-4 pb-2 border-bottom border-secondary">
						{e.display_name}
					</div>
					<div className="col-md-8 pb-2 border-bottom border-secondary">
						{e.user_email}
					</div>
				</div>
			})
			:
			<div className="alert alert-secondary">
				{__("No members exists")}
			</div>;
		return this.props.data_type == "Bio_Event"
			?
			<div className="row dat my-4">
				<div className="col-md-3 layout-label">
					{__("Event members")}
				</div>
				<div className="col-md-9 ">
					<div className="">
					{_users}
					</div>
				</div>
			</div>
			:
			null;
	}
}
export default EventMembersWidget;