import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import {Card, Intent, Button, Icon} from "@blueprintjs/core";

class Cover extends Component
{
	constructor(props)
	{
		super(props);
		this.state = { }
	}
	render()
	{
		const duration = this.props.duration
			?
			this.props.duration + " " + __("sec.")
			:
			"No limit";
		const try_count = !this.props.try_count || this.props.try_count == 0 ?
			__("only ones")
			:
			this.props.try_count + __(" counts");
		return <div className="test-cover">
			<div className="test-title"  dangerouslySetInnerHTML={{ __html: this.props.post_title }} />
			<div className="test-descr">
				<div className="row my-3">
					<div className="test-descr-title col-md-6">
						{ __("Time limit") }
					</div>
					<div className="test-descr-cont col-md-6">
						{ duration }
					</div>
					<div className="test-descr-title col-md-6">
						{ __("Questions count") }
					</div>
					<div className="test-descr-cont col-md-6">
						{ this.props.questions.length }
					</div>
					<div className="test-descr-title col-md-6">
						{ __("Show right answer after choose") }
					</div>
					<div className="test-descr-cont col-md-6">
						<Icon 
							icon={ this.props.is_show_answer ? "tick" : "cross" }
							intent={this.props.is_show_answer ? Intent.SUCCESS : Intent.DANGER } />
					</div>
					<div className="test-descr-title col-md-6">
						{ __("Show result after test") }
					</div>
					<div className="test-descr-cont col-md-6">
						<Icon 
							icon={ this.props.is_show_results ? "tick" : "cross" } 
							intent={this.props.is_show_results ? Intent.SUCCESS : Intent.DANGER }
						/>
					</div>
					<div className="test-descr-title col-md-6">
						{ __("Try count") }
					</div>
					<div className="test-descr-cont col-md-6">
						{ try_count }
					</div>
				</div>
			</div>
			<div className="test-content" dangerouslySetInnerHTML={{ __html: this.props.post_content }} /> 
			<div className="">
				<Button onClick={this.props.step}>
					{__("Start Test")}
				</Button>
			</div>
		</div>;
	}
}
export default Cover;