import React, {Component, Fragment} from "react";
import { __ } from "../../layouts/utilities/i18n";
import { NavLink } from 'react-router-dom'; 
import Moment from 'react-moment';
import getWidget, { initArea } from "../../layouts/utilities/getWidget";

class LessonQuote extends Component
{
	render()
	{
		const cotent = this.props.post_content
			.split(" ")
				.slice(0, 14)
					.join(" ")
						+ "...";
		const thumb = <div className="lesson-quote-thumb" style={{backgroundImage:"url(" + this.props.thumbnail + ")" }} />;
		const themes = this.props.bio_biology_theme 
			?
			this.props.bio_biology_theme.map((e, i) => 
			{
				return <div className="tutor-label" key={i}>
					{e.post_title}
				</div>
			})
			: 
			null;
		const courses = this.props.bio_course 
			?
			this.props.bio_course.map((e, i) => 
			{
				return <div className="tutor-label-course" key={i}>
					{e.post_title}
				</div>
			})
			: 
			null;
		
		const classes = this.props.bio_class 
			?
			this.props.bio_class.map((e, i) => 
			{
				return <div className="tutor-label-class" key={i}>
					{ e.post_title + " " + __("class") }
				</div>
			})
			: 
			null;
		
		const bio_olimpiad_type = this.props.bio_olimpiad_type 
			?
			this.props.bio_olimpiad_type.map((e, i) => 
			{
				return <div className="tutor-label-olympiad_type" key={i}>
					{ e.post_title }
				</div>
			})
			: 
			null;
		let invite;
		switch(this.props.member_status)
		{
			case 2:
				invite = <div>
					<div className="alert alert-warning request-event">
						<div>
							{__("you are invited")}
						</div>
					</div>
				</div>
				break;
			case 1:
				invite = <div>
					<div className="alert alert-warning request-event">
						<div>
							{__("your request is being processed")}
						</div>
					</div>
				</div>
				break;
			case 0:
			default:
				invite = <div>...</div>
		}
		const archived = this.props.time * 1000 < Date.now()
			?
			<div className="diagonal1">
				{__("Event archived")}
			</div>
			:
			null;
		return <div className="lesson-quote-cont">
			{ initArea( "event-quote-header", { ...this.props  } ) }
			<NavLink className="lesson-quote-first " to={"/event/" + this.props.id}>
				{thumb}
					{archived}
			</NavLink>
			<div className="lesson-quote-second">
				{ initArea( "event-quote-before-title", { ...this.props  } ) }
				<NavLink className="lesson-qoute-title" to={"/event/" + this.props.id}>
					{__(this.props.post_title)}
				</NavLink>
				<div className="">
					<Moment locale="ru" format="D MMMM YYYY">
						{ new Date(this.props.time * 1000) }
					</Moment>
					
				</div>
				<div 
					className="lesson-quote-content"
					dangerouslySetInnerHTML={{ __html: cotent }}
				/>
				<div className="">
					<NavLink className="" to={"/event/" + this.props.id}>
						{__("More")}
					</NavLink>
				</div>
				<div className="lesson-qoute-themes">
					{themes}
				</div>
				<div className="lesson-qoute-classes">
					{classes}
				</div>
				<div className="lesson-qoute-courses">
					{courses}
				</div>
				<div className="lesson-qoute-olimpiad_type">
					{bio_olimpiad_type}
				</div>
				<div className="lesson-quote-footer" >	
					{invite}
					{ initArea( "event-quote-footer", { ...this.props  } ) }
				</div>
			</div>
		</div>
	}
	
}

export default LessonQuote;