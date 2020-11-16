import React, {Component, Fragment} from "react";
import _fetch from "./"; 
import {compose} from "recompose";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n"; 
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing"; 
import $ from "jquery";
import Loading from "../../layouts/utilities/Loading";
import WPFestSettings from "./utilities/WPFestSettings";
import TextArea from "./utilities/TextArea";
import { Intent } from "@blueprintjs/core";
import { AppToaster } from "../../layouts/utilities/blueUtils";

class ExpertDescriptions extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			text: "",
			denabled: this.props.denabled
		}
	}	
	render() 
	{ 	
		const{ data, member_id } = this.props;
		const{ denabled } = this.state;
		const is_expert = this.props.user.roles.filter(e => e == "Expert").length > 0
		const articleElements = data && data.length ? 
			data.map((article, index) =>
			{
				const classes = index===0 ? ['col-md-12','critery_cell3','light-colored '] : ['col-md-12','critery_cell3','grey2'];
				return !article.txt || article.txt===" " ? "" : (
					<div className={classes.join(" ")} key={"exp_descr_" + member_id + "_" + index}>
					<blockquote>
						<div className="lead">
							{article.txt}
						</div>
						<div className="mt-4">
							{article.auth}
						</div>
					</blockquote>
				</div>
				)
			}) 
			: 
			<div className={['col-md-12','critery_cell3','grey2','first_row'].join(" ")} >
				{__("No descriptions")}
			</div>;
		
		const _textarea = denabled === 0 ? 
			<Fragment>
				<TextArea
					className="col-md-6 col-sm-12" 
					rows="10" 
					placeholder={__("Start write")}
					style={{ marginBottom:10, padding:20 }}
					value={ this.state.text }
					onChange={ this.getComment }
				/>
				<div className="col-md-6 col-sm-12" >
					<div className='btn btn-lg btn-primary' onClick={this.send}>
						{__("Send descriptions")}
					</div> 
					<div className="mt-4">
						<small>
							Вы можете оставить текстовые комментарии и рекомендации для проектной команды.
							<p>Участникам Фестиваля важно получить обратную связь по вопросам:</p>
							<ul>
								<li>Какие задачи для развития замысла могут быть рекомендованы?</li>
								<li>Какие задачи развития Вы рекомендуете для самих авторов – чему важно дальше учиться?</li>
							</ul>
						</small>
					</div>
				</div>
			</Fragment> 
			: 
			<div className="">
				{__("You are already send description")}
			</div>;
		
		/**/
		const form = is_expert
			? 
			<section>
				<div className='row pt-4 pl-3 bl-20'> 
					<div className='col-md-12'>
						<div className='lead'>
							{__("Your parting words for the authors of Project")}
						</div>
					</div>
				</div>				
				<div className='row pt-4 pl-3 bl-20'>
					{_textarea}
				</div>
			</section> 
			: 
			null;
		
		return <Fragment>
			<section>
				<div className='row mt-4'> 
					<div className='col-md-7'>
						<div className='display-5'>
							{__("Expert's descriptions")}
						</div>
					</div>
					<div className='col-md-5'>
					
					</div>
				</div>				
				<div className='row mt-3 bl-20'>
					<div className='col-md-12'>
						<div className='w-100   '>
							{articleElements}
						</div>			
					</div>			
				</div>			
			</section>
			{ form }
		</Fragment>;
		
	}
	changeComment = evt => {
		var val = evt.currentTarget.value;
		this.getComment(val);
	}
	getComment = (text) =>
	{
		console.log(text);
		this.setState({
			text: text
		})
	}
	send = text => 
	{
		if(this.state.text=="")
		{
			AppToaster.show({  
				intent: Intent.SUCCESS,
				icon: "tick", 
				message: "You must insert text" 
			}); 
			return;
		}
		/*
		Foo.app.fetch(
			"send_member_descr", 
			{
				text 		: this.state.text, 
				member_id 	: this.props.member_id
			}
		);
		*/
		_fetch( 
			"send_member_descr", 
			{
				text 		: this.state.text, 
				member_id 	: this.props.member_id
			},
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
				.then(data => 
				{
					console.log( data );
					
					this.setState({
						denabled:false
					});
					/**/
				});
	}
}
export default ExpertDescriptions;