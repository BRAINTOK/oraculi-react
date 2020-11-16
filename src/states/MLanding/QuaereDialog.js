import React, { Component, Fragment } from "react";
import moment from 'moment';
import { __ } from "../../layouts/utilities/i18n";
import {Callout, Classes, Button, Intent, Dialog} from "@blueprintjs/core";
import FieldInput from "../../layouts/FieldInput";

import gql from "graphql-tag";
import { withApollo, graphql, Mutation } from "react-apollo";
import { AppToaster } from "../../layouts/utilities/blueUtils";
import { compose } from "recompose";
import { withRouter } from "react-router";

class QuaereDialog extends Component
{
	state = {
		form:{ 
			post_title: __("Message for Tutor"),
			//user: this.props.user, 
			//user_email: this.props.user ? this.props.user.email : "" ,
			post_content:"" ,
			thumbnail:null
		}
	}
	render()
	{
		const mutation = gql`mutation changeBio_Quaere($input: Bio_QuaereInput) 
		{
			changeBio_Quaere(input: $input)
			{
				id
				post_title
				post_content
				adressee
				{
				  id 
				  display_name
				}
			}
		}`;
		let m_change="";
		return <div className="p-4">
			<Mutation mutation={mutation}>
				{m_change => {
					return <Fragment>
					<form
						onSubmit={e => {
							e.preventDefault();
							this.onChange(m_change);
						}}
					>
						<FieldInput
						  title={"title"}
						  type='string'
						  field={"post_title"}
						  editable={true}
						  vertical={true}
						  value={this.state.form.post_title}
						  onChange={this.onTitle}
						/>
						<FieldInput
						  title={"Message"}
						  type='text'
						  field={"post_content"}
						  editable={true}
						  vertical={true}
						  value={this.state.form.post_content}
						  rows={3}
						  onChange={this.onMessage}
						/>
						<FieldInput
						  title={"Includes"}
						  type='media'
						  field={"thumbnail"}
						  editable={true}
						  vertical={true}
						  value={this.state.form.thumbnail}
						  onChange={this.onthumbnail}
						/>
						 <div className='row'>
							<div className='col-md-7 mt-1 text-center'>
								<input
									type='submit'
									className='btn btn-secondary my-3'
									value={__("Send Quaere")}
								/>
							</div>
						 </div>
					</form>
					</Fragment>
				}}
			</Mutation>			
		</div>
	}
	onField = (e, name) => 
	{
		this.state.form[name] = e;
		this.setState({ form : {...this.state.form} });
	};
	onTitle = e => 
	{
		this.onField(e, "post_title");
		console.log(e);
	};
	onEmail = e => 
	{
		this.onField(e, "user_email");
	};
	onMessage = e => 
	{
		this.onField(e, "post_content");
	};
	onthumbnail = (e, field, title, anoverField) => 
	{
		console.log(field, title, anoverField);
		this.onField(e, "thumbnail");
		this.onField(anoverField.thumbnail_name, "thumbnail_name");
	};
	onChange = m_change => 
	{
		let form = {...this.state.form, adressee:"1"};
		delete form.user;
		delete form.user_email;
		delete form.__typename;
		if(!form.post_content)
		{
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick",
				message: __("Send message")
			});
			return;
		}
		
		m_change({
			variables: {
				/*
				input: {
					user_email: this.state.form.user_login,
					display_name: this.state.form.display_name + " " + this.state.form.second_name,
					password: this.state.form.password,
				}
				*/
				input: form
			},
			update: (store, { data: { changeBio_Quaere } }) => 
			{
				console.log(changeBio_Quaere);
				AppToaster.show({
					intent: Intent.SUCCESS,
					icon: "tick",
					message: __("Profile was updated")
				});
			}
		});
		
	}
}
export default  compose(withApollo, withRouter)(QuaereDialog);