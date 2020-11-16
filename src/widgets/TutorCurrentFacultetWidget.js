import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import { NavLink, Link } from 'react-router-dom'; 

class TutorCurrentCourseWidget extends Component
{
	render()
	{
		if(!this.props.bio_facultet || this.props.bio_facultet.length == 0)
			return null;
		const courses = this.props.bio_facultet.map((e, i) =>
		{
			const cl =  "tutor-course-widget-cont";
			return <div className="tutor-course-widget-container" key={i}>
				<NavLink
					className={cl} 
					to={"/facultet/" + e.id}					
				>
					<div className="tutor-course-widget-logo" style={{ backgroundImage:"url(" + e.thumbnail + ")" }} />
					<div>
						<div className="tutor-course-widget-title">
							{e.post_title}
						</div>
					</div>
				</NavLink>
			</div>
		});
		return  <div className="course_category_select mb-5" >
			<div className="aside-widget-title">
				{__("Facultets")}
			</div>
			<div>
				{courses}
			</div>
		</div>
	}
}
export default TutorCurrentCourseWidget;