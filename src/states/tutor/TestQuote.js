import React, {Component, Fragment} from "react";
import { __ } from "../../layouts/utilities/i18n";
import getWidget, { initArea } from "../../layouts/utilities/getWidget";
import { NavLink } from 'react-router-dom'; 
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
 
class TestQuote extends Component
{
	render()
	{
		const cotent = this.props.post_content
			.split(" ")
				.slice(0, 14)
					.join(" ")
						+ "...";
		const thumb = <div className="lesson-quote-thumb" style={{backgroundImage:"url(" + this.props.thumbnail + ")" }} />;
		
		const classes = this.props.bio_class.map((e, i) => 
		{
			return <div className="tutor-label-class" key={i}>
				{e.post_title + " " + __("class") }
			</div>
		});
		const themes = this.props.bio_biology_theme.map((e, i) => 
		{
			return <div className="tutor-label" key={i}>
				{e.post_title}
			</div>
		});
		const courses = this.props.bio_course.map((e, i) => 
		{
			return <div className="tutor-label-course" key={i}>
				{e.post_title}
			</div>
		});
		const is_timed = this.props.is_timed
			?
			<Tooltip 
				content={ __( "Time limit" ) + ": " + this.props.duration + " " + __("sec.")  }
				className="d-inline-block"
				position={Position.TOP_LEFT}
			>
				<Button 
					minimal={true} 
					className="m-1" 
					title={__( "Time limit" ) + ": " + this.props.duration + " " + __("sec.") }
					intent={Intent.SECONDARY} 
				>
					<Icon icon="time"/>
				</Button>
			</Tooltip >
			:
			null;
		const is_show_answer = this.props.is_show_answer
			?
			<Tooltip 
				content={ __("Show right answer after choose") }
				className="d-inline-block"
				position={Position.TOP_LEFT}
			>
				<Button 
					minimal={true} 
					className="m-1" 
					title={ __("Show right answer after choose") }
					intent={ Intent.SECONDARY } 
				>
					<Icon icon="eye-open"/>
				</Button>
			</Tooltip >
			:
			null;
		const is_show_results = this.props.is_show_results
			?
			<Tooltip 
				content={ __("Show result after test") }
				className="d-inline-block"
				position={Position.TOP_LEFT}
			>
				<Button 
					minimal={true} 
					className="m-1" 
					title={ __("Show result after test") }
					intent={ Intent.SECONDARY } 
				>
					<Icon icon="issue"/>
				</Button>
			</Tooltip >
			:
			null;
		const questions_length = <Tooltip 
			content={ __("Questions count") }
			className="d-inline-block "
			position={Position.TOP_LEFT}
		>
			<Button 
				minimal={true} 
				className="m-1 text-secondary font-weight-bold" 
				title={ __("Questions count") }
				intent={ Intent.SECONDARY } 
			>
				{this.props.questions.length}
			</Button>
		</Tooltip >;	
		return <div className="lesson-quote-cont">		
			{ initArea( "test-quote-header", { ...this.props  } ) } 
			<div className="lesson-quote-second">
				{ initArea( "test-quote-before-title", { ...this.props  } ) }
				<NavLink className="lesson-qoute-title" to={"/test/" + this.props.id}>
					<div dangerouslySetInnerHTML={{ __html: this.props.post_title }} />
				</NavLink> 
				<div className=" pb-2 text-secondary">
					{is_timed}
					{is_show_answer}
					{is_show_results}
					{questions_length}
				</div>
				<div className="d-flex flex-wrap">
					<div className="test-qoute-themes">
						{themes}
					</div>
					<div className="test-qoute-courses">
						{courses}
					</div>
					<div className="test-qoute-classes">
						{classes}
					</div>
					<div className="test-quote-footer" >				
						{ initArea( "test-quote-footer", { ...this.props  } ) }
					</div>
				</div>
			</div>
		</div>
	}
	
}

export default TestQuote;