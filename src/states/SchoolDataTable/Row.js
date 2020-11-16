import React, {Component, Fragment} from "react";
import CategoryForm from "./CategoryForm";
import getWidget, { initArea } from "../../layouts/utilities/getWidget";
import { getAdminRouteLink } from "../../layouts/routing";


import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';

import { 
	Icon, Tag, 
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, 
	InputGroup 
 } from "@blueprintjs/core";
import $ from "jquery";

import { compose, mapProps } from "recompose";
import { loader } from 'graphql.macro';
import {graphql, Query, withApollo, Mutation} from 'react-apollo';
import gql from "graphql-tag";
import {withRouter} from "react-router"; 

import {
	apolloFields,
	getInput, 
	getVisibleValue,
	adminData
} from "../../layouts/schema";
import {__} from "../../layouts/utilities/i18n";

class Row extends Component
{
	state = {
		...this.props.elem,
		current: this.props.current,
		height: this.props.height,
		isOpen: this.props.isOpen,
		allChecked 	: false, 
		checked 	: 0, 
	}
	componentWillReceiveProps ( nextProps )
	{
		if(typeof nextProps.isOpen !== "undefined" )
		{
			this.setState({isOpen:nextProps.isOpen});
		}
		if(typeof nextProps.checked !== "undefined" )
		{
			this.setState({checked:nextProps.checked});
		}
		if(typeof nextProps.allChecked !== "undefined" )
		{
			this.setState({allChecked:nextProps.allChecked});
		}
	}
	render()
	{
		const { trColor, data_type} = this.props;

		return <Mutation mutation={this.props.change_mutation}>
			{( m_change, { data } ) => {
				return (<Mutation mutation={this.props.mutation_delete}>
					{( m_delete, { data } ) => this.onRowForm(m_change, m_delete)}
				</Mutation>)
				}
			}
		</Mutation>;

		/* MUTATION change end */
	}
	onRowForm = ( m_change, m_delete ) =>
	{
		const { trColor, data_type} = this.props;
		let style = { backgroundColor : trColor  };
		
		const isOpen = (this.props.location.pathname == this.props.route + "/" + this.state.id) || (this.props.location.pathname == this.props.route + "/new" && this.props.isNew)

		let html = [];
		if (this.props.location.pathname == this.props.route || isOpen)
		{  
			html.push(
				<tr key={ this.state.id ? this.state.id : -1 }>
				{
					this.rows().map( (e, i) => {
						return this.props.isNew
							?
							<th col={ e[0] } key={i} width={e[2]} style={style}>{ e[1] }</th>
							:
							<td key={i}>
								{  	
									initArea( 
										"ontableRow", 
										{ ...this.props, data:[...e], i:i, state:this.state },  
										this.onDefRow(e[0], this.state, e ) 
									) 
								}
							</td>
					})
				}
				</tr>
			);
		};
		
		//children
		if(this.props.elem.children && typeof this.props.elem.children == "object" && this.props.elem.children.length > 0)
		{ 
			html.push(
				this.props.elem.children.map((ee, ii) => {
					return <Fragment key={ this.state.id ? this.state.id + "_" + ii : "new_" + ii  }>
						<Row
							i={ii}
							trColor={this.props.trColor}
							route={this.props.route}
							data_type={this.props.data_type}
							query_name = {this.props.query_name}
							query = {this.props.query}
							mutation_name={this.props.mutation_name}
							change_mutation={this.props.change_mutation}
							mutation_delete={this.props.mutation_delete}
							isOpen={ii == this.state.current}
							elem={ee}
							isNew={this.props.isNew}
							checked={ this.state.checked[ee.id] }
							location={this.props.location}
							level={this.props.level + 1}
						/>
					</Fragment>
				})
			);
		}
		return <Fragment>
				{html}
			</Fragment>
	}
	onSave =(m_change, state, id)=>
	{		

		let input = getInput(state, this.props.data_type);
		
		if (this.props.custom_variables) {
			input = {...input, ...this.props.custom_variables}
		}
		console.log( input );
		m_change({
			variables:
			{
				"id": id,
				"input": input
			},
			update: (store, { data: data }) =>
			{
				console.log(data);
				const respData = data[this.props.mutation_name];
				if(respData)
				{
					//console.log(state);
					//console.log(respData);
					let _state = {};
					for(let e in respData)
					{
						_state[e] = respData[e];
					}
					//console.log(_state);
					this.setState( _state );
					
					const data1 = store.readQuery({query: this.props.query, variables: {}  });
					const new_state = { ...input, ..._state, id: respData.id};
					data1[ this.props.query_name ][ this.props.i ] = new_state;
					//console.log("data1:", data1);
					//console.log(new_state)
					store.writeQuery({ query: this.props.query, variables: {}, data: data1 });
					this.props.onOpen(-1);
				}
			},
			refetchQueries: [ { query: this.props.query, variables: {}}]
		});
	}

