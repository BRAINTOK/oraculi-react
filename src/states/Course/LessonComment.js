import React, {Component, Fragment} from "react";
import lessons from "../../config/data/lessons.json";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";

class LessonComment extends Component
{
	state = {
		is_answer:false,
		answeHeight:0,
		comment:""
	}
	render()
	{
		const {lesson, _id, comment_id, title, content, author, date, level} = this.props;
		const comments = lesson.comments
			.filter(e => e.comment_id == _id)
				.map((e, i) =>
				{
					return <LessonComment {...e} key={i} lesson={lesson} level={level+1} />
				});
		const ava = author.avatar ? author.avatar : "/assets/img/def_ava.jpg";
		return <div className="comment" id={"comment_"+_id}>
			<div className="d-flex">
				<div className="comment-ava" style={{backgroundImage:"url(" + ava + ")"}} />
				<div className="title pl-0">
					{title}
				</div>
				<div className="date ml-auto">
					{date}
				</div>
			</div>
			<div className="content">
				{content}
			</div>
			<div className={"answer d-flex"} style={{ height : this.state.answeHeight }}>
				<textarea value={this.state.comment} onChange={this.onComment} rows="4">
				
				</textarea>
				<div className="ml-3 btn btn-primary">
					{__( "Ответить" )}
				</div>
			</div>
			<div className="author" onClick={this.onAnswer}>
				{__(this.state.is_answer ? "Закрыть" : "Ответить")}
			</div>
			{comments}
		</div>
	}
	onAnswer = () =>
	{
		this.setState({ 
			is_answer: !this.state.is_answer ,
			answeHeight: !this.state.is_answer ? $("#comment_"+this.props._id + " .answer textarea").height() + 7  : 0
		});
	}
	onComment = evt =>
	{
		const value = evt.currentTarget.value;
		this.setState({ comment: value });
	}
}
export default LessonComment;