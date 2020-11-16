import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import {compose} from "recompose";
import {Mutation, withApollo} from "react-apollo";
import gql from 'graphql-tag';

class Fail extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {  
			start 	: false
		}
		this.timeout = -1;
	}
	componentDidMount()
	{
		this.timeout = setInterval(() =>
		{
			this.setState({ start : true });
		}, 40);
	}
	componentWillUnmount()
	{
		clearInterval(this.timeout);
	}
	render()
	{
		const className = this.state.start ? " animated animation-swipe-right " : " hidden";
		return <div className={ "test-cover " + className } >
			<div className="lead">
				{__("FAIL TEST. TIMEOUT")}
			</div>
		</div>
	}
}
export default compose(
	withApollo
)(Fail);