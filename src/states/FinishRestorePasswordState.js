import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import {AppToaster} from "../layouts/utilities/blueUtils";
import { Intent } from "@blueprintjs/core";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import {withRouter} from "react-router";
import {compose} from "recompose";
import {Query, withApollo, Mutation} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import gql from 'graphql-tag';

class FinishRestorePasswordState extends BasicState
{
	myState = () =>
	{
		const mutation = gql`
			mutation compareRestore($id: String $code: String) {
				compareRestore(id:$id, code:$code)
			}`;
		return <Mutation mutation={mutation}>
			{( compareRestore ) => 
			{
				if (!this.state.is_requested) {					
					compareRestore({
						variables:
							{ 
								id: this.props.match.params.id,
								code: this.props.match.params.code,
							},
						update: (store, { data: data} ) =>
						{
							if(data.compareRestore)
							{
								const state = {is_verified: true} ;
								this.setState(state);
							}
							else
							{
								
							}
							this.setState({is_requested: true})
						}
					})

				}
				return this.state.is_verified ? this.success() : this.notsuccess()
											
											
			}}
		</Mutation>
	}
	getRoute = () =>
	{
		return "restore";
	}
	success()
	{
		const mutation = gql`
			mutation saveNewPassword($id: String $password: String $code: String) {
				saveNewPassword(id:$id, password:$password, code:$code)
			}`;
		return <Mutation mutation={mutation}>
		{
			( saveNewPassword, { data } ) => 
			{
				return <div className="row text-center justify-content-center">
					<div className="col-12 my-4">
						
					</div>
					<div className="col-12 lead">
						{__("Insert new password")}
					</div>
					<div className="col-md-5 mt-4">
						<input type="password" value={this.state.newpass} onChange={this.onChangePass} className="form-control" />
					</div>
					<div className="col-12 my-4">
						<div 
							className="btn btn-danger btn-sm mr-4" 
							onClick={ evt => this.onChangePassword( evt, saveNewPassword ) }
						>
							{__("Save new password")}
						</div>	
						<Link 
							className="btn btn-danger btn-sm"
							to="/"
						>
							{__("or return to main page")}
						</Link>
					</div>
				</div>			
			}
		}
		</Mutation>
	}
	notsuccess()
	{
		return <div className="row text-center">
			<div className="col-12 my-4">
				
			</div>
			<div className="col-12 lead">
				{__("Email address not verified. Repeat the procedure.")}
			</div>
			<div className="col-12 my-4">
				<Link 
					className="btn btn-danger btn-sm"
					to="/"
				>
					{__("Return to main page")}
				</Link>
			</div>
		</div>
	}
	
	onChangePass = ( evt ) =>
	{
		this.setState({newpass:evt.currentTarget.value});
	}
	onChangePassword = ( evt, saveNewPassword ) =>
	{
		evt.preventDefault();
		if(this.state.newpass)
		{
			saveNewPassword({
				variables:
					{
						password: this.state.newpass,
						code: this.props.match.params.code,
						id: this.props.match.params.id
					},
				update: (store, data ) =>
				{
					if(data.data.saveNewPassword)
					{
						this.setState({newpass: ""});
						AppToaster.show({
							intent: Intent.SUCCESS,
							icon: "tick",
							message: __("Пароль сменён. Перейдите на главную")
						});
					}
					else
					{
						AppToaster.show({
							intent: Intent.DANGER,
							icon: "tick",
							message: __("Пароль не сменён.")
						});
					}
				}
			})
		}
		else
		{
			this.setState({alert:true});			
		}
	}
}


export default compose(
	withApollo,
	withRouter
)(FinishRestorePasswordState)