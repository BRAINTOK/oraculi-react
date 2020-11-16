import React, {Component} from "react";
import {Dialog, Classes, Button, Intent} from "@blueprintjs/core";
import {__} from "../layouts/utilities/i18n";
import { NavLink, Link } from 'react-router-dom';

class MLogin extends Component
{
	state={
		
		isQuestion:false,
		isRegistation:false,
		isEnter:false
	}
	render()
	{
		return [
			<div className="first-screen__aside" key={1}>
				<Link className="cabnet"  to="/login">
					<div className="enter_icon">
						<i className="fas fa-sign-in-alt"></i>
					</div>					
				</Link>
				<Link className="cabnet" to="/register">
					<div className="reg_icon">
						<i className="fas fa-user-plus"></i>
					</div>					
				</Link>
				{/*
				<div className="question" onClick={this.onQuestionHandler}>
					<div className="question__icon">
						<i className="far fa-envelope"></i>
					</div>
					<div className="question__text">
						Задать вопрос
					</div>
				</div>
				*/}
			</div>,						
			<Dialog
				isOpen={this.state.isQuestion}				
				title={__("Задать вопрос")}
				onClose={this.onQuestionHandler}
				key={3}
			>
				<div className={Classes.DIALOG_BODY}>
					<div className="popup__form-box">
						<div className="popup__form-row">
							<input type="text" className="input-style" placeholder={__("Имя")}/>
						</div>
						<div className="popup__form-row">
							<input type="text" className="input-style"  placeholder={__("Телефон")}/>
						</div>
						<div className="popup__form-row">
							<input type="text" className="input-style"  placeholder={__("Email")}/>
						</div>
						<div className="popup__form-row">
							<textarea className="input-style" rows="5" placeholder={__("Комментарий")}>
							</textarea>
						</div>
					</div>
					<div className="btn" onClick={this.onQuestionHandler}>
						{__("Отправить")}
					</div>
				</div>
			</Dialog>,						
			<Dialog
				isOpen={this.state.isRegistation}				
				title={__("Регистрация")}
				onClose={this.onRegistationHandler}
				key={4}
			>
				<div className={Classes.DIALOG_BODY}>
					<div className="popup__form-box">
						<div className="popup__form-row">
							<input type="text" className="input-style" placeholder={__("Логин")}/>
						</div>
						<div className="popup__form-row">
							<input type="password" className="input-style"  placeholder={__("Пароль")}/>
						</div>						
					</div>
					<div className="btn" onClick={this.onRegistationHandler}>
						{__("Зарегистрировать")}
					</div>
				</div>
			</Dialog>,						
			<Dialog
				isOpen={this.state.isEnter}				
				title={__("Войти")}
				onClose={this.onEnterHandler}
				key={5}
			>
				<div className={Classes.DIALOG_BODY}>
					<div className="popup__form-box">
						<div className="popup__form-row">
							<input type="text" className="input-style" placeholder={__("Логин")}/>
						</div>
						<div className="popup__form-row">
							<input type="password" className="input-style"  placeholder={__("Пароль")}/>
						</div>						
					</div>
					<div className="btn" onClick={this.onEnterHandler}>
						{__("Отправить")}
					</div>
				</div>
			</Dialog>
		]
	}
	onQuestionHandler = evt =>
	{
		this.setState({isQuestion:!this.state.isQuestion});
	}
	onRegistationHandler = evt =>
	{
		this.setState({isRegistation:!this.state.isRegistation});
	}
	onEnterHandler = evt =>
	{
		this.setState({isEnter:!this.state.isEnter});
	}
}
export default MLogin;