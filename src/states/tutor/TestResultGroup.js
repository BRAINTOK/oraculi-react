import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n"; 
import $ from "jquery";
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom'; 
import {Callout, Intent, Button} from "@blueprintjs/core";

class TestResultGroup extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isOpen:false,
			id: this.props.tests[0].test.id
		};
	}
	componentDidUpdate(nextProps)
	{
		//if(nextProps.openId)
		//	this.setState({isOpen: nextProps.openId !== this.state.id});
	}
	render()
	{
		let dup = [];
		let i=0;
		let n = 0;
		for(var ee in this.props.tests)
		{
			//console.log(ee);
			dup.push(
				<div className="row test-result-sub" key={i}>
					<div className="col-md-6">
					 --
					</div>
					<div className="col-md-1">
						{this.props.tests[ee].right_count}
					</div>
					<div className="col-md-1">
						{this.props.tests[ee].credits}
					</div>
					<div className="col-md-3">
					{
						this.props.tests[ee].end_time && this.props.tests[ee].start_time
						?
						<div>
							<div className="mb-1">
								<Moment locale="ru" format="D.MM.YYYY h:mm:ss">
									{ new Date(this.props.tests[ee].start_time * 1000) }
								</Moment>
							</div> 
							<div>
								<Moment locale="ru" format="D.MM.YYYY h:mm:ss">
									{ new Date(this.props.tests[ee].end_time * 1000) }
								</Moment>
							</div>
						</div>
						: 
						"--"
					}
					</div> 
				</div> 
			);
			n = ee;
			i++;
		};
		dup.pop();
		const e = this.props.tests[ n ]; 
		const bio_test_category = e.bio_test_category.map((ee,ii) =>
		{
			return <div className="tutor-label">
				{ee.post_title}
			</div>
		});
		console.log( e);
		return  <div>
			<div className="row test-result">
				<div className="col-md-6">
					<NavLink
						to={"/test/" + e.test.id}
						className=""
					>
						<div dangerouslySetInnerHTML={{ __html: e.test.post_title }} />
					</NavLink>
					<div>
						{bio_test_category}
					</div>
				</div>
				<div className="col-md-1">					
					{e.right_count}
				</div>
				<div className="col-md-1">
					{e.credits}
				</div>
				<div className="col-md-3">
				{
					e.start_time && e.end_time
					?
					<div>
						<div className="mb-1">
							<Moment locale="ru" format="D.MM.YYYY h:mm:ss">
								{ new Date(e.start_time * 1000) }
							</Moment>
						</div> 
						<div>
							<Moment locale="ru" format="D.MM.YYYY h:mm:ss">
								{ new Date(e.end_time * 1000) }
							</Moment>
						</div>
					</div>
					: 
					"--"
				}
				</div>
				<div className="col-md-1 pr-0" onClick={ this.onOpen }>
					<Button 
						rightIcon={this.state.isOpen ? "caret-down" : "caret-right"} 
						text={dup.length + 1} 
						fill={true}
					/>
				</div>
				<div className={ "col-12 " + (this.state.isOpen ? "" : "hidden") } >
					{dup}
				</div>
			</div>
		</div>
		
	}
	onOpen = () => this.setState({isOpen: !this.state.isOpen});
}
export default TestResultGroup;