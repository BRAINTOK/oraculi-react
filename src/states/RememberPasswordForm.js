import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";

import { compose } from "recompose";
import gql from "graphql-tag";
import {Mutation,  withApollo} from 'react-apollo';
import {withRouter} from "react-router";
import {Card, Intent} from "@blueprintjs/core";
import {__} from "../layouts/utilities/i18n";
import {Link, NavLink} from "react-router-dom";
import {AppToaster} from "../layouts/utilities/blueUtils";

class RememberPasswordForm extends BasicState
{
	//state={ email : "", alert :null }
	onEmail = e =>
	{
		this.setState({email: e.currentTarget.value, alert:null})
	}

	addRender = () =>
	{
		const mutation_remember = gql`mutation restorePass( $email:String )
		{
		  restorePass( email:$email )
		}`;
		return <div className="row justify-content-center">		
			<div className="col-md-4 col-12">
				<div className="tariff_student p-5">
					<Mutation mutation={mutation_remember}>
					{
						( token, { data } ) =>
						(
							<form onSubmit={(evt)=>this.onRemember(evt, token)}>
								<div className="form-group">
									<label >
										{__("Insert your e-mail")}
									</label>
									<input
										type="string"
										className="form-control"
										placeholder={__("e-mail")}
										onChange={this.onEmail}
									/>
									<div className="h-70">
										<div className={this.state.alert ? "text-danger" : "hidden" } >
											{__("email not be empty")}
										</div>
									</div>
								</div>
								<input 
									type="submit" 
									className="btn btn-primary py-2 px-4 my-2 rounded-pill" 
									value={__("Send instructions to e-mail")} 
								/>
								<Link className="btn btn-primary py-2 px-4 my-2 rounded-pill" to="/">									
									{__("or return to main page")} 
								</Link>
							</form>
						)
					}
					</Mutation>

				</div>
			</div>
		</div>;
	}
	getRoute = () =>
	{
		return "remember";
	}
	onRemember = (evt, restorePass) =>
	{
		evt.preventDefault();
		if(this.state.email)
		{
			restorePass({
				variables:
					{
						email: this.state.email
					},
				update: (store, data ) =>
				{
					if(data.data.restorePass) 
						AppToaster.show({
							intent: Intent.SUCCESS,
							icon: "tick",
							message: __("Проверьте свою электронную почту и следуйте инструкциям.")
						});
					else
						AppToaster.show({
							intent: Intent.DANGER,
							icon: "tick",
							message: __("Полььзователя с указанной почтой не найдено. Попробуйте ввести другой e-mail адрес")
						});
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
)(RememberPasswordForm);