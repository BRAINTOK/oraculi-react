import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {withRouter} from "react-router";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import ContactForm from "./ContactForm";

class SchoolMessages extends BasicState
{
	
	constructor(props)
	{
		super(props);
		this.state = {
		};
	}

	render()
	{
		return <div className="col-12">
				<ContactForm
					formClass="mb-5"
					title={__("Остались вопросы?")}
				/>
		</div>
	}
}

export default compose(
	withApollo,
	withRouter
)(SchoolMessages)