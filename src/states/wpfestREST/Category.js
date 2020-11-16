import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie} from "./utilities/utils";
import _fetch from "./";
import User from "./utilities/User";
import CriteryList from "./CriteryList";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";


class Category extends Component
{
	state = {
		isCollapse:this.props.user.roles.filter(e => e == "Expert").length > 0,
		rating : this.props.rating,
		d : this.props.d,
		criteries : this.props.criteries
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		let res = nextProps.rating !== this.state.rating;
		res = res || nextProps.criteries !== this.state.criteries;
		res = res || nextProps.d !== this.state.d;
		res = res || nextState.isCollapse !== this.state.isCollapse;
		return res;
	}
	componentWillUpdate(nextProps, nextState)
	{
		this.setState({
			rating		: nextProps.rating, 
			d			: nextProps.d, 
			criteries	: nextProps.criteries,
		})
	}
	render()
	{   
		const { onItemClick, member_id, max_raiting, color, id, name } = this.props;
		const { rating, criteries, d } = this.state;
		const descrs = this.state.d.map((e, i) =>
		{
			return <div className="critery_cell3" key={i}>
			<blockquote>
				<div className="lead">
					{ e.txt }
				</div>
				<div className="mt-3">
					{ e.auth }
				</div>
				</blockquote>
			</div>
		})
		const descr_title = this.state.d.length > 0
			?
			<div className="p-3 lead title">
				{__("Experts's descriptions")}:
			</div>
			:
			null;
		const style = {backgroundColor: this.props.color, color:"#f8f9fa"}; 
		const style2 = {borderLeftColor:this.props.color}; 
		const is_expert = this.props.user.roles.filter(e => e == "Expert").length > 0
		return <Fragment>
			<div className='col-md-7 col-sm-12 critery_cell first' style={style}>
				<div className="fmRuTitle">
					<span className="small pr-2">
						{__("Category")} 
					</span> 
					<span className="font-weight-bold">
						{ name}
					</span>
				</div>
			</div>
			<div className='col-md-5  col-sm-12 critery_cell d-flex' style={style}>
				<h4 className="my-auto"> { rating } </h4> 
				<div 
					className={"fmRU_button ml-auto" + ( this.state.isCollapse ? " open" : "" )} 
					onClick={this.onCollapseToggle} 
				>
					<i className="fa fa-caret-right" style={{color:"#f8f9fa"}}></i>
				</div>
			</div>
			<div className='col-md-12'>
				<Collapse className="row " isOpen={this.state.isCollapse}>
					<CriteryList 
						criteries={criteries}
						color={this.props.color}
						max_raiting={ this.props.max_raiting}
						user={this.props.user}
						member_id={this.props.member_id}
					/>
				</Collapse>
			</div>
			<div className='col-md-12 grey p-0 bl-20' style={style2} >
				{descr_title}
				<div className="critery-all-descr">
					{ descrs }
				</div>
			</div>
		</Fragment>
	}		
	onCollapseToggle = () =>
	{
		this.setState({isCollapse : !this.state.isCollapse});
	}		
}
export default Category;