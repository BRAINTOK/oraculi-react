import React, {Component, Fragment} from "react";
import lessons from "../../config/data/lessons.json";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import courses from "../../config/data/courses";
import {IDateFormatProps} from "@blueprintjs/datetime";

class Profile extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {name:"", email: "", password: ""};
	}

	render()
	{
		const selector = courses.map((e, i) =>
		{
			return <option key={i} value={e._id} >
				{e.title}
			</option>
		});
		const jsDateFormatter: IDateFormatProps = {
			formatDate: date => date.toLocaleDateString(),
			parseDate: str => new Date(Date.parse(str)),
			placeholder: __("Time"),
		};
		return <div className="container">
			<div className="row justify-content-center ">
				<div className="col-md-4 col-12 tarif-direction p-4">
					<form onSubmit={this.onSubmit}>
						<div className="form-group justify-content-center d-flex flex-column">
							<div>
								Ваш тариф
							</div>
							<label className="exampleInputEmail1">
								{__("Название тарифа")}
							</label>

							<input className="form-control" value="111" disabled="true"/>

							<label className="exampleInputEmail1 mt-3">
								{__("Дата окончания")}
							</label>

							<input className="form-control" value="12.05.2019"  disabled="true"/>



							{/*<small id="emailHelp" className="form-text text-muted">*/}
							{/*	We'll never share your email with anyone else.*/}
							{/*</small>*/}
							<input type="submit" className="btn btn-primary mt-4 py-2 px-5 mx-auto" value={__("изменить")}/>
						</div>
					</form>
				</div>
			</div>
			<div className="row justify-content-center ">
				<div className=" col-12 page-title text-center my-3">
					{__("Личные данные")}
				</div>

				<div className="col-md-4 col-12 tarif-direction p-4 mb-4">
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
			</div>
		</div>
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
export default Profile;