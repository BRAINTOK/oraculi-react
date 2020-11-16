import React, {Fragment} from "react";
import BasicState from "../layouts/BasicState";
import Propfile from "./profile/Profile";
import {__} from "../layouts/utilities/i18n";
import {AppToaster} from "../layouts/utilities/blueUtils";
import { Intent } from "@blueprintjs/core";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {NavLink, Link} from "react-router-dom";

import {compose} from "recompose";
import { loader } from 'graphql.macro';
import {Query, withApollo, graphql, Mutation} from "react-apollo";
import {withRouter} from "react-router";
import gql from "graphql-tag";
import Loading from "../layouts/utilities/Loading";
import {
	getQueryArgs,
	queryCollection,
	getMutationArgs,
	mutationEditName,
	getInputTypeName,
	mutationEdit, getQueryName,
} from "../layouts/schema";
import {userModel} from "../layouts/user";

class SchoolRegisterState extends BasicState
{
	
	state = { before:true };

	email = (e) =>{this.setState({ email: e.currentTarget.value })}
	phone = (e) =>{this.setState({ phone: e.currentTarget.value })}
	passWord = (e) =>{this.setState({password: e.currentTarget.value})}
	onName = (e) =>{this.setState({display_name: e.currentTarget.value})}
	onSecondName = (e) =>{this.setState({secondName: e.currentTarget.value})}
	onChecked = (e) =>{this.setState({checked: !this.state.checked})}
	
	
	before_register()
	{
		const mutation = gql`
			mutation registerUser($input: UserInput) {
				registerUser(input: $input)
			}`;
		return <Fragment> 
			<Mutation mutation={mutation}>
			{( m_change ) => {
			return <div className="container">
				<div className="row justify-content-center h-100 align-items-center">
					<div className="col-12">
						<div className="page-title text-center mb-3">
							{__("Регистрация")}
						</div>
					</div>
					<div className="col-md-4 col-12">
						<div className="tariff_student p-5">
							<form onSubmit={(e)=>{e.preventDefault(); this.onChange(this.state, m_change)}}>
								<div className="form-group justify-content-center d-flex flex-column">
									<label className="exampleInputEmail1">
										{__("Имя")}
									</label>
									<input
										type="text"
										className="form-control"
										placeholder={__("Имя")}
										value={this.state.name}
										onChange={this.onName}
									/>
								</div>

								<div className="form-group justify-content-center d-flex flex-column">
									<label className="exampleInputEmail1">
										{__("Фамилия")}
									</label>
									<input
										type="text"
										className="form-control"
										placeholder={__("Фамилия")}
										value={this.state.secondName}
										onChange={this.onSecondName}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="exampleInputEmail1">
										{__("Электронная почта")}
									</label>
									<input 
										type="email" 
										className="form-control" 
										value={this.state.emain}
										placeholder={__("Эл. Почта")} 
										onChange={this.email}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="exampleInputEmail1">
										{__("Номер телефона для связи")}
									</label>
									<input 
										type="phone" 
										className="form-control" 
										placeholder={__("Введите номер телефона")} 
										value={this.props.phone}
										onChange={this.phone}
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
									<input 
										type="checkbox" 
										className="form-check-input" 
										onChange={this.onChecked}
										checked={this.state.checked}
										id="exampleCheck1"
									/>
									<label 
										className="form-check-label text-left" 
										htmlFor="exampleCheck1"
									>
										{ __("Я согласен с ") }
										<NavLink
											to="/usl"
										>
											{ __("Условиями Пользовательского соглашения") }
										</NavLink>
									</label>
								</div>
								<input 
									type="submit" 
									className="btn btn-primary py-2 px-5 rounded-pill" 
									value={__("Зарегистрироваться")} 
								/>	
							</form>
						</div>
					</div>
				</div>
			</div>
			}}
			</Mutation>
		</Fragment>;
	}
	after_register()
	{
		return <div className="row justify-content-center h-100 align-items-center">
			<div className="lead text-center col-md-6">
				<div className="font-weight-bold">
					{__("Внимание! ")}
				</div>
				<div className="my-5">
					{__("В ближайшие 10 минут Вы получите электронное письмо на адрес, который Вы указали при регистрации. Для завершения регистрации необходимо совершить последний шаг (инструкция в письме).")}
				</div>
				<Link to="/" className="btn btn-danger btn-sm">{__("Return to main page")}</Link>
			</div>
		</div>
	}
	no_register()
	{
		return <div className="row justify-content-center h-100 align-items-center">
			<div className="lead text-center col-md-6">
				{__("Для регистрации новой учётной записи необходимо разлогиниться.")}
			</div>
			<Link to="/" className="btn btn-danger btn-sm mt-5">{__("Return to main page")}</Link>
		</div>
	}
	
	render = () =>
	{
		if( this.props.user )
		{
			return this.no_register();
		}
		return <div className="layout-state">
			{ this.state.before ? this.before_register() : this.after_register() }
		</div>
	}

	getRoute = () =>
	{
		return "register";
	}
	getExtends = () =>
	{
		return null;
	}
	onChange = (state, m_change) =>
	{
		delete state.avatar;
		delete state.html;
		delete state.description;
		delete state.panelHtml;
		delete state.roles;
		delete state.route;
		delete state.sub;
		delete state.__typename;
		console.log( state );

		if(this.state.email === "")
		{
			AppToaster.show({  
				intent: Intent.DANGER,
				icon: "error", 
				message: __("email not be empty")		
			});
			return;
		}
		if(this.state.name === "")
		{
			AppToaster.show({  
				intent: Intent.DANGER,
				icon: "error", 
				message: __("name not be empty")		
			});
			return;
		}
		// if(this.state.password === "")
		// {
		// 	AppToaster.show({
		// 		intent: Intent.DANGER,
		// 		icon: "error",
		// 		message: __("password not be empty")
		// 	});
		// 	return;
		// }

		m_change({
			variables:
				{
					input: {
						user_login: state.login,
						user_email: state.email,
						first_name: state.display_name,
						last_name: 	state.secondName,
						password: 	state.password,
						phone:		state.phone
					}
				},
			update: (store, { data: { registerUser } }) =>
			{
				this.setState({ before: false });
				AppToaster.show({
					intent: Intent.SUCCESS,
					icon: "tick",
					message: __("Вы зарегистрированы! Проверьте свою электронную почту.")
				});
			}
		})

	}
}
export default compose(
	withApollo,
	withRouter
)(SchoolRegisterState);