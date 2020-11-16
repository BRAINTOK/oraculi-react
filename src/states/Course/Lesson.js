import React, {Component, Fragment} from "react";
import $ from "jquery";
import {__} from "../../layouts/utilities/i18n";
import MediaChooser from "../../layouts/utilities/MediaChooser";
import {NavLink, Link} from "react-router-dom"
import lessons from "../../config/data/lessons.json";
import LessonComment from "./LessonComment";
import {compose} from "recompose";
import {withApollo} from "react-apollo";
import {withRouter} from "react-router";

class Lesson extends Component
{
	state = {
		collapsed1:false,
		newComment:false,
		maxHeight:88,
		nch:0,
		liked:this.props.lesson.liked
	}
	render()
	{
		const {lesson, comments} = this.props;
		const _comments = lesson.comments
			.filter(e => e.comment_id == 0)
				.map((e, i) =>
				{
					return <LessonComment
						key={i}
						{...e}
						lesson={lesson}
						level={0}
					/>
				});
		return <div className="lesson_card" lesson_id={lesson._id} course_id={lesson.course_id}>
			<div className="thumb" style={{backgroundImage:"url(" + lesson.thumbnail + ")"}}/>
			<div className="title">
				{lesson.title}
			</div>
			<div 
				className="cont-content"
				style={{maxHeight:this.state.maxHeight}}
			>
				<div 
					className="content" 
					dangerouslySetInnerHTML={{ __html :  lesson.content}}  
				/>
			</div>
			<div className="w-100 mt-5 ml-3">
				<span 
					className={ "title-collapsed showed pointer" }
					onClick={this.onCollapseToggle}
				>
					{__(this.state.collapsed1 ? "Cкрыть" : "Читать полностью")}
				</span>	
			</div>
			<div className="w-100 mt-5 ml-3 d-flex">
				<span >{lesson.date}</span>	
				<div className="ml-auto mr-3 btn btn-primary" onClick={this.onNewComment}>
					{__("Вопрос преподавателю")}
				</div>
				<div className={"like mr-4 " + (this.state.liked ? " liked" : "") } onClick={this.onLike} />
			</div>
			<div 
				className="new-comment" 
				style={{
					maxHeight:	this.state.nch
				}}
			>
				<div className="input-file">
					<MediaChooser id="" prefix="" url="" name=""/>
				</div>
				<textarea 
					rows="8"
					className="descr"
				>
				</textarea>
				<div className="btn btn-primary mr-2">
					{__("Отправить")}
				</div>
			</div>
			<div className="px-3 pt-3 borded-top ">
				{_comments}
			</div>
		</div>
	}
	onCollapseToggle = () =>
	{
		if(this.props.lesson.is_close){
			this.props.history.push( "/register" );
		}else if(this.props.lesson.is_pay){
			this.props.history.push( "/tarif/tarif" );
		}

		this.setState({
			collapsed1: !this.state.collapsed1, 
			maxHeight:this.state.maxHeight == 88 ? $("[lesson_id="+ this.props.lesson._id + "] .content").innerHeight() : 88 
		});
	}
	onLike = () =>
	{
		this.setState({liked : !this.state.liked});
	}
	onNewComment = () =>
	{
		this.setState({
			newComment : !this.state.newComment,
			nch : !this.state.newComment ? 210 : 0
		});
	}
}
export default compose(

	withRouter
)(Lesson)
