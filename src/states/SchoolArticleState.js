import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import { NavLink, Link } from 'react-router-dom';
import BasicState from "../layouts/BasicState";
import LessonDescription from "./Course/LessonDescription";
import Gallery from "./Course/Gallery";
import ContactForm from "./ContactForm";
import courses from "../config/data/courses.json";
import {  
	Tab, Tabs, 
	Icon, 
	Intent, 
	InputGroup,
	Card, 
	Elevation, 
	Button, 
	ButtonGroup, 
	TextArea, 
	Tooltip,
	Position,
	PopoverInteractionKind, 
	Popover,
	MenuItem, FormGroup
} from "@blueprintjs/core";

class CategoryState extends BasicState
{
	
	constructor(props)
	{
		super(props);
		this.state = {
			navbarTabId : "course" + courses[0]._id
		};
	}
	render()
	{
		const tabs = courses.map((e,i) =>
		{
			const lessons = e.lessons.map((ee, ii) =>
			{
				return <LessonDescription key={ii} {...ee} />
			})
			return <Tab
				key={i}
				id={ "course" + e._id }
				title={e.title}
				panel={<div className="py-5 " >
					<div className="two-collumns mb-5 container">
						<div className="index_h1">
							{e.under_title}
						</div>
						<div className="description_block">
							{e.under_content}
						</div>
					</div>
					<div className="d-flex justify-content-center container">
						<NavLink className="btn-faq" to="/pay">
							{__("Купить")}
						</NavLink>
					</div>
					<div className="container">
						<div className="row my-5 ">
							<div className="col-12">
								<h2 className="text-center">
									{__("Выберите с чего начать")}
								</h2>
								<div className="index_text_1 text-center">
									<p>
										{__("или просто идите по попрядку")}
									</p>
								</div>
								{lessons}
							</div>
						</div>
					</div>
					<div className="container">
						<div className="row my-5">
							<div className="col-12">
								<h2 className="text-center">
									{__("А после этого будете уметь вот так")}
								</h2>
								<div className="index_text_1 text-center">
									<p>
										{__("Работы учеников которые прошли обучение с нами")}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="container-fluid">
						<Gallery {...e}/>
					</div>
					<div className="d-flex justify-content-center container my-5">
						<NavLink className="btn-faq" to="/pay">
							{__("Купить")}
						</NavLink>
					</div>
					<div className="container">
						<ContactForm 
							formClass="mb-5" 
							title={__("Остались вопросы?")}
						/>
					</div>
				</div>} 
			/>
		});
		return <div className="layout-state  bg-white"> 
				<div className="row">
					<div className="col-12 d-flex justify-content-center">
						<Tabs 
							id="TabsExample" 
							onChange={this.onTabs} 
							selectedTabId={this.state.navbarTabId}
							animate={true}
							vartical={false}
						>
							{tabs}
						</Tabs>
					</div>
				</div> 
		</div>
	}
	onTabs = navbarTabId =>
	{
		this.setState({ navbarTabId });
	}
	onPay = () =>
	{
		
	}
}

export default CategoryState;