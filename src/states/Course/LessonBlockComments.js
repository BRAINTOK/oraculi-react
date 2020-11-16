import React, {Component, Fragment} from "react";
import lessons from "../../config/data/lessons.json";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import LessonComment from "./Comments/LessonComment";
import LessonMainComment from "./Comments/LessonMainComment";

class LessonBlockComments extends Component
{
	state = {
		is_answer:false,
		answeHeight:0,
		comment:""
	}
	render()
	{
		const  {lesson, comments} = this.props;
		// const _comments = comments
		// 	.filter(e => e.comment_id == 0)
		// 	.map((e, i) =>
		// 	{
		// 		return <LessonMainComment
		// 			key={i}
		// 			{...e}
		// 			lesson={lesson}
		// 			level={0}
		// 		/>
		// 	});

		const main_comment = comments.filter(e => e.comment_id == 0)[0];

		const _comments = <LessonMainComment
			key={0}
			{...main_comment}
			lesson={lesson}
			level={0}
		/>

		return <div className="px-3 pt-3 borded-top" >
			<div className="title pl-0">
				Комментарии
			</div>
			<div className="comment" id={"comment_0"}>
				<div className={"answer d-flex"} style={{ height : this.state.answeHeight }}>
				<textarea value={this.state.comment} onChange={this.onComment} rows="4">

				</textarea>
					<div className="ml-3 btn btn-primary">
						{__( "Ответить" )}
					</div>
				</div>
				<div className="ml-auto btn btn-primary" onClick={this.onAnswer}>
					{__(this.state.is_answer ? "Закрыть" : "Новый комментарий")}
				</div>
			</div>

			{_comments}
			<span
				className={ "title-collapsed showed pointer btn-link" }
			>
				Показать еще
			</span>
		</div>
	}
	onAnswer = () =>
	{
		this.setState({ 
			is_answer: !this.state.is_answer ,
			answeHeight: !this.state.is_answer ? $("#comment_0 .answer textarea").height() + 7  : 0
		});
	}
	onComment = evt =>
	{
		const value = evt.currentTarget.value;
		this.setState({ comment: value });
	}
}
export default LessonBlockComments;