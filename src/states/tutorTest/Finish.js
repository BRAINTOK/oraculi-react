import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import TestResults from "./TestResults";
import Moment from 'react-moment';

class Finish extends Component
{
	constructor(props)
	{
		super(props);
		this.state = { start:true, full_results:this.props.full_results } 
	} 
	componentWillUpdate(nextProps)
	{
		if(nextProps.full_results != this.state.full_results)
		{
			console.log(nextProps);
			this.setState({full_results : this.state.full_results});
		}
	}
	render()
	{ 
		console.log(this.props.full_results);
		console.log(new Date( this.props.full_results.start_time * 1000 ));
		console.log(new Date( this.props.full_results.end_time * 1000 ));
		const try_count = this.props.try_count > 1
			?
			<div >
				<div >
					{ __("Available ") + this.props.try_count + __(" attempts") }
				</div>
				<div
					className="btn btn-primary btn-sm mt-4"
					onClick={this.onRestart}
				>
					{ __("Try again")}
				</div>
			</div>			
			:
			__("You not try this test again");
		
		const className = this.state.start ? " animated animation-swipe-right " : " hidden";
		
		return <div className={ "test-cover " + className } >
			<div className="test-question-title">
				<span className="thin small mr-2">
					{ __( "Finished: " ) }
				</span>
				<span dangerouslySetInnerHTML={{ __html: this.props.post_title}}/>
			</div>
			<div className="test-result-data row w-100">
				<div className="test-descr-title col-md-6">
					{__("Start Time")}:
				</div>
				<div className="test-descr-cont col-md-6">
					<Moment locale="ru" format="D.MM.YYYY h:mm:ss a">
						{new Date( this.props.full_results.start_time * 1000 )}
					</Moment>
				</div>
			</div>
			<div className="test-result-data row w-100">
				<div className="test-descr-title col-md-6">
					{__("End Time")}:
				</div>
				<div className="test-descr-cont col-md-6">
					<Moment locale="ru" format="D.MM.YYYY h:mm:ss a">
						{new Date( this.props.full_results.end_time * 1000  )}
					</Moment>
				</div>
			</div>
			<div className="test-question-answers-results">
				<TestResults
					results={ this.state.full_results }
					test_id={ this.props.id }
					questions={this.props.questions}
				/>
			</div>
			<div className="test-question-answers-cont"> 
				{try_count}
			</div>
		
		</div>;
	}
	onRestart = ( ) =>
	{
		this.props.onRestart();
	}
}
export default Finish;