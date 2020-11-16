import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie} from "./utilities/utils";
import _fetch from "./";
import User from "./utilities/User";
import Critery from "./Critery";


class CriteryList extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			criteries: this.props.criteries
		}
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		let res = nextProps.criteries !== this.state.criteries;
		return res;
	}
	componentWillUpdate(nextProps, nextState)
	{
		this.setState({ 
			criteries	: nextProps.criteries,
		})
	}
	render()
	{  
		const criteries = this.state.criteries.map((e, i) =>
		{
			return <Critery 
				{...e} 
				key={i}  
				max_raiting={ this.props.max_raiting} 
				user={this.props.user}
				color={this.props.color}
				member_id={this.props.member_id} 
			/>
		})
		return <div className="row m-0">
				{ criteries }
			</div>
	}		
		
}
export default CriteryList;