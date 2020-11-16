import React, {Component,Fragment} from "react";
import {compose} from "recompose";
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';
import LayoutIcon from "../../layouts/LayoutIcon";
import {__} from "../../layouts/utilities/i18n";
import {setCookie, getCookie} from "./utilities/utils";
import _fetch from "./";
import WPFestSettings from "./utilities/WPFestSettings";
import User from "./utilities/User";
import Critery from "./Critery";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import TextArea from "./utilities/TextArea";


class CriteryUniqList extends Component
{
	constructor(props)
	{
		super(props);
		console.log(props);
		this.state = {
			uniqs: this.props.uniqs,
			text:"",
			chooseNewCrit:-1
		}
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		let res = nextProps.uniqs !== this.state.uniqs;
		return res;
	}
	componentWillUpdate(nextProps, nextState)
	{
		this.setState({ 
			uniqs	: nextProps.uniqs,
		})
	}
	render()
	{  
		const uniqs = this.state.uniqs.map((e, i) =>
		{
			return <Critery 
				{...e} 
				key={i}  
				max_raiting={ this.props.max_raiting} 
				user={this.props.user} 
				member_id={this.props.member_id} 
			/>
		})
		
		const is_expert = this.props.user.roles.filter(e => e == "Expert").length > 0
		const choose_form = this.props.categories.map(elem => 
			<div className='w-100' key={ "newCrit" + elem.id }>
				<input 
					type='radio' 
					id={'choose_' + elem.id }
					data-id={elem.id}
					className='radio_full' 
					name='choose_cat'
					onChange={this.chooseNewCrit}
					checked={this.state.chooseNewCrit == elem.id }
				/> 
				<label htmlFor={'choose_' + elem.id } data-hint={ elem.name }>
					<div className='cat_color_label' style={{backgroundColor:elem.color}}></div>
				</label>				
			</div>
		)
		
		const insert = is_expert && this.state.uniqs.length < 3 
		? 
		<section>
			<div className="row"> 
				<div className='col-md-7'>
					<div className='lead bl-20 pl-4 py-3'>
						{__("Create new")}
					</div>	
				</div> 
				<div className='col-md-5'>	
					
				</div> 
			</div> 			
			<div className="row align-items-stretch">			
					<div className='col-md-4'>
						<div className=" bl-20 pl-4">
							<p>
								Не более трех критериев! Сейчас - { uniqs.length }
							</p>
							<ul>
								<li>В текстовое поле добавьте значимый для вас критерий, не учтенный в базовом списке.</li> 
								<li>Выберите категорию, к которой относится Ваш критерий</li>
								<li>Поздравляем! Теперь вы сможете оценить любую работу на этом Фестивале по созданному Вами критерию</li>
							</ul>
							
							<div className='btn btn-block btn-primary' onClick={this.create}>
								{__("Create")}
							</div>
						</div> 
					</div>
					<div className='col-md-4 d-flex flex-column '>
						<div className={ this.state.text === "" ? "mb-2 small" : "mb-2 opacity_none"}>
							{__("Put title of your critery")}
						</div>
						<TextArea 
							id='new_critery_text'
							rows='8'
							className='w-100 h-100'
							value={this.state.text}
							onChange={this.onTextarea} 
						/>	
					</div>
							
					<div className='col-md-4'>
						<div className={ this.state.chooseNewCrit === -1 ? "mb-2 small" : "mb-2 opacity_none"}>
							{__("Without fail choose parent category")}
						</div>
						{choose_form}
					</div>
					
			</div> 
		</section>
		:
		"";
		
		
		return <div className="row mt-4">
				<div className='col-md-12'>
					<div className='display-5 mb-2'>
						{__("Unique Criteries from Experts")}
					</div>
				</div>
				{ uniqs }
				{ insert }
			</div>
	}		
	
	chooseNewCrit = evt =>
	{
		this.setState({
			chooseNewCrit:evt.currentTarget.dataset.id
		});
	}
	
	create = evt =>
	{
		if(this.state.text === "")
		{
			AppToaster.show({  
				intent: Intent.SUCCESS,
				icon: "tick", 
				message: "You must choose Title" 
			});
			return;
		}
		if(this.state.chooseNewCrit === -1)
		{
			AppToaster.show({  
				intent: Intent.SUCCESS,
				icon: "tick", 
				message: "You must choose someone Category" 
			}); 
			return;
		}
		const dt = {
			text:	this.state.text,
			cr: 	this.state.chooseNewCrit,
			id:		this.props.member_id
		};
		/*
		Foo.app.fetch(
			"create_critery", 
			dt
		)
		*/
		_fetch( 
			"create_critery", 
			dt,
			WPFestSettings.url,
			WPFestSettings.token,
			"get_main"
		)
				.then(data => 
				{
					console.log( data );
					this.setState({
						aut_criteries: data.aut_criteries
					});
				});
		
	}
	onTextarea = evt =>
	{
		this.setState({
			text:evt.currentTarget.value
		});
	}	
}
export default CriteryUniqList;