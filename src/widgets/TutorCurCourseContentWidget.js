import React, {Component, Fragment} from "react";

class TutorCurContentWidget extends Component
{ 
	render()
	{
		return this.props.post_content
			?
			<div className=""
				dangerouslySetInnerHTML={{ __html: this.props.post_content }}
			/>
			:
			null
	}
}
export default TutorCurContentWidget;