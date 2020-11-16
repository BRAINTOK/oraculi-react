import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import BasicState from "../../layouts/BasicState";
import { NavLink, Link,  } from 'react-router-dom';
import { Route, Switch, Redirect, withRouter } from "react-router";
import CourseTypeSelector from "../../widgets/CourseTypeSelector";
import CourseFilesWidget from "../../widgets/CourseFilesWidget";
import Tabs from "../../layouts/utilities/Tabs";
import Lesson from "./Lesson";
import LessonLikedFeed from "./LessonLikedFeed";

class CourseTab extends Component
{

	render()
	{
		const { id } = this.props;

		return <Tabs						
			route={"/"}
			current={"tf"}
			tabs={[
				{ 
					title:__("Новые записи"), 
					id: "courses",
					to:"courses",
					content : this.posts() 
				},
				{
					title:__("Последние выбранные"),
					id: "lasts",
					to:"lasts",
					content : this.lasts()
				},
				{ 
					title:__("Сообщения"), 
					id: "messages",
					to:"messages",
					content: this.messages() 
				},
				{
					title:__("Любимые"),
					id: "favorites",
					to:"favorites",
					content: this.likes()
				}
			]}
		/>;
	}
	posts()
	{
		const course = this.props;
		const _lessons = course.lessons.map((e,i) =>
		{
			return <Lesson key={i} lesson={e} />
		});
		

		return <div className="container">
				<div className="row">
					<div className="col-lg-3">
						<CourseTypeSelector course={course}/>
					</div>
					<div className="col-lg-6">
						{_lessons}
					</div>
					<div className="col-lg-3">
						<CourseFilesWidget course={course}/>
					</div>
				</div>
			</div>
	}
	lasts()
	{
		const course = this.props;
		const _lessons = course.lessons.map((e,i) =>
		{
			return <Lesson key={i} lesson={e} />
		});


		return <div className="container">
			<div className="row">
				<div className="col-lg-3">
					<CourseTypeSelector course={course}/>
				</div>
				<div className="col-lg-6">
					{_lessons}
				</div>
				<div className="col-lg-3">
					<CourseFilesWidget course={course}/>
				</div>
			</div>
		</div>
	}
	likes()
	{
		const course = this.props;
		const _last = course.last.map((e,i) =>
		{
			return <LessonLikedFeed key={i} lesson={e} />
		});
		return <div className="container">
			<div className="row">
				<div className="col-lg-3">
					<CourseTypeSelector course={course}/>
				</div>
				<div className="col-lg-6">
					{_last}
				</div>
				<div className="col-lg-3">
					<CourseFilesWidget course={course}/>
				</div>
			</div>
		</div>
	}
	messages()
	{
		
		const course = this.props;
		const {courses} = course;
		let routes = [];
		let my_messages = [];
		console.log(course);
		const _courses = courses.map((e,i) =>
		{
			e.messages.forEach((eee, iii) =>
			{
				my_messages.push(
					<div className="message-label" key={ i  + "" + iii }>
						<div className="message-label-ava-cont">							
							<div className="message-label-ava">
							
							</div>
						</div>
						<div className="message-label-title">								
							<div className="message-label-name"> 
								{eee.author.display_name}
							</div>								
							<div className="message-label-content"> 
								{eee.message}	
							</div>								
							<div className="message-label-menu"> 
								<span className="p-1 pointer">
									{__("Удалить")}
								</span>
								<span className="p-1 pointer">
									{__("Скачать файл")}
								</span>
							</div>
						</div>
						<div className="message-label-date">
							{eee.date}	
						</div>
						
					</div>
				);
			})
			routes.push(
				<Route
					exact
					path = { "/course/" + course.id +"/message/" + e._id }
					key={i}
					render={routeProps => (
						<div className="card" >
						<ul className="list-group list-group-flush">
							<li className="list-group-item p-0 d-flex justify-content-between " >
								<NavLink
									to={ "/course/" + course.id +"/message/" }
									className="px-4 py-3 no-a font-weight-bold"
								>
									{__("Назад")}
								</NavLink>
								<span className="px-4 py-3 font-weight-bold">
									{e.title}
								</span>
							</li>
							<li className="list-group-item p-0" >
								<div className="">
									{my_messages}
								</div>
							</li>
						</ul>
					</div>
					)}
					key={i }
				/>
			);
			return <li className="list-group-item p-0" key={i}>	
				<NavLink
					to={"/course/" + course.id +"/message/" + e._id}
					className="w-100 p-3 d-flex justify-content-between no-a"
				>
					<div>
						{e.title}
					</div>
					<div className="text-danger small">
						<span className="mr-2">
							{__("непрочитанных сообщений")}
						</span>
						<span className="mess-count">
							{14}
						</span>
					</div>
				</NavLink>
			</li>
		});
		routes.push(
			<Route
				exact
				path = { "/course/" + course.id +"/message/"  }
				key={ courses.length }
				render={routeProps => (
					<div className="card" >
						<ul className="list-group list-group-flush">
							{_courses}
						</ul>
					</div>
				)}
			/>
		);

		return <div className="container mt-3">
				<div className="row">
					<div className="col-lg-3">
						<CourseTypeSelector course={course}/>
					</div>
					<div className="col-lg-6">
						<Switch>
							{routes}
						</Switch>						
					</div>
					<div className="col-lg-3">
						<CourseFilesWidget course={course}/>
					</div>
				</div>
			</div>
	}
}
export default CourseTab;