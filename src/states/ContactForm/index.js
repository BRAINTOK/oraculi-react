import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";

class ContactForm extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			name:"",
			title:"",
			email:"",
			content:""
		};
	}
	render()
	{
		return <form className="question_form" onSubmit={this.onSubmit}>
			<div className={"row " + this.props.formClass} >
				<div className="col-12">
					<div className="py-5">
						<h2 className="text-center">
							{this.props.title}
						</h2>
					</div>
				</div>
				<div className="col-12 col-lg-4">
					<input 
						type="text" 
						className="form-control" 
						placeholder="Имя"
						value={this.state.name}
						onChange={this.onName}						
					/>
					<input 
						type="email" 
						className="form-control" 
						placeholder="E-mail"
						value={this.state.email}
						onChange={this.onEmail}	 
					/>
					<input 
						type="text" 
						className="form-control" 
						placeholder="Тема"
						value={this.state.title}
						onChange={this.onTitle}	 
					/>
				</div>
				<div className="col-12 col-lg-8">
					<textarea 
						className="form-control" 
						rows="6" 
						placeholder="Задать вопрос..."
						value={this.state.content}
						onChange={this.onContent}	 
					/>
				</div>
				<div className="col-12 justify-content-center d-flex">
					<input 
						type="submit" 
						className="btn btn-primary btn-faq"
						value="Отправить"
					/>
					
			
				</div>
			</div>
		</form>
	}
	onName = evt =>
	{
		evt.preventDefault();
		this.setState({name:evt.currentTarget.value});
	}
	onEmail = evt =>
	{
		evt.preventDefault();
		this.setState({email:evt.currentTarget.value});
	}
	onTitle = evt =>
	{
		evt.preventDefault();
		this.setState({title:evt.currentTarget.value});
	}
	onContent = evt =>
	{
		evt.preventDefault();
		this.setState({content:evt.currentTarget.value});
	}
	
	onSubmit = evt =>	
	{
		evt.preventDefault();
		console.log(this.state);
	}
}
export default ContactForm;