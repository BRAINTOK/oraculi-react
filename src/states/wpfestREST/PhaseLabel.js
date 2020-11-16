import React , {Component} from "react";
import {__} from "../../layouts/utilities/i18n";

export default class PhaseLabel extends Component
{
	static labels = [
		"The Festival has not yet begun",
		"The preparation of the Projects",
		"The Festival began. Experts evaluate the Projects",
		"The Festival in archive"
	];
	render()
	{
		return <div className="role_descr mr-auto">
			{ __(PhaseLabel.labels[ this.props.phase || 0 ]) }
		</div>
	}
}