	onDelete = (m_delete, id) =>{

		m_delete({
			variables:
				{
					"id": id,
				},
			update: (store, { data: data }) =>
			{
				const respData = data["delete" + this.props.data_type];
				if(respData)
				{
					this.props.onOpen(-1);
				}
			},
			refetchQueries: [ { query: this.props.query, variables: {}}]
		});

		// this.props.onOpen(-1);
	}

	onDefRow( col, elem, dat )
	{
		let txt = "---";
		switch(col)
		{
			case "edit":
				txt = this.props.location.pathname !== this.props.route + "/" + this.state.id
					?								 
					<NavLink
						to={{
							pathname: this.props.route + "/" + this.state.id
						}}
					>
						<Button
							title={__("Edit")}
							icon="edit"
							intent={this.props.level> 0 ? Intent.SECONDARY : Intent.SUCCESS}
							fill={true}
						/>
					</NavLink>
					:
					<NavLink
						to={{
							pathname: this.props.route
						}}
					>
						<Button
							title={__("Close")}
							icon="chevron-up"
							intent={Intent.SUCCESS}
							fill={true}
						/>
					</NavLink>
				break;
			default:
				txt = this.onRow(col, this.state, dat );
		}
		return txt;
	}
	onRow(col, elem, dat )
	{
		//console.log(col, elem, dat);
		const { data_type } = this.props;
		let txt, apollo_fields;		
		switch(col)
		{
			case "ch":
				txt = <Fragment>
					<label className={"_check_blue_ ml-2 data-" + col}>
						<input 
							type="checkbox" 
							eid={this.state.id}
							value={this.state.id}
							checked={ this.state.checked } 
							onChange={this.onChecked}
						/>
					</label>
				</Fragment>
				//txt = null;
				break;
			case "post_title":
				
				let tabs = [];
				let i = 0;
				apollo_fields = apolloFields(data_type);
				for(let e in apollo_fields)
				{
					if(!apollo_fields[e].thread) continue;
					if( apollo_fields[e].filter_type != "taxonomies") continue;
					
					if (this.state[e] && this.state[e].length > 0) 
					{
						const adminData2 = adminData(apollo_fields[e].component);
						const visibled_value2 = getVisibleValue(apollo_fields[e].component);
						const vv2 = visibled_value2
							? visibled_value2
							: "post_title";
						let dscr;
						const style = adminData2 && adminData2.fill 
							? 
							{ backgroundColor: adminData2.fill[1] , color:"#EEE", opacity:.75} 
							: 
							{};
						dscr = this.state[e].map( (ee, i) => {
							return getAdminRouteLink(
								apollo_fields[e].component,
								<Tag 
									className="mr-1 mb-1" 
									minimal={true} 
									style={style}
									key={i}
									title={__(apollo_fields[e].title)}
								>
									{ee[vv2]}
								</Tag>
							)
						} );
						
						tabs.push(<span className="small mr-2">
							{dscr}
						</span>)
					}
				}
				txt = <Fragment>
					<div 
						className={"font-weight-bold mb-1  data-"  + col + " table_level" + this.props.level}
						dangerouslySetInnerHTML={{ __html: this.state.post_title }}
					/>
					{tabs}
				</Fragment>
				break;
			case "id":
				txt = <div 
					className={"px-1 data-"  + col}
					title={this.state.id}
					style={{
						maxWidth:100, 
						textOverflow: "ellipsis", 
						overflow: "hidden", 
						whiteSpace: "nowrap"
					}}
				>
					{this.state.id}
				</div>
				break;
			default:
				apollo_fields = apolloFields(this.props.data_type);
				let style = {};
				if(apollo_fields[col].col_width)
				{
					style.width = apollo_fields[col].col_width;
				}
				switch( apollo_fields[col].type )
				{
					case "media":
						txt = <div className={ "d-flex  data-" + col } style={{alignItems:"center"}}>
							<div style={{
								backgroundImage: "url(" + this.state[col] + ")",
								backgroundSize:"cover",
								width:30,
								height:30,
								margin:6,
								...style
							}} />
						</div>;
						break;
					case "rgb":
						txt = <div className={"d-flex  data-" + col } style={{alignItems:"center"}}>
							<div 
								style={{ 
									width:14, 
									height:14, 
									borderRadius: 2, 
									backgroundColor: this.state[col],
									...style									
									}} 
								className="mr-2"
							/>
							{this.state[col]}
						</div>;
						break;
					case "date":
						txt = this.state[col] 
						?
						<Moment locale="ru" format="D MMMM YYYY">
							{new Date( this.state[col] * 1000 )}
						</Moment>
						:
						__("Date not defined")
						break;
					case "geo":
						txt = <div className={ "small opacity_5 data-" + col } style={{...style}}>
							<div>{this.state[col] ? this.state[col][0] : null}</div>
							<div>{this.state[col] ? this.state[col][1] : null}</div>
						</div>; 
						break;
					case "boolean":
						txt = <div className={"text-center data-" + col } style={{ ...style }}>
							<i className={this.state[col] ? "fas fa-chevron-down text-success" : "fas fa-times text-danger"} />
						</div>; 
						break;
					case "checkbox":
						txt = Array.isArray(this.state[col]) 
							? 
							this.state[col].map((e, i) =>
							{
								const elem = typeof e === "string" ? {id:e, title:e} : e;
								return <Tag key={i}>{elem.title}</Tag>
							}) 
							: 
							this.state[col].toString();
						break;
					case "color":
						txt = <div style={{
							width:17,
							height:17,
							backgroundColor:this.state[col],
							border: "1px solid #00000020",
							outline: "1px solid #00000020",
							outlineOffset:2,
							...style
						}} />
						break;
					case "external":
						const visibled_value = getVisibleValue(dat[3].component);
						const vv = visibled_value
							? visibled_value
							: "title";
						txt = this.state[col] ? this.state[col][vv] : null;
						break;
					case "radio":
						const __val = apollo_fields[col].values
							?
							apollo_fields[col].values.filter(e => {
								return e._id 
									?
									e._id == this.state[col]
									:
									e == this.state[col]
							})
								.map(e => {
									return e._id
										?
										__(e.title)
										:
										__(e)
								})[0]
							:
							this.state[col]
						
						txt = __val;
						break;
					case "array":
						if (dat[3].component == "string") 
						{
							txt = null;
							if (this.state[col])
								txt = this.state[col].map((e, i)=> <Tag className="mr-1 mb-1" minimal={true} key={i}>
									{e}
								</Tag>);
							break;
						}
						const visibled_value2 = getVisibleValue(dat[3].component);
						const vv2 = visibled_value2
							? visibled_value2
							: "post_title";
						txt = null;
						if (this.state[col]) 
						{
							txt = this.state[col].map((e, i)=> <Tag className="mr-1 mb-1" minimal={true} key={i}>
								{e[vv2]}
							</Tag>) 
						}
						break;
					default:
						txt = <div 
							className={" " + col} 
							style={{...style}} 
							dangerouslySetInnerHTML={{ __html: this.state[col] }}
						>
						
						</div>
				}
		}
		return txt;
	}
	rows()
	{
		const { data_type } = this.props;
		let tabs = [];
		let i = 0;
		const apollo_fields = apolloFields(data_type);
		for(let e in apollo_fields)
		{
			if(!apollo_fields[e].thread) continue;
			if( apollo_fields[e].filter_type == "taxonomies") continue;
			let ttl, w, descr;
			switch(e)
			{
				case "id":
					ttl	= <Tooltip intent={Intent.DANGER} content={__("id")}>{__("id")}</Tooltip>;
					w 	= 30;
					break;
				default:
					descr = apollo_fields[e].description
						?
						<Popover
							position={ Position.BOTTOM }
							interactionKind={"hover"}
							content={ <div className="p-4 w_170">
								{ __(apollo_fields[e].description) }
							</div>}
						>
							<Button minimal={true} icon="help" />
						</Popover>
						:
						null
					ttl = <Fragment>
						<div>
							{__(apollo_fields[e].title)}
						</div>
						<div>
							{descr}
						</div>
					</Fragment>;
					w 	= apollo_fields[e].col_width ? apollo_fields[e].col_width : "auto";
			}
			tabs.push([ e, ttl, w, apollo_fields[e] ]);
		};
		
		/*
		tabs.unshift([
			'ch', 
			<label className="_check_red_ ml-2">
				<input type="checkbox" checked={this.state.allChecked} onChange={this.onAllChecked} />
			</label>, 
			50
		]);
		*/
		//					<Tooltip intent={Intent.DANGER} content={__("Add new")} key={1}>
		// 						<div className="btn btn-link text-light btn-sm" onClick={this.onEditForm}>
		// 							<Icon icon="plus" />
		// 						</div>
		// 					</Tooltip>

		//					<Tooltip intent={Intent.DANGER} content={__("Cancel")} key={1}>
		// 						<div className="btn btn-link text-light btn-sm" onClick={this.onClose}>
		// 							<Icon icon="undo" />
		// 						</div>
		// 					</Tooltip>
		tabs.unshift(['edit',
			[
				!this.state.isOpen ?
					<Button
						icon="plus"
						intent={Intent.DANGER}
						fill={true}
						onClick={this.onEditForm}
						title={__("Add new")}
						key={1}
					/>
					:
					<Button
						icon="undo"
						intent={Intent.DANGER}
						fill={true}
						onClick={this.onClose}
						title={__("Cancel")}
						key={1}
					/>,
				<span key={21}>{this.row_edit()}</span>
			], 30
		]);
		return tabs;
	}
	
	row_edit()
	{
		return <span> </span>
	}
	
	onAllChecked = evt =>
	{
		const checked = evt.currentTarget.checked ? 1 : 0;
		this.props.onAllChecked( checked );
	}
	onChecked = evt =>
	{
		const checked = evt.currentTarget.checked ? 1 : 0;
		this.props.onChecked(checked, this.props.elem.id);
	}
	onEditForm = evt =>
	{
		//const btn = evt.currentTarget
		//const par = $(btn).parents("tr").next().find(".category_card");
		//const h = $(par).height();
		//this.setState({ isOpen:true, current:tid, isNew:false, height: h + 45 });
		this.props.onOpen(this.props.i);
	}



	onClose = () =>
	{
		//this.setState({ isOpen:false, current : -1, isNew : false });
		this.props.onOpen(-1);
	}
	onChange=(field, value, id) =>
	{
		//console.log(field, value, id);
		this.setState({ field: value });
	}
}

export default compose(
	withApollo,
	withRouter
)(Row);