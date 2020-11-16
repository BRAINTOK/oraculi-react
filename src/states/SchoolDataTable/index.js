import React, {Fragment, Component} from "react";
import DataTableElements from "./DataTableElements";
import Row from "./Row";
import {getQueryArgs, getQueryData, getQueryName, querySingle, apolloFields} from "../../layouts/schema";

import $ from "jquery";
import CategoryForm from "./CategoryForm";


import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";

import { compose, mapProps } from "recompose";
import {Query, withApollo} from 'react-apollo';
import {withRouter} from "react-router";
import gql from 'graphql-tag';

import layouts from "../../layouts/layouts";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import {__} from "../../layouts/utilities/i18n";
import {sprintf} from "../../layouts/utilities/sprintf";
import {onSaveGql} from "../../layouts/schema/ecosystem";
import Loading from "../../layouts/utilities/Loading";
import Pagi from "../../layouts/utilities/Pagi";

class DataTable extends Component
{
	constructor(props)
	{
		super(props);
		//console.log( this.props );
		// const post = this.props.data ? this.props.data : [];
		let checked= {}, current = -1;
		/*
		post.forEach(e => checked[e.id] = 0);
		if(this.props.match.params.id)
		{
		 	for( var e in post)
		 	{
		 		if(post[e].id == this.props.match.params.id)
		 		{
		 			current = e;
		 			break;
		 		}
		 	}
		}
		*/
		this.state = {
			current 	: current,
			checked 	: checked,
			height		: 260,
			isNew 		: false,
			// post 		: post,
			theadColor 	: this.props.theadColor || "#87A629" ,
			trColor 	: this.props.trColor || "#52631e" ,
			isOpen1		: false,
			isOpen2		: false,
			isOpen3		: false,
			
			count		: 10,
			offset		: 0,
			full_count	: -1,
			
			filters		: {},
			metaFilters	: {},
			filterSelected	: {},
			metaSelected	: {},
			isFilterOpen : false,
			relation 	: "OR"
		}; 
	}	
	getPaging( pars = [true, true, true] )
	{
		// taxonomies
		const filterSelected = this.state.filterSelected;
		let paging1 = [];
		for(var f in filterSelected)
		{
			paging1.push( '{ tax_name:"' + f + '",  term_ids : [' + filterSelected[f] + '] }' );
		}
		paging1 = paging1.length > 0 ? " taxonomies: [" + paging1.join(",") + "]" : "";
		const relation = ' tax_relation: "' + this.state.relation + '" ';
		const terms = paging1.length > 0 ? paging1 + relation : "";
		
		//  metas
		const metaSelected = this.state.metaSelected;
		//console.log(metaSelected);
		let paging2 = [];
		for(var f in metaSelected)
		{
			if(metaSelected[f] === true || metaSelected[f] === false)
				paging2.push( '{ key:"' + f + '",  value_bool : ' + metaSelected[f] + ' }' );
			else
				paging2.push( '{ key:"' + f + '",  value : "' + metaSelected[f] + '" }' );
		}
		paging2 = paging2.length > 0 ? " metas: [" + paging2.join(",") + "]" : "";
		const mrelation = ' meta_relation: "' + this.state.relation + '" ';
		const metass = paging2.length > 0 ? paging2 + mrelation : "";		
		return ( terms + metass ) ;
	}
	getCount()
	{
		const name = "get" + this.props.data_type + "Count";
		const gP = this.getPaging([true, true, false]);
		const paging = gP.length > 0 ?  "( paging:{ " + gP + "  })" : ""; 
		const query = gql`
			query ${name} 
			{
				${name}${paging} 
			}
		`;
		//console.log("query " + name + " { " + name + paging + " }");
		this.props.client.query({
			query: query
		}).then(result => {
			//console.log(result.data[name]);
			this.setState({full_count:result.data[name]})
		})
	} 
	onChangeRelation = evt =>
	{
		const relation = evt.currentTarget.getAttribute("relation");
		this.setState( {relation} );
	}
	getRelation()
	{
		return <ButtonGroup >
			<Button 
				minimal={ this.state.relation == "AND" } 
				intent={Intent.SUCCESS} 
				relation="OR"   
				onClick={ this.onChangeRelation }
			>
				{ __("All by any fields")}
			</Button>
			<Button 
				minimal={ this.state.relation == "OR" } 
				intent={Intent.DANGER} 
				relation="AND"  
				onClick={this.onChangeRelation }
			>
				{__("Only have all fields")}
			</Button>			
		</ButtonGroup>
	}
	componentDidMount()
	{
		this.getCount();
		//
		const fields = apolloFields( this.props.data_type );
		//console.log(fields);
		let externals = [], metas = []
		for(let field in fields)
		{
			const e = fields[field]; 
			if( e.filter_type == "taxonomies" )
			{
				externals.push({field:field, name: e.component, title: e.title, order:e.order, parent:e.parent});
			}
			if(e.filter_type == "meta")
			{
				metas.push({field:field, title: e.title, type: e.type, values:e.values, component:e.component });
			}
		}
		
		for(let external in externals)
		{
			let n = externals[external].name;
			let name1 = "get" + n + "s";
			//console.log( name1 );
			let order = externals[external].order
				?
				'order_by_meta:"order"'
				:
				'';
			let parent = externals[external].parent
				?
				'parent:"0"'
				:
				'';
			let query1 = gql`
				query ${name1}
				{
					${name1} (paging : { ${order} , ${parent} , order:"ASC",  } )
					{
						id
						post_title
					}
				}
			`;  
			this.props.client.query({
				query: query1
			}).then(result1 => {
				//console.log(name1, result1.data[name1]);
				let filters  	= {...this.state.filters};
				filters[name1] 	= { 
					data : result1.data[name1], 
					title : externals[external].title, 
					name : externals[external].field 
				};
				this.setState({filters})
			})
		}
		let metaFilters = {...this.state.metaFilters};
		for(let meta in metas)
		{
			// console.log( metas[meta] );
				
			const component = metas[meta].component;			
			if( component )
			{
				let n = component;
				let name1 = "get" + n + "s";
				//console.log( name1 );
				let query2 = gql`
					query ${name1}
					{
						${name1} (paging : { order:"ASC",  } )
						{
							id
							post_title
						}
					}
				`;  
				this.props.client.query({
					query: query2
				}).then(result1 =>
				{					
					//console.log(name1, result1.data[name1]); 
					metaFilters[name1] 	= { 
						data : result1.data[name1], 
						title : metas[meta].title, 
						name : metas[meta].field,
						type: "component"
					};
					return;
					/*
					this.setState({filters})
					*/
				})
			}
			else
			{
				metaFilters[metas[meta].field] = metas[meta];		
			}
			
			
		}
		this.setState({metaFilters});
	}
	onFilter = evt =>
	{
		const name = evt.currentTarget.getAttribute('name');
		const value = evt.currentTarget.value;
		let filterSelected = {...this.state.filterSelected};		
		if( value  > 0 )
		{
			filterSelected[name]= value;
		}
		else
		{
			delete filterSelected[name];
		}
		this.setState( {filterSelected, full_count:-1, offset:0}, () => this.getCount() ); 
	}
	
