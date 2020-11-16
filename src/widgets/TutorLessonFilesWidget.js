import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import {getQueryArgs, getQueryName, queryCollection, querySingle} from "../layouts/schema";
import {Query, withApollo} from "react-apollo";
import tags from "../config/data/tags.json"
import Loading from "../layouts/utilities/Loading";
import {compose} from "recompose";
import {withRouter} from "react-router";

class TutorLessonFilesWidget extends Component
{
	render()
	{
		const dnld = [1,2,3,4].map((e, i) =>
		{
			if( this.props['include_id' + e]  === "false" )
			{
				return null;
			}
			else
			{
				return <a className="btn btn-secondary btn-lg m-1" href={ this.props['include_id' + e] } download key={i}>
					<i className="far fa-file-archive"></i> 
				</a>
			}
		})
		return  <div className="course_category_select" >
			<div className="aside-widget-title">
				{__("Matherials for Lesson:")}
			</div>
			{dnld}
		</div>
	}
}

export default TutorLessonFilesWidget;