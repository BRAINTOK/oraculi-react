import React, {Component} from "react";

export default class Loading extends Component
{
	render()
	{
		return <div className="loader-cont">
			<div className="loader fa-spin" />
		</div>
		return <div className="loader-cont">
			<i className="fas fa-circle-notch fa-spin loader" />
		</div>
		//return "Loading";<i class="fas fa-circle-notch"></i>
	}
}