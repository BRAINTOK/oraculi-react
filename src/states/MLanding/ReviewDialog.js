import React, {Component, Fragment} from "react";
import { Dialog, Classes, Button, Intent } from "@blueprintjs/core";
import { NavLink, Link } from "react-router-dom";
import { __ } from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import { compose } from "recompose";
import { withApollo, Mutation } from "react-apollo";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import {AppToaster} from "../../layouts/utilities/blueUtils";

class ReviewDialog extends Component
{
	state = {
		isHide: !(this.props.user && this.props.user.is_waiting_review),
		isQuestion: this.props.isQuestion,
		isOpen: this.props.isOpen,
		height: 0
	};
	shouldComponentUpdate(nextProps, nextState)
	{
		return nextProps.isQuestion != this.state.isQuestion;
	}
	componentWillUpdate(nextProps, nextState)
	{
		this.setState({ isQuestion : nextProps.isQuestion });
	}
	render()
	{
		const mutation = gql`
			mutation changeBio_Review($input: Bio_ReviewInput) 
			{
				changeBio_Review(input:$input)
				{
					id
					post_content
				}
			}`;
			
		const current_course = this.props.user && this.props.user.current_course
			?  
			this.props.user.current_course.post_title 
			: 
			"";
		
		return  <Dialog
			isOpen={this.state.isQuestion}
			title={__("Обратная связь")}
			onClose={this.onQuestionHandler}
			key={3}
		>
			<div className={Classes.DIALOG_BODY}>
				<Mutation mutation={mutation}>
				{( changeBio_Review ) => 
				{
					return <Fragment>
						<div className='popup__form-box'>					
							<div className='popup__form-row text-center'>
								{__("Просим Вас сообщить нам, что Вы думаете о карте ")}
								<span className="font-weight-bold"> 
									{current_course}
								</span>
							</div>
							<div className='popup__form-row'>
							  <textarea
								className='input-style'
								rows='5'
								placeholder={ __( "Комментарий" ) }
								onChange={this.onCommentChange }
								value={this.state.comment}
							  >
								{ this.state.comment }			  
							  </textarea>
							</div>
							<div className={this.state.alert ? " text-danger h-70" : " hidden h-70"} >
								{__("Напишите сообщение")}
							</div>	
						</div>
						  <div className='btn' onClick={ evt => this.onSendMessage(evt, changeBio_Review)}>
							{__("Отправить")}
						  </div>
					</Fragment>				
				}}
				</Mutation>
			  
			</div>
		</Dialog>
	}
	onQuestionHandler = evt =>
	{
		this.props.onClose( );
	}
	onCommentChange = evt =>
	{
		this.setState({ comment:evt.currentTarget.value, alert:false });
	}
	onSendMessage(evt, changeBio_Review)
	{
		if( !this.state.comment )
		{
			this.setState({  alert : true });
		}
		else
		{
			console.log( this.state.comment );
			evt.preventDefault();
			if( this.props.user && this.props.user.current_course) 
			{
				changeBio_Review({
					variables:
					{
						input:{
							post_author:this.props.user.id,
							post_title: this.props.user.display_name + ": " + this.props.user.current_course.post_title,
							post_content: this.state.comment,
							bio_course: this.props.user.current_course.id
						}
					},
					update: (store, data ) =>
					{
						AppToaster.show({
							intent: Intent.SUCCESS,
							icon: "error",
							message: __( "Ваше сообщение получено. Спасибо за интерес к нашему контенту!" )
						});
						this.setState({ isQuestion: !this.state.isQuestion, alert:false, comment:"", isHide:true });
						this.props.onClose( );
					}
				})
				
				
				
			}
		}
	}
}
export default compose(
	withApollo, 
	withRouter
)(ReviewDialog);