import React, {Fragment} from "react";
import BasicState from "../layouts/BasicState";
import Propfile from "./profile/Profile";
import {__} from "../layouts/utilities/i18n";
import {AppToaster} from "../layouts/utilities/blueUtils";
import { Intent } from "@blueprintjs/core";
import { DateInput, IDateFormatProps, TimePrecision } from "@blueprintjs/datetime";
import Moment from 'react-moment';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'moment/locale/ru';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {compose} from "recompose";
import { loader } from 'graphql.macro';
import {Query, withApollo, graphql, Mutation} from "react-apollo";
import {withRouter} from "react-router";
import gql from "graphql-tag";
import Loading from "../layouts/utilities/Loading";
import LayoutIcon from "../layouts/LayoutIcon";
import getWidget, { initArea } from "../layouts/utilities/getWidget";
import {
	getInputTypeName,

} from "../layouts/schema/ecosystem";

import {
	getQueryArgs,
	queryCollection,
	getMutationArgs,
	mutationEdit,
} from "../layouts/schema";
import courses from "../config/data/courses.json";

class SchoolProfileState extends BasicState
{
	render = () =>
	{		 
		return <div className="layout-state p-0">
			<div className="tutor-row menu-row">
				<div className="tutor-left-aside-2 menu-aside">					
					<div className="layout-state-head menu-header-22">
						<LayoutIcon
							isSVG={ true } 
							src={ this.state.route.icon } 
							className="layout-state-logo "
						/>
						<div className="layout-state-title">
							{ __( this.state.route.title ) }
						</div>
					</div>
					<div className="small mx-3 mb-3 text-secondary">					
						{this.props.description}
					</div>
					<div className="tutor-menu">
						
					</div>
					{
						initArea( "profile-left-aside", 
							{ ...this.props } 
						) 
					}
				</div>
				<div className="tutor-main-2 pr-0">	 
					<div className="menu-header-22 flex-centered"> 
					
					</div>
				
					<form onSubmit={this.onSubmit}>
						<div className="form-group justify-content-center d-flex flex-column">
							<label className="exampleInputEmail1">
								{__("Электронная почта")}
							</label>
							<input
								type="email"
								className="form-control"
								placeholder={__("Электронная почта")}
								value={this.state.email}
								onChange={this.onEmail}
							/>
						</div>
						
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
						
						<div className="form-group justify-content-center d-flex flex-column">
							<label className="exampleInputEmail1">
								{__("Телефон")}
							</label>
							<input
								type="phone"
								className="form-control"
								placeholder={__("Телефон")}
								value={this.state.phone}
								onChange={this.onPhone}
							/>
						</div>
						
						<div className="form-group justify-content-center d-flex flex-column">
							<label className="exampleInputEmail1">
								{__("Старый пароль")}
							</label>
							<input
								type="password"
								className="form-control"
								placeholder={__("Старый пароль")}
								value={this.state.oldPass}
								onChange={this.onOldPass}
							/>
						</div>
						
						<div className="form-group justify-content-center d-flex flex-column">
							<label className="exampleInputEmail1">
								{__("Новый пароль")}
							</label>
							<input
								type={ this.state.see ? "text" : "password"}
								className="form-control"
								placeholder={__("Новый пароль")}
								value={this.state.newPass}
								onChange={this.onNewPass}
							/>
						</div>
						
						<div className="form-group justify-content-center d-flex flex-column">
							<label className="exampleInputEmail1">
								{__("Подтверждение нового пароля")}
							</label>
							<input
								type={ this.state.see ? "text" : "password"}
								className="form-control"
								placeholder={__("Подтверждение нового пароля")}
								value={this.state.seqPass}
								onChange={this.onSeqPass}
							/>
						</div>
						<div className="w-100 text-center mt-3">
							<div className="btn btn-link" onClick={this.onSee}>
								{__(this.state.see ? "Скрыть пароль" : "Показать пароль")}
							</div>
						</div>
						<div className="w-100 text-center mt-3">
							<input 
								type="submit" 
								className="btn btn-primary mt-4 py-2 px-5 mx-auto" 
								value={__("Сохранить")} 
							/>
						</div>
					</form>
				</div>				
				<div className="tutor-right-aside-2">
					{ 	
						initArea( 
							"profile-right-aside", 
							{ ...this.props } 
						) 
					}
				</div>
			</div>
		</div>
	}
	getRoute = () =>
	{
		return "profile";
	}
	onSubmit = () =>
	{
		
	}
	onCourse = () =>
	{
		
	}
	onEmail = evt =>
	{
		this.setState({email : evt.currentTarget.value});
	}
	onName = evt =>
	{
		this.setState({name : evt.currentTarget.value});
	}
	onSecondName = evt =>
	{
		this.setState({secondName : evt.currentTarget.value});
	}
	onPhone = evt =>
	{
		this.setState({phone : evt.currentTarget.value});
	}
	onOldPass = evt =>
	{
		this.setState({oldPass : evt.currentTarget.value});
	}
	onNewPass = evt =>
	{
		this.setState({newPass : evt.currentTarget.value});
	}
	onSeqPass = evt =>
	{
		this.setState({seqPass:evt.currentTarget.value});
	}
	onSee= () =>
	{
		this.setState({see:!this.state.see});
	}
	handleStartChange = value =>
	{
		this.setState({ value });
		const state = { ...this.state, value };
	}
}
export default compose(
	withApollo,
	withRouter
)(SchoolProfileState);