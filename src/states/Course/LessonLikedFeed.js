import React, {Component} from "react";
import $ from "jquery";
import {__} from "../../layouts/utilities/i18n";

class LessonLikedFeed extends Component
{
	constructor(props)
	{
		super(props);
		this.minH = 83;
		this.state = {
			collapsed1:false,
			maxHeight:this.minH,
			showRoll:true
		}
	}
	render()
	{
		const {lesson, comments} = this.props;
		const collpse = this.state.showRoll
			?
			<div className="w-100 ml-3 mb-3">
				<span 
					className={ "title-collapsed showed pointer" }
					onClick={this.onCollapseToggle}
				>
					{__(this.state.collapsed1 ? "Cкрыть" : "Читать полностью")}
				</span>	
			</div>
			:
			null;
		const thumbnail = lesson.thumbnail ? lesson.thumbnail : "/assets/img/default.png";
		return <div className="card flex-row"  lesson_id={lesson._id} course_id={lesson.course_id}>
			
				<div 
					className="img_cover img_cover_category h150" 
					style={{ backgroundImage: "url(" + thumbnail + ")", minWidth:200 }}
				>
				
				</div>
				<div className="p-4">
					<div 
						className="cont-content mb-3"
						style={{maxHeight:this.state.maxHeight}}
					>
						<div 
							className="content" 
							dangerouslySetInnerHTML={{ __html :  lesson.content}}  
						/>
					</div>
					{collpse}
				</div>
		</div>
	}
	onCollapseToggle = () =>
	{
		let mH  = this.state.maxHeight == this.minH ? $("[lesson_id="+ this.props.lesson._id + "] .content").innerHeight() : this.minH 
		this.setState({
			collapsed1: !this.state.collapsed1, 
			maxHeight: mH
		});
	}
}
export default LessonLikedFeed;