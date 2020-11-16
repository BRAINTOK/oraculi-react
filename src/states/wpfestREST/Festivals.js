import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie} from "./utilities/utils";
import _fetch from "./";
import User from "./utilities/User";


class Festivals extends Component
{
	state = {
		offset:0,
		festivals:[],
		number: 10
	}
	componentDidMount()
	{
		this.onPagi(0);
	}
	render()
	{ 
		const {festivals, cont, offset, number} = this.state;
		const siteList = festivals.map(elem => <li className="list-group-item" key={elem.domain}>
			<div 
				className="row pointer tex-sm-left text-center"
				domain={elem.domain}
				blog_id={elem.blog_id}
				onClick={this.onSite} 
			>
				<div className="col-md-2 col-12">{elem.blog_id}</div>
				<div 
					className="col-md-5 col-12" 
				>
					{elem.domain}
				</div>
				<div className="col-md-5">
					{ elem.domain_type ? <span className="member_span">{elem.domain_type}</span> : null }
				</div>
			</div>
		</li>);
		return <div className="layout-center w-100">
			
			<div className="w-100">
				<ul className="list-group">
					{siteList}					
				</ul>
			</div>
		</div>
			
				
	}
	onPagi = offset =>
	{
		_fetch( "get_all_sites", {offset: offset, number:this.state.number} )
				.then(data => 
				{
					console.log(data);
					this.setState({festivals:data.sites || [], count:data.count, offset:data.offset, number:data.number  });
				});
	}
}
export default Festivals;