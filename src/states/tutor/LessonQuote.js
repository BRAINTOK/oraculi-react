import React, {Component, Fragment} from "react";
import { __ } from "../../layouts/utilities/i18n";
import getWidget, { initArea } from "../../layouts/utilities/getWidget";
import { NavLink } from 'react-router-dom'; 

class LessonQuote extends Component
{
	render()
	{
		const cotent = this.props.post_content
			.split(" ")
				.slice(0, 14)
					.join(" ")
						.replace(/(<\S([^>]+)>)/ig,"")
						+ "..."; 
		const thumb = <div className="lesson-quote-thumb" style={{backgroundImage:"url(" + this.props.thumbnail + ")" }} />;
		
		const classes = this.props.bio_class.map((e, i) => 
		{
			return <div className="tutor-label" key={i}>
				{e.post_title + " " + __("class") }
			</div>
		});
		const themes = this.props.bio_biology_theme.map((e, i) => 
		{
			return <div className="tutor-label" key={i}>
				{e.post_title}
			</div>
		});
		const courses = this.props.bio_course.map((e, i) => 
		{
			return <div className="tutor-label" key={i}>
				{e.post_title}
			</div>
		});
		
		return <div className="lesson-quote-cont">		
			{ initArea( "lesson-quote-header", { ...this.props  } ) }
			<NavLink className="lesson-quote-first" to={"/article/" + this.props.id}>
				{thumb}
			</NavLink>
			<div className="lesson-quote-second">
				{ initArea( "lesson-quote-before-title", { ...this.props  } ) }
				<NavLink className="lesson-qoute-title" to={"/article/" + this.props.id}>
					{__(this.props.post_title)}
				</NavLink>
				<div 
					className="lesson-quote-content"
					dangerouslySetInnerHTML={{ __html: cotent }}
				/>
				<div className="">
					<NavLink className="" to={"/article/" + this.props.id}>
						{__("More")}
					</NavLink>
				</div>
				<div className="d-flex flex-wrap">
					<div className="lesson-qoute-classes">
						{classes}
					</div>
					<div className="lesson-qoute-themes">
						{themes}
					</div>
					<div className="lesson-qoute-courses">
						{courses}
					</div>
				</div>
				<div className="lesson-quote-footer" >				
					{ initArea( "lesson-quote-footer", { ...this.props  } ) }
				</div>
			</div>
		</div>
	}
	
}

export default LessonQuote;