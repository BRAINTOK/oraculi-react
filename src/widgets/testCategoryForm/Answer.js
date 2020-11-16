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

class Answer extends Component
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
	componentDidMount()
	{
		
	}
	componntDidUnmount()
	{
		
	}
	componentWillReceiveProps ( nextProps )
	{  
		this.setState( {
			...nextProps, 
			saved: typeof nextProps.saved == "undefined" ? true : nextProps.saved,
			
		});
	}
	render()
	{ 
		console.log( this.state );
		const saved = this.state.saved
			?
			<Icon icon="tick" intent={Intent.SUCCESS} />
			:
			<Icon icon="error" intent={Intent.DANGER} />
		const checked = this.state.single
			?
			<Fragment>
				<input	
					type="radio"
					className="radio"
					id={this.state.i}
					value={this.state.i}
					checked={this.state.right == 1}
					onChange={this.onChange}
					name={this.state.name}
				/>
				<label htmlFor={this.state.i}>
					{ __( this.state.right == 1 ? "Right answer" : "False answer" ) }
				</label>
			</Fragment>
			:
			<Fragment>
				<input	
					type="checkbox"
					className="checkbox"
					id={this.state.i}
					value={this.state.right}
					checked={this.state.right == 1}
					onChange={this.onChange}
					name={this.state.name + this.state.i}
				/>
				<label htmlFor={this.state.i}>
					{ __( this.state.right == 1 ? "Right answer" : "False answer" ) }
				</label>
			</Fragment>
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
			<div className="col-9 py-2">
				<div className="pb-4">
					<textarea 
						value={ this.state.post_content } 
						onChange={this.onTextarea} 
						className="w-100 p-4 bg-transparent border-0" 
						rows="4"
					/>
					{ checked }
				</div>
			</div>
			<div className="col-1 py-2"> 
				{saved}
				<div className="hidden ">
					{this.state.id}
				</div>
			</div>
			<div className="col-1 py-2"> 
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
				{this.changeIF()}
			</Dialog>
		</div>
	}
	onChange = evt =>
	{
		this.setState({right:!this.state.right});
	}
	onTextarea = evt =>
	{
		this.setState({post_content:evt.currentTarget.value});
	}
	onSelect = evt =>
	{
		$(".question").removeClass("active");
		evt.currentTarget.classList.add("active");
	}
	onSwitchOrder = evt =>
	{
		//console.log( this.state.id );
		this.props.onSwitchOrder( [this.props.id, evt.currentTarget.value] );
	}
	onAddQuestion = evt =>
	{
		//console.log( this.state.id );
		this.props.onAddQuestion( this.state.id );
	}
	onChQ = () =>
	{
		this.setState( { isChQ:!this.state.isChQ } );
	}
	onOpenQuestion = () =>
	{
		this.setState( { isChQOpen:!this.state.isChQOpen } );
	}
	onChQuestion = () =>
	{
		this.setState( { 
			isChQOpen :true 
		} );
	}
	onDlQuestion = () =>
	{
		this.setState( { 
			isChQ :true,
			dialogTitle  : __("Delete Question"),
			dialogContent : <div className="p-5">
				<div className="btn btn-danger" onClick={this.onDelete}>
					{__("Delete this Question?")}
				</div>
			</div>,
		} );
	}
	onDelete = () =>
	{
		this.props.onDelete( this.state.id );
		this.setState({ isChQ: false });
	}
	
	changeIF()
	{
		const btn = this.state.id != this.state.result.id		
			?
			<div className="btn btn-danger" onClick={this.changeQuestion}>
				{__("Change Question")}
			</div>
			:
			null;
			
			
		return <div className="p-5">
			<div className="pb-3 text-secondary">
				<span>
					{__("Current Question:")}
				</span>
				<span className="title pl-3">
					{this.state.result.post_title}
				</span>
			</div>
			<div className="title">
				{__("Select Question by substring")}
			</div>
			<div className="input-group mb-3 position-relative">
				<input
					type="text"
					value={ this.state.value }
					onChange={this.onChangeValue}
					className="form-control dark input "
					placeholder={__("Set substring for search")}
				/>
				<div className="input-group-append">
					<Popover
						isOpen={this.state.isSearchOpen} 
						content={ 
							<div className="p-0 max-width-350 max-width-250  max-height-250 overflow-y-auto">
								<div style={{ overflowX:"hidden", overflowY:"auto", marginBottom:10 }}>
									{this.searchList()}		
								</div> 
							</div> 
						}
					>
						<button className="btn btn-outline-secondary" type="button" onClick={this.onSearch}>
							<i className="fas fa-search" />
						</button>
					</Popover>
				</div>				
			</div>			
			<div className="pt-3" style={{height:50}}>
				{btn}
			</div>	
		</div>
	}
	searchList = () =>
	{ 
		const list = this.state.search.map((e, i) =>
		{
			return <Button fill={true} key={i} qid={e.id} onClick={ this.onSelectNewQuestion }>
				{e.post_title}
			</Button>
		})
		return this.state.search.length > 0
			?
			<ButtonGroup vertical={true}>
				{list}
			</ButtonGroup>
			:
			<div className="alert alert-danger">
				{__("Search result is empty")}
			</div>
	}
	onChangeValue = evt =>
	{
		this.setState( { value:evt.currentTarget.value } );
	}
	onSelectNewQuestion = evt =>
	{
		const qid = evt.currentTarget.getAttribute("qid");
		const srch = this.state.search.filter(e => e.id==qid)[0]
		this.setState({
			result: srch,
			isSearchOpen:false
		});
	}
	onSearch = () =>
	{
		return;
		//console.log(this.state.value);
		if(this.state.value && this.state.value.length > 0)
		{ 
			const _search = this.state.value;
			let query = gql`
			query
			{
				getBio_TestQuestions(
					paging:
					{
						offset:0, 
						count:50,
					  search:"${_search}"
					}
			  )
			  {
					id
					post_title
					bio_test
					{
					  id
					  post_title
					  
					}
					bio_biology_theme
					{
					  id
					  post_title
					}
			  }
			}`;  
			this.props.client.query( { query: query })
				.then(result  => 
					{
						 console.log( result.data.getBio_TestQuestions ); 
						// console.log( this.state ); 
						this.setState({
							search : result.data.getBio_TestQuestions,
							dialogContent : this.changeIF(),
							isSearchOpen:!this.state.isSearchOpen
						})
					}
				)
		}
		else
		{
			AppToaster.show({  
				intent: Intent.DANGER,
				icon: "tick", 
				message: "Insert not empty title" 
			});
			return;
		}
	}
	changeQuestion = () =>
	{
		this.setState({ 
			isChQOpen:false 
		})
		this.props.changeQuestion([this.state.id, { ...this.state.result, saved:false }]);
	}
}	
export default compose(
	withApollo
)(Answer);