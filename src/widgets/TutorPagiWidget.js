import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n"; 

class TutorPagiWidget extends Component
{
	render()
	{
		const {all, count, current, full_count} = this.props;
		let max = current * count + count;
		max = max < full_count ? max-1 : full_count;
		const min = current * count;
		return count && full_count
			?
			<div className="tutor-pagi-widget">
				{ 
					__("from") + " " + min + " " +__("to") + " " + max + " " + __("in")  + " " + full_count }
			</div>
			: 
			null
	}
}
export default TutorPagiWidget;