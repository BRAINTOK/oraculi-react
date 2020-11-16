import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";

import { compose } from "recompose";
import {Mutation,  withApollo} from 'react-apollo';
import {withRouter} from "react-router";
import {Card, Intent} from "@blueprintjs/core";
import {__} from "../layouts/utilities/i18n";
import {mutationToken, queryUserInfo} from "../layouts/schema";
import {NavLink} from "react-router-dom";
import {AppToaster} from "../layouts/utilities/blueUtils";

class SchoolRememberPasswordForm extends BasicState
{
	// state={login: "", password: ""}

	login = (e) =>{this.setState({login: e.currentTarget.value})}

	addRender = () =>
	{
		return <Fragment>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12">
					</div>
					<div className="col-md-4 col-12">
						<div className="tariff_student p-5">
							<Mutation mutation={mutationToken()}>
								{( remember, { data } ) =>
									(
										<form onSubmit={(evt)=>this.onRemember(evt, remember)}>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">
													{__("Эл. Почта")}
												</label>
												<input
													type="text"
													className="form-control"
													placeholder={__("Эл. Почта")}
													onChange={this.login}
												/>
											</div>
											<input type="submit" className="btn btn-primary py-2 px-5 rounded-pill" value={__("Вход")} />
										</form>
									)}
							</Mutation>

						</div>
					</div>
				</div>
			</div>
		</Fragment>;
	}
	getRoute = () =>
	{
		return "remember";
	}
	onRemember = (evt, remember) =>
	{
		evt.preventDefault();
		
	}
}
export default compose(
	withApollo,
	withRouter
)(SchoolRememberPasswordForm);