	onMataFilter = evt =>
	{
		const name = evt.currentTarget.getAttribute('name');
		const value = evt.currentTarget.value;
		let metaSelected = {...this.state.metaSelected};		
		if( value  > 0 )
		{
			metaSelected[name]= value;
		}
		else
		{
			delete metaSelected[name];
		}
		this.setState( {metaSelected, full_count:-1, offset:0}, () => this.getCount() ); 
	}
	
	onMetaBool = evt =>
	{ 
		const name 	= evt.currentTarget.getAttribute('field');
		const val 	= evt.currentTarget.getAttribute( 'val' );
		let metaSelected = { ...this.state.metaSelected };
		switch(val)
		{
			case "1":
				metaSelected[name] = true;
				break;
			case "2":
				metaSelected[name] = false;
				break;
			case "0":
			default:
				delete metaSelected[name];
				break;
		}
		//console.log(metaSelected)
		this.setState( {metaSelected, full_count:-1, offset:0}, () => this.getCount() )
	}
	
	onMeta = evt =>
	{ 
		const name 	= evt.currentTarget.getAttribute('field');
		const val 	= evt.currentTarget.getAttribute( 'val' );
		let metaSelected = { ...this.state.metaSelected };
		if( val == null )
			delete metaSelected[name];
		else 
			metaSelected[name] = val; 
		this.setState( {metaSelected, full_count:-1, offset:0}, () => this.getCount() )
	}
	render()
	{
		const name = "get" + this.props.data_type + "s";
		const fields = getQueryArgs( this.props.data_type );
		const paging = this.getPaging();
		
		const count = this.state.count;
		const offset = this.state.offset;
		const filter = getQueryData( this.props.data_type ).admin_data.filter;
		let queryFilters = "";
		if(filter)
		{
			let v = "";
			for(let key in filter)
			{
				switch(filter[key].type)
				{
					case "int":
						v = filter[key].value;
						break;
					default:
						v = '"' + filter[key].value + '"';
				}
				queryFilters += " " + key + ":" + v + " ";
			}
		}
		//console.log(filter, queryFilters);
		
		const full_count = this.state.full_count;
		const shifter = count && count < full_count
				?
				<div className="pagi-cont">
					<Pagi
						all={ Math.ceil( full_count / parseInt(count) ) - 1 }
						current={ parseInt(offset) / parseInt(count) }
						count={count}
						full_count={full_count}
						onChoose={ this.onPagi }
					/>
				</div>
				:
				null;
		//
		let filters = [];
		let sel;
		//console.log(this.state.filters);
		for(let f in this.state.filters)
		{
			sel = this.state.filters[f].data.map((e, i) =>
			{
				let fS = this.state.filterSelected[this.state.filters[f].name]
				let selct = fS && Array.isArray(fS) && fS.filter(ee => ee == e.id).length > 0
					?
					true
					:
					false;
				return <option value={e.id} key={i} selected={selct}>{e.post_title}</option>
			})
			filters.push(
				<div className="p-2 w-32 w-sm-100 card m-1 opacity_75" key={f}>
					<div className="title ml-2 text-secondary">
						{ __( this.state.filters[f].title) }
					</div>
					<select className="filter form-control" name={this.state.filters[f].name} onChange={this.onFilter}>
						<option value="-1" >---</option>
						{sel}
					</select>
				</div>
			);
		}
		
		let metaFilters = [], mf, values;
		for(let f in this.state.metaFilters)
		{
			switch(this.state.metaFilters[f].type)
			{
				case "component":
					mf = this.state.metaSelected[this.state.metaFilters[f].field] ;
					//console.log(mf, this.state.metaFilters[f]  );
					/**/
					sel = this.state.metaFilters[f].data.map((e, i) =>
					{
						//let fS = this.state.filterSelected[this.state.metaFilters[f].post_title]
						let selct = false;
						return <option value={e.id} key={i} selected={selct}>{e.post_title}</option>
					})
					
					metaFilters.push(
						<div className="p-2 w-32 w-sm-100 card m-1 opacity_75" key={f}>
							<div className="title ml-2 text-secondary">
								{ __( this.state.metaFilters[f].title) }
							</div>
							<select 
								className="filter form-control" 
								name={this.state.metaFilters[f].name} 
								onChange={this.onMataFilter}
							>
								<option value="-1" >---</option>
								{sel}
							</select>
						</div>
					);
					break;
				case "boolean":
					mf = this.state.metaSelected[this.state.metaFilters[f].field] ;
					//console.log(mf, this.state.metaFilters[f].field);
					metaFilters.push(
						<div className="p-2 w-32 w-sm-100 card m-1 opacity_75" key={f}>
							<div className="title ml-2 text-secondary">
								{ __( this.state.metaFilters[f].title) }
							</div>
							
							<ButtonGroup >
								<Button
									intent={ Intent.SUCCESS }
									minimal={ mf !== "1" }
									val="1" 
									field={this.state.metaFilters[f].field}
									onClick={this.onMetaBool} 
								>
									{__("Yes")}
								</Button>
								<Button
									intent={ Intent.DANGER }
									minimal={ mf !== "" }
									val="2" 
									field={this.state.metaFilters[f].field}
									onClick={this.onMetaBool} 
								>
									{__("No")}
								</Button>
								<Button
									intent={ Intent.NONE }
									minimal={ true }
									val="0" 
									field={this.state.metaFilters[f].field}
									onClick={this.onMetaBool} 
								>
									{__("clear filter")}
								</Button>
							</ButtonGroup>
						</div>
					);
					break;
				case "radio":
					mf = this.state.metaSelected[ this.state.metaFilters[f].field ];
					values = this.state.metaFilters[f].values
						?
						this.state.metaFilters[f].values.map( e =>
						{
							return <Button
								alignText="left"
								intent={ Intent.PRIMARY }
								minimal={ mf != ( e._id ? e._id : e ) }
								val={ e._id ? e._id.toString() : e.toString() }
								field={ this.state.metaFilters[f].field }
								onClick={this.onMeta} 
							>
								{ __( e._id ? e.title.toString() : e.toString() ) }
							</Button>
						} )
						:
						null; 
					metaFilters.push(
						<div className="p-2 w-32 w-sm-100 card m-1 opacity_75" key={f}>
							<div className="title ml-2 text-secondary">
								{ __( this.state.metaFilters[f].title) }
							</div>
							<ButtonGroup vertical={true} fill={true} className="pb-4">
								{values}	
								<Button
									alignText="left"
									intent={ Intent.NONE }
									minimal={ true }
									val  
									field={this.state.metaFilters[f].field}
									onClick={this.onMeta} 
								>
									{__("clear filter")}
								</Button>
							</ButtonGroup>
						</div>
					);
					break;
				default:
					let m = "";
			}
		}
		
		
		const query = gql`
				query ${name} 
				{
					${name}( paging:{ count:${count}, offset:${offset}, ${paging} ${queryFilters} })
					{
						${fields}
					}
				}
			`;
		//console.log( 'query '+name+' {'+name+'( paging:{ count:'+count+' offset:'+offset+' '+paging+' }) {'+fields+'} }' );
		
		const filterBtn = filters.length > 0 || metaFilters.length > 0
			?
			<Button minimal={true} onClick={ ()=> this.setState({isFilterOpen : !this.state.isFilterOpen}) } >
				{ __( this.state.isFilterOpen ? "hide Filters" : "show Filters" ) }
			</Button>
			:
			null;
		const filterBlock = filters.length > 0 || metaFilters.length > 0
			?
			<Fragment>
				<Collapse isOpen={this.state.isFilterOpen} className="w-100">
					<div className="p-3 bg-light mt-2">
						<div className="d-flex flex-wrap">
							{filters}
							{metaFilters}
						</div>
						<div className="d-flex pl-2">
							{this.getRelation()}
							<Button minimal={true} onClick={this.clearFilter} className="ml-3 w-32 w-sm-100">
								{ __( "clear filters" ) }
							</Button>
						</div>
					</div>
				</Collapse>
			</Fragment>
			:
			null;
		return <Fragment>
			<div className="d-flex">
				<Button 
					minimal={true} 
					className="ml-2"
					onClick={ ()=> this.setState({isSettingsOpen : !this.state.isSettingsOpen}) } 
				>
					{ __( this.state.isSettingsOpen ? "hide Settings" : "show Settings" ) }
				</Button>
				{filterBtn}
			</div>
			<Collapse isOpen={this.state.isSettingsOpen} className="w-100">
				<div className="p-3 bg-light mt-2 border-bottom-dark">
					<div className="d-flex align-items-center">
						<div className="h-100 w-50 ">
							{__("Count elements by page:")}
						</div>
						<input
							type="number"
							className="form-control ml-2"
							value={this.state.count}
							onChange={this.onChangeCount}
						/>
					</div>
				</div>
			</Collapse>
			{filterBlock}
			{shifter}
			<Query query={query}>
				{
					({ loading, error, data, client}) =>
					{
						if( loading)
						{
							return <Loading/>;
						}
						if(data)
						{
							//console.log(data[this.props.query_name]);
							const collection = data[this.props.query_name];
							return collection && collection.length > 0
								?
								this.props.isList
									?
									this.do_list(collection, data)
									:
									this.do_table(collection, data)
								:
								this.do_table(collection, data)
						}
						if(error)
						{
							return <Callout intent={Intent.DANGER}>
								{ error.toString()}
							</Callout>
						}
					}
				}
			</Query>
		</Fragment>

	}
	do_list(data, full_data)
	{
		//console.log(data);
		let rows = data.map((e,i) =>
		{
			return <div className="row data-list input " key={i}>
				<div className="col col-md-12">
					<CategoryForm 
						{...e}
						editable={false}
						ID={e.id }
						data={e}	
						data_type={this.props.data_type}
						isOpen={ true } // for Yandex Maps
						isHiddenSave={true}
						isHiddenClose={true}
					/>
				</div>
			</div>
		});
		return <section>
			{rows}
		</section>
	}
	do_single_table(data, full_data)
	{
		let bb = false;
		for (var prop in this.state.checked)
			bb = bb || this.state.checked[prop];
		const contents = data && data.length > 0 
			? 
			<DataTableElements 
				count={data.length}
				posts={data}
				current={this.state.current}
				trColor={this.state.trColor}
				height={this.state.height}
				data_type={this.props.data_type}
				query_name = {this.props.query_name}
				query = {this.props.query}
				mutation_name={this.props.mutation_name}
				change_mutation={this.props.change_mutation}
				mutation_delete={this.props.mutation_delete}
				route={this.props.route}
				onCurrent={this.onCurrent}
				isNew={false}
				checked={this.state.checked}
				showAllChecked={this.showAllChecked}
			/>
			:
			<tr>
				<td colSpan="22">
					<Callout 
						icon=""
						className="p-4" 
					>
						{__( "No exists" )}
					</Callout>
				</td>
			</tr>
		
		return <Fragment>
			<div className="row pb-2">
				<div className={ "col-md-12 " + ( bb ? "" : "unvisibled" ) } >	
					<ButtonGroup minimal={false} >
						<Popover 
							popoverClassName={ Classes.POPOVER_CONTENT_SIZING } 
							interactionKind ={ PopoverInteractionKind.CLICK }
							position={ PopoverPosition.RIGHT }
							content ={
								<Button text={__("Delete")} onClick={this.onActionDelete} />
							}
							
						>
							<Button intent={Intent.DANGER}text={__("Delete")} className="px-3" icon="trash" />
						</Popover>
						<Popover 
							popoverClassName={ Classes.POPOVER_CONTENT_SIZING } 
							interactionKind ={ PopoverInteractionKind.CLICK }
							position={ PopoverPosition.RIGHT }
							content ={
								<Button text={__("Publish")} onClick={this.onActionShow} />
							}
							
						>
							<Button intent={Intent.PRIMARY} text={__("Publish")} className="px-4 " icon="eye-open"/>
						</Popover>
						<Popover 
							popoverClassName={ Classes.POPOVER_CONTENT_SIZING } 
							interactionKind ={ PopoverInteractionKind.CLICK }
							position={ PopoverPosition.RIGHT }
							content ={
								<Button text={__("Hide")} onClick={this.onActionHide} />
							}
							
						>
							<Button intent={Intent.WARNING} text={__("Hide")} className="px-4 " icon="eye-off"/>
						</Popover>
					</ButtonGroup>
				</div>
			</div>
			<div style={{width: "100%", overflow: "auto"}}>
			<table className="table table-striped mb-5">
				<thead>
					<Row
						i={-2}
						count={data ? data.length : 2}
						trColor={this.state.theadColor}
						data_type={this.props.data_type}
						query_name = {this.props.query_name}
						query = {this.props.query}
						mutation_name={this.props.mutation_name}
						change_mutation={this.props.change_mutation}
						mutation_delete={this.props.mutation_delete}
						isOpen={ this.state.current == -2 }
						onOpen={this.onCurrent}
						route={this.props.route}
						onAllChecked={this.onAllChecked}
						elem={{}}
						isNew={true}
						allChecked={ this.state.allChecked }
						custom_variables={this.props.custom_variables}
					/>
					{ this.addThead() }				
				</thead>
				{contents}
			</table>
			</div>
		</Fragment>
	}
	do_table(data, full_data={})
	{		
	
		const table_type =  layouts.schema[this.props.data_type].admin_data 
			?
			layouts.schema[this.props.data_type].admin_data.table_type
			:
			null;
		switch(table_type)
		{
			case "tab":
				
				return this.do_tab(data, layouts.schema[this.props.data_type].admin_data.tab_field );
			default:
				return this.do_single_table(data, full_data);
		}
	}
	do_tab( data, filter_field )
	{
		const tabs = [];
		data.forEach((e, i) =>
		{
			if( e[filter_field] && Array.isArray(e[filter_field]) && e[filter_field].length > 0)
			{
				let tb = tabs[e[filter_field][0].id];
				if(!tabs[e[filter_field][0].id])
				{
					tabs[e[filter_field][0].id]= {
						title: e[filter_field][0].post_title,
						content : []
					}
				}
				tabs[e[filter_field][0].id].content.push(e);
			}
		});
		console.log(tabs);
		const tab = tabs.map((e, i) => 
		{
			return <Tab 
				key={ i }
				id={ e.title } 
				title={ e.title }
				panel={ <div>
					{this.do_single_table(e.content)}
				</div> } 
			/>
		});
		return <Tabs vertical={true} onChange={this.handleTabChange} selectedTabId={this.state.tab}>
			{tab}
		</Tabs>;
	}
	handleTabChange = tab =>
	{
		this.setState({tab});
	}
	showAllChecked = ( checked ) =>
	{
		let a = 1;
		for(let i in checked)
		{
			a = a * checked[i];
		}
		this.setState({ checked, allChecked: a });
	}
	onAllChecked = allChecked =>
	{
		let checked = {};
		this.state.post.forEach(e => checked[e.id] = allChecked ? 1 : 0 );
		this.setState({ allChecked, checked });
	}
	onOpenNew = () => this.setState({ current: -2 });
	onCurrent = current => 
	{
		const { route, history, match} = this.props;
		this.setState({ current: current });
		//console.log( current  );
		let path;
		switch(current)
		{
			case -1:
				path = route;
				break;
			case -2:
				path = route + "/new";
				break;
			default:
				path = route + "/" + this.state.post[current].id;
				break;
		}
		history.push( path );
	}
	addThead()
	{
		return null;
	}
	onActionDelete = () =>
	{
		const l = Object.keys(this.state.checked);		
		if( l.length < 1 )
		{
			AppToaster.show({  
				intent: Intent.DANGER,
				icon: "tick", 
				message: "Select one or nmore elements. " 
			});
			return;
		}		
	}
	onActionHide = ()=>{

	}

	onSave = (state, id) =>
	{
		onSaveGql(state, id);

	}
	onDelete = id =>
	{
		console.log(id);
	}
	
	/*
	//	override methods
	*/
	clearFilter = () =>
	{
		this.setState({ filterSelected:{}, metaSelected: {} });
	}
	
	init(data)
	{
		this.form_component 	= data.form_component;
		this.meta		 		= data.meta;
		this.theadColor			= data.theadColor || "#2d74ab";
		//this.setState({ theadColor: this.theadColor	});
	}
	
	onPagi = n =>
	{
		this.setState({offset : n * this.state.count});
	}
	onChangeCount = evt =>
	{
		const value = evt.currentTarget.value;
		this.setState({count:value, offset:0});
	}
}
		
export default compose(
	withApollo,
	withRouter
)(DataTable);