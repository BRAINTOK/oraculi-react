import React, {Component, Fragment} from "react";
import $ from "jquery";
import {__} from "../../layouts/utilities/i18n";

class ProgressSlider extends Component
{
	constructor(props)
	{
		super(props)
		this.state= {
			progress : this.props.progress
		}
	}
	componentWillUpdate(nextProps)
	{
		if(nextProps.progress !==  this.state.progress)
		{ 
			this.setState({ progress:nextProps.progress });
		}
	}
	render()
	{
		const pw = $(".progress-container").width() || 0;
		const width = (this.state.progress < this.props.full ?  this.state.progress / this.props.full * 100 : 100);
		return <div className="progress-container mb-2">
			<div className="progress-slider" style={{width:width + "%"}}/ >
			<div 
				style={{ left : pw * this.state.progress / this.props.full - 10 }} 
				className="progress-slider-label"
			>
				{ this.props.progress < this.props.full ? this.props.progress : __("Finish") }
			</div>
		</div>
	}
}
export default ProgressSlider;