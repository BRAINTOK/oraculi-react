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

class SchoolResetPasswordForm extends BasicState
{
	// state={login: "", password: ""}

	passWord = (e) =>{this.setState({password: e.currentTarget.value})}

	addRender = () =>
	{
		return <Fragment>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12">
						<div className="page-title text-center mb-3">
							{__("Сбросить пароль")}
						</div>
					</div>
					<div className="col-md-4 col-12">
						<div className="tariff_student p-5">
							<Mutation mutation={mutationToken()}>
								{( token, { data } ) =>
									(
										<form onSubmit={(evt)=>this.onReset(evt, token)}>
											<div className="form-group">
												<label htmlFor="exampleInputPassword1">
													{__("Старый пароль")}
												</label>
												<input
													type="password"
													className="form-control"
													placeholder={__("Пароль")}
													onChange={this.passWord}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputPassword1">
													{__("Новый пароль")}
												</label>
												<input
													type="password"
													className="form-control"
													placeholder={__("Пароль")}
													onChange={this.passWord}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputPassword1">
													{__("Повторите новый пароль")}
												</label>
												<input
													type="password"
													className="form-control"
													placeholder={__("Пароль")}
													onChange={this.passWord}
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
		return "login";
	}
	onReset = (evt, token) =>
	{
		evt.preventDefault();


	}
}
export default compose(
	withApollo,
	withRouter
)(SchoolResetPasswordForm);