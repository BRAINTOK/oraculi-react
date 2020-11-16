import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import {withRouter} from "react-router";
import {compose} from "recompose";
import {Query, withApollo, Mutation} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import gql from 'graphql-tag';

class VerifyUserState extends BasicState
{
	myState = () =>
	{
		const mutation = gql`
			mutation verifyUser($id: String $code: String) {
				verifyUser(id:$id, code:$code)
			}`;
		console.log(this.props.match.params);
		return <Mutation mutation={mutation}>
			{( verifyUser ) => {
				if (!this.state.is_requested) {					
					verifyUser({
						variables:
							{ 
								id: this.props.match.params.id,
								code: this.props.match.params.code,
							},
						update: (store, { data: data} ) =>
						{
							if(data.verifyUser){
								console.log(data);
								const state = {is_verified: true} ;
								this.setState(state);
							}else{
								
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
		return <div className="row text-center">
			<div className="col-12 my-4">
				
			</div>
			<div className="col-12 lead">
				{__("Адрес электронной почты успешно подтвержден. Пожалуйста, войдите под своим email и паролем.")}
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
)(VerifyUserState);