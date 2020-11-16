import React, {Component, Fragment} from "react";
import { NavLink, Link } from 'react-router-dom';
import {Router, Route, Switch, Redirect, withRouter} from "react-router";
import {__} from "../../layouts/utilities/i18n";
import $ from "jquery";
import Loading from "../../layouts/utilities/Loading";
import {compose} from "recompose";
import { Query, withApollo } from "react-apollo"; 
import gql from "graphql-tag"; 
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, Dialog,
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import Answer from "./Answer";

class AnswerMatching extends Answer
{
	constructor(props)
	{
		super(props);
		this.state = {
			...this.props, 
			value:"",
			dialogTitle : __("Dialog title"),
			dialogContent : __("Dialog Content"),
			search : [],
			saved: typeof props.saved == "undefined" ? true : props.saved,
			result: { post_title: props.post_title, id: props.id }
		}  
	}
	render()
	{
		const saved = this.state.saved
			?
			<Icon icon="tick" intent={Intent.SUCCESS} />
			:
			<Icon icon="error" intent={Intent.DANGER} />
		return <div 
			className={ "row data-list question " + (this.state.selected ? "active" : "") } 
			id={this.state.id}
			onMouseDown={this.onSelect}
		>
			<div className="col-1 py-2">
				<ButtonGroup vertical={true}>
					<Button 
						icon="caret-up" 
						minimal={true} 
						onClick={ () => this.props.onSwitchUp(this.state.id) }
						disabled={ this.props.is_first }
					>
					
					</Button>
					<input
						type="number"
						className="input dark"
						value={this.state.i}
						style={{width: 50, textAlign: "center"}}
						onChange={this.onSwitchOrder}
					/>
					<Button 
						icon="caret-down" 
						minimal={true} 
						onClick={ () => this.props.onSwitchDn(this.props.id) }
						disabled={ this.props.is_last }
					>
					
					</Button>
				</ButtonGroup>
			</div>
			<div className="col-5 py-2">
				<div>
					<textarea 
						value={ this.state.post_content } 
						onChange={this.onTextarea} 
						className="w-100 p-4 bg-transparent border-0" 
						rows="6"
					/>
				</div>
			</div>
			<div className="col-5 py-2">
				<div>
					<textarea 
						value={ this.state.subAnswer ? this.state.subAnswer.post_content: "" } 
						onChange={this.onSubAnswer} 
						className="w-100 p-4 bg-transparent border-0" 
						rows="6"
					/>
				</div>
			</div> 
			<div className="col-1 py-2"> 
				<div className="mb-4">
					{saved}
				</div>				
				<Popover
					interactionKind={PopoverInteractionKind.CLICK}
					popoverClassName="bp3-popover-content-sizing"
					position={Position.LEFT}
					content={
						<ButtonGroup vertical={true}> 
							<Button minimal={true} onClick={this.onAddQuestion}>
								{__("Add Question after")}
							</Button>
							<Button minimal={true} onClick={this.onDlQuestion}>
								{__("Remove Question")}
							</Button>
						</ButtonGroup>
					}
				>
					<Button minimal={true}>
						<i className="fas fa-ellipsis-v"></i>
					</Button>
				</Popover>
			</div>
			<Dialog
				isOpen={this.state.isChQ}
				onClose={this.onChQ}
				title={this.state.dialogTitle}
				className="little"
			>
				{this.state.dialogContent}
			</Dialog>
			<Dialog
				isOpen={this.state.isChQOpen}
				onClose={this.onOpenQuestion}
				title={__("Change Question")}
				className="little"
			>
				fgg
			</Dialog>
		</div>
	}
	
	onSubAnswer = evt =>
	{
		this.setState({post_content:evt.currentTarget.value});
	}
}	
export default compose(
	withApollo
)(AnswerMatching);