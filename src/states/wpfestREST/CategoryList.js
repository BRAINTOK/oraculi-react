import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie} from "./utilities/utils";
import _fetch from "./";
import User from "./utilities/User";
import Category from "./Category";


class CategoryList extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			...this.props
		}
	}
	shouldComponentUpdate(nextProps, nextState)
	{
		let res = nextProps.r2 !== this.state.r2;
		res = res || nextProps.categories !== this.state.categories
		return res;
	}
	componentWillUpdate(nextProps, nextState)
	{
		this.setState({
			r2			: nextProps.r2, 
			categories	: nextProps.categories,
		})
	}
	
	render()
	{  
		const categories = this.state.categories.map((e, i) =>
		{
			return <Category 
				{...e} 
				key={i} 
				max_raiting={ this.state.max_raiting}
				user={this.props.user}
				member_id={this.props.member_id}
			/>
		})
		return <div className="row">  
			<div className='col-md-7'>
				<div className='display-5 mb-2'>
					{__("Basic Criteries")}
				</div>
			</div>
			<div className='col-md-5  d-flex align-items-end'>
				<span className="ml-3 lead mb-2">{__("Raiting") + ": "}</span>
				<span className="ml-3 display-5 font-weight-bold">{this.state.r2}</span>
			</div> 
			{ categories }
		</div>
	}		
		
}
export default CategoryList;