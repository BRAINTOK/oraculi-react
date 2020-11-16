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

class SchoolLoginState extends BasicState
{

	login = (e) =>{this.setState({login: e.currentTarget.value})}
	passWord = (e) =>{this.setState({password: e.currentTarget.value})}
	
	addRender = () =>
	{
		return <Fragment> 
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12">
						<div className="page-title text-center mb-3">
							{__("Вход")}
						</div>
					</div>
					<div className="col-md-4 col-12">
						<div className="tariff_student p-5">
							<Mutation mutation={mutationToken()}>
								{( token, { data } ) =>
									(
										<form onSubmit={(evt)=>this.onLogin(evt, token)}>
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
											<div className="form-group">
												<label htmlFor="exampleInputPassword1">
													{__("Пароль")}
												</label>
												<input
													type="password"
													className="form-control"
													placeholder={__("Пароль")}
													onChange={this.passWord}
												/>
											</div>
											<div className="form-group form-check">
												<label
													className="form-check-label text-left"
													htmlFor="exampleCheck1"
												>
													{ __("Если у вас нет профиля, то вы можете: ") }
													<NavLink
														to="/register"
														className="text-center"
													>
														{__("Зарегистрироваться")}
													</NavLink>
												</label>
											</div>
											<div className="form-group form-check">
												<label
													className="form-check-label text-left"
													htmlFor="exampleCheck1"
												>
													{ __("Если вы забыли пароль: ") }
													<NavLink
														to="/remember"
														className="text-center"
													>
														{__("Напомнить пароль")}
													</NavLink>
												</label>
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
	onLogin = (evt, token) =>
	{
		evt.preventDefault();
		token({
			variables:
				{ input:{
						grant_type: "wp-ciba",
						login: this.state.login || "",
						password: this.state.password || ""
				}
				},
			update: (store, { data: data} ) =>
			{
				if(data.token){
					console.log(data);
					AppToaster.show({
						intent: Intent.SUCCESS,
						icon: "tick",
						message: __("You enter by User")
					});
					localStorage.setItem(
						'token',
						data.token.access_token
					);
					this.props.history.replace("/");
				}else{
					
				}
			},
			refetchQueries: [ { query: queryUserInfo(), variables: {}}]
		})

	}
}
export default compose(
	withApollo,
	withRouter
)(SchoolLoginState);