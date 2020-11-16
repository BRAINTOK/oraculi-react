import React, { Fragment, Component } from "react";
import { __ } from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";
import Vimeo from "react-vimeo";
import {
  FormGroup,
  Dialog,
  InputGroup,
  Classes,
  Button,
  Intent,
  Icon
} from "@blueprintjs/core";
import FieldInput from "../layouts/FieldInput";
import gql from "graphql-tag";
import { withApollo, graphql, Mutation } from "react-apollo";
import { AppToaster } from "../layouts/utilities/blueUtils";
import getWidget, { initArea } from "../layouts/utilities/getWidget";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class MProfileState extends BasicState {
  basic_state_data() {
    return { form: this.props.user ? this.props.user : {} };
  }
  addRender() {
    const mutation = gql`
      mutation changeCurrentUser($input: UserInput) {
        changeCurrentUser(input: $input)
      }
    `;
    return (
      <Fragment>
        <Mutation mutation={mutation}>
          {m_change => {
            //console.log(this.props.user);
            console.log(this.state);
            return (
				<div className=" mt-5">
					<div className="tutor-row">
						<div className="tutor-left-aside mobile-relatived">
							{ 
								initArea( 
									"user-favorites-left-aside", 
									{ ...this.props } 
								) 
							}
						</div>
						<div className="tutor-main">
							<div className=' p-0'>
							  <form
								onSubmit={e => {
									e.preventDefault();
									this.onChange(m_change);
								}}
							  >
								<FieldInput
								  title={"Имя"}
								  type='string'
								  field={"first_name"}
								  editable={true}
								  value={this.state.form.first_name}
								  onChange={this.onFirstName}
								/>
								<FieldInput
								  title={"Фамилия"}
								  type='string'
								  field={"last_name"}
								  editable={true}
								  value={this.state.form.last_name}
								  onChange={this.SecondName}
								/>
								<FieldInput
								  title={"E-mail"}
								  type='email'
								  field={"user_email"}
								  editable={true}
								  value={this.state.form.user_email}
								  onChange={this.onEmail}
								/>
								<FieldInput
								  title={"Телефон для связи"}
								  type='phone'
								  field={"phone"}
								  editable={true}
								  value={this.state.form.phone}
								  onChange={this.onPhone}
								/>
								<FieldInput
								  title={"Новый пароль"}
								  type='password'
								  field={"password"}
								  editable={true}
								  value={this.state.form.password}
								  onChange={this.onPassword}
								/>

								<div className='row'>
								  <div className='col-md-7 offset-md-3 mt-5 text-center'>
									<input
									  type='submit'
									  className='btn btn-secondary my-3'
									  value={__("Сохранить")}
									/> 
								  </div>
								</div>
							  </form>
							</div>
						</div>
					</div>
					<div className="tutor-right-aside">
						{ initArea( "user-favorites-right-aside", 
								{ ...this.props }
							) 
						} 
					</div>
				</div>
            );
          }}
        </Mutation>
		<Dialog
			isOpen={this.state.isOpen}
			onClose={this.handleToggle}
			title={__("Attention")}	
		>
			<div className="px-5 pb-5">
				{__("Instructions have been sent to your old email address for changing the «email address» field. Changes will take effect only after the verification procedure is completed.")}
			</div>
		</Dialog>
      </Fragment>
    );
  }
	handleToggle = () =>
	{
		this.setState({ isOpen: !this.state.isOpen });
	}
	onFirstName = e => 
	{
		this.onField(e, "first_name");
		console.log(e);
	};
	SecondName = e => 
	{
		this.onField(e, "last_name");
	};
	onEmail = e => 
	{
		this.onField(e, "user_email");
	};
	onPhone = e => 
	{
		this.onField(e, "phone");
	};
	onPassword = e => 
	{
		this.onField(e, "password");
	};

	onField = (e, name) => 
	{
		this.state.form[name] = e;
		this.setState({ form : {...this.state.form} });
	};
	onChange = m_change => {
		let form = {...this.state.form};
		delete form.current_course;
		delete form.payments;
		delete form.display_name;
		delete form.id;
		delete form.__typename;
		delete form.roles;
		//delete form.user_email;
		m_change({
		variables: {
			/*
			input: {
				user_email: this.state.form.user_login,
				display_name: this.state.form.display_name + " " + this.state.form.second_name,
				password: this.state.form.password,
			}
			*/
			input: form
		},
		update: (store, { data: { changeCurrentUser } }) => 
		{
			switch(changeCurrentUser)
			{
				case 2:
					this.setState({ isOpen: true });
					break;
				case 1:
				default:
					AppToaster.show({
						intent: Intent.SUCCESS,
						icon: "tick",
						message: __("Profile was updated")
					});
					break;
				
			}
		}
    });
  };
  getRoute = () => {
    return "profile";
  };
}
export default compose(withApollo, withRouter)(MProfileState);
