import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import Cover from "./Cover";
import TimerSlider from "./TimerSlider";
import ProgressSlider from "./ProgressSlider";
import Step from "./Step";
import Fail from "./Fail";
import Finish from "./Finish";
import {compose} from "recompose";
import {Mutation, withApollo} from "react-apollo";
import gql from 'graphql-tag';
import {Card, Intent, Button, Collapse} from "@blueprintjs/core";

class Test extends Component
{
	constructor(props)
	{
		super(props);
		console.log(this.props);
		this.state = {
			...props,
			progress	: 0,
			len			: this.props.questions.length,
			is_timed	: false,
			isTitleOpen	: false,
			start_time	: 0,
			end_time	: 0,
			results		: [],
			rights		: []
		}
	}
	componentWillUnmount()
	{
		
	}
	render()
	{
		return <div className="test-container">	
			<div className={"test-title-collapse" +( this.state.isTitleOpen ? " active" : "" )}> 
				<span className="ml-3 mr-3">{__("Test")}:</span>
				<span className=""  dangerouslySetInnerHTML={{ __html: this.state.post_title.replace(/<[^>]*>?/gm, '') }} /> 
			</div>
			<TimerSlider 
				is_timed={this.state.is_timed}
				full={this.state.duration}
				onFinish={this.onFinish}
				progress={this.state.progress}
			/>
			<ProgressSlider 
				progress={this.state.progress}
				full={ this.state.len }
			/>
			{ this.doProgress() }
		</div>
	}
	doProgress()
	{ 
		//console.log(this.state.progress, this.state.len);
		if(this.state.desission == "fail")
		{
			return <Fail />
		}
		if(this.state.progress == 0)
		{
			return <Cover 
				{...this.state}  
				step={this.onStart}
			/>
		}
		else if( this.state.progress == this.state.len )
		{
			//console.log(this.state);
			return !this.state.full_results
				?
				<Loading />
				:
				<Finish 
					id={ this.state.id }
					try_count={this.state.try_count}
					post_title={this.state.post_title}
					questions={this.state.questions}
					onRestart={this.onRestart}
					full_results={this.state.full_results} 
				/> 
		}
		else 
		{
			return <Step 
				{...this.state.questions[ this.state.progress - 1 ]} 
				step={ this.step }
				progress={this.state.progress}
				i={ this.state.progress - 1 }
				rights={this.state.rights}
			/>
		}
	}
	onStart = () =>
	{
		this.setState({progress : 1, is_timed : true, start_time : Date.now(), isTitleOpen:true });
	}
	preFinish()
	{
		if( this.state.progress == this.state.len - 2 || this.state.desission == "fail")
		{ 
			let params = {};
			params.test = '"'+ this.state.id + '"';
			params.questions = "[ " + this.state.results.join(", ") + " ]";
			params.start_time = parseInt(this.state.start_time/1000);
			params.end_time = parseInt(Date.now()/1000);
			//console.log(params);
			
			let paramsStr = "";
			for(var i in params)
			{
				paramsStr += " " + i + ": " + params[i] + " " ;
			}	
			/*		
			console.log("mutation compareTest  { compareTest(result : { " + paramsStr + " }) { id user_id user_login user_display_name test{ id } right_count start_time end_time credits bio_test_category { id }  questions  { id  answers right }}}");
			*/
			
			const mutation = gql`
				mutation compareTest 
				{
					compareTest(result : {${paramsStr}})
					{
						id
						test 
						{
							id
							post_title
						}
						right_count 
						start_time 
						end_time 
						credits 
						bio_test_category 
						{
							id
							post_title
						}						
						questions
						{
						  id
						  answers
						  right
						}
					}
				}
			`; 
			this.props.client.mutate({
				mutation: mutation,
				update: (store, { data }) =>
				{  
					this.setState({ 
						full_results : data.compareTest, 
						progress: this.state.len - 1, 
						is_timed:false
					});
				}
			});
		}
	}
	step = (dt, id) =>
	{
		this.preFinish();
		if(this.props.is_show_answer)
		{
			const question_id = '"' + id + '"'
			const mutation = gql`
				mutation getRightAnswer
				{
				  getRightAnswer(question_id:${question_id})
				  {
					id
					question_id
					post_content 
					fraction
					position
				  }
				  
				}
			`;
			this.props.client.mutate({
				mutation: mutation,
				update: (store, { data }) =>
				{ 
					console.log(data.getRightAnswer);
					this.setState({
						rights: data.getRightAnswer
					})
					let mem = setTimeout(() =>
					{
						let results = [...this.state.results];
						results.push(dt);
						this.setState({
							progress : this.state.progress + 1,
							results
						} );
					}, 2000);
				}
			})
		}	
		else
		{
			let results = [...this.state.results];
			results.push(dt);
			this.setState({
				progress: this.state.progress + 1,
				results,
				checked  : -2
			} );
			console.log( results );
		}
	}
	onFinish = (desission, time) =>
	{
		console.log(desission, time);		
		this.setState( { is_timed:false,  desission}, () => this.preFinish() );
	}
	onRestart = () =>
	{
		this.props.client.query({
			query:this.props.query, 
			variables:this.props.variables 
		}).then(result => 
		{
			console.log(result.data.getBio_Test );
			this.setState({
				...result.data.getBio_Test,
				len : result.data.getBio_Test.questions.length,
				progress: 0, 
				full_results:undefined, 
				is_timed:false, 
				isTitleOpen:false, 
				start_time: 0,
				end_time: 0, 
				results: [], 
				desission:null
			}); 
		})
		
	}
}
export default compose(
	withApollo
)(Test);
