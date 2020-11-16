import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { NavLink } from 'react-router-dom'; 

class PostFeedCard extends Component
{
	render()
	{
		const cotent = this.props.post_content
			.split(" ")
				.slice(0, 14)
					.join(" ")
						.replace(/(<\S([^>]+)>)/ig,"")
							+ "...";
		const thumb = <div 
			className="lesson-quote-thumb-light" 
			style={{backgroundImage:"url(" + this.props.thumbnail + ")" }} 
		/>;
		return <div 
			className={ "lesson-quote-cont " + this.props.class_name } 
			style={ this.props.style }
		>		
			<NavLink className="lesson-quote-first" to={"/article/" + this.props.id}>
				{thumb}
			</NavLink>
			<div className="lesson-quote-second">				
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
				
				</div>
				<div className="lesson-quote-footer" >				
					
				</div>
			</div>
		</div>
	}
}
export default PostFeedCard;