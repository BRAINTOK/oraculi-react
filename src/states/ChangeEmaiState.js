import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import {withRouter} from "react-router";
import {compose} from "recompose";
import {Query, withApollo, Mutation} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import gql from 'graphql-tag';

class ChangeEmaiState extends BasicState
{
	myState = () =>
	{
		const mutation = gql`
			mutation verifyEmailUser($id: String $code: String) {
				verifyEmailUser(id:$id, code:$code)
			}`;
		console.log(this.props.match.params);
		return <Mutation mutation={mutation}>
			{( verifyEmailUser ) => {
				if (!this.state.is_requested) {					
					verifyEmailUser({
						variables:
							{ 
								id: this.props.match.params.id,
								code: this.props.match.params.code,
							},
						update: (store, { data: data} ) =>
						{
							console.log(data.verifyEmailUser);
							if(data.verifyEmailUser)
							{
								const state = {is_verified: true, new_email: data.verifyEmailUser} ;
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
		return "verify";
	}
	success()
	{
		return <div className="row text-center justify-content-center">
			<div className="col-12 my-4">
				
			</div>
			<div className="col-md-7 lead">
				{
					__("Адрес Вашей электронной почты изменён. С настоящего момента вход на сайт осуществляется по полю - ") 
					
				}
				<div className="font-weight-bold">{this.state.new_email}</div>
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
	notsuccess()
	{
		return <div className="row text-center">
			<div className="col-12 my-4">
				
			</div>
			<div className="col-12 lead">
				{__("Адрес электронной почты не подтвержден. Проверьте ссылку из письма.")}
				{}
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
	
}


export default compose(
	withApollo,
	withRouter
)(ChangeEmaiState);