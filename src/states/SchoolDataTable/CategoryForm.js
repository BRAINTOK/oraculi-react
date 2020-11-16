import React, {Component} from "react";

import {
	Intent, Tag,
	Button, ButtonGroup,
	Position, Popover, 
	InputGroup 
} from "@blueprintjs/core";


import {compose} from "recompose";
import { Query, withApollo } from "react-apollo";
import {withRouter} from "react-router";
import gql from "graphql-tag";

import FieldInput, {String, Link, ExtendedLink, DateTime, RGB, Geo, MultiSelect, Checkbox, Phone, Array, Boolean} from "../../layouts/FieldInput";
import {__} from "../../layouts/utilities/i18n";
import Loading from "../../layouts/utilities/Loading";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import {isCapability} from "../../layouts/user";
import { getFields, getVisibleValue} from "../../layouts/schema/ecosystem";
import drawForms from "../../layouts/FieldInput/drawForms";

class CategoryForm extends Component
{
	constructor(props)
	{
		super(props);
		//console.log( this.props.data )
		this.state = this.props.data;
	}
	componentWillReceiveProps ( nextProps )
	{
		if ( nextProps.isOpen != this.props.isOpen )
			this.setState({...this.props.data});
		if( nextProps.data != this.state ||  nextProps.isOpen != this.props.isOpen )
		{
			//if(this.props.isMain)
			//	console.log( nextProps.data )
			//this.setState({...this.props.data});
			this.setState({...nextProps.data });
		}
	}
	drawForms ( ) 
	{
		let fields = [];
		const _fields = getFields( this.props.data_type );
		
		for( let field in _fields )
		{
			if(
					field == "id"
				|| 	field == "admin_data"
				|| 	(isCapability(_fields[field].caps, ""))
			) 			
				continue;
				
			// console.log( _fields[ field ].demand );
			
			if( _fields[field].demand )
			{
				console.log( _fields[ field ].demand.value, this.state[_fields[ field ].demand.field ] ); 
				const demand = _fields[ field ].demand.value 
					&& Object.prototype.toString.call( _fields[ field ].demand.value) == "[object Array]" 
					?
					_fields[ field ].demand.value 
					: 
					[ _fields[ field ].demand.value ];
				if( demand.filter( ee => this.state[_fields[ field ].demand.field ] == ee ).length == 0 )
				{
					continue;
				}
			}
			const editable = typeof this.props.editable != "undefined" ? this.props.editable : _fields[field].editable;
			// добавляем данные для формирования "умной" ссылки, если в схеме указано, что она есть
			let external_link_data = { orig: {id:this.props.id}};
			if(_fields[field].external_state)
			{
				//добавляем в ссылку данные дочерних элементов объекта, указанные в схеме
				for(let es in  _fields[field].external_state)
				{
					external_link_data[es] = {
						component: _fields[es].component,
						...this.props[es]
					};
				}
			}
			const compp = _fields[field].component;
			//console.log(field, compp, _fields);
			//console.log(compp, field, this.state[field], _fields);
			const visibled_value = getVisibleValue(compp);

			if( !_fields[field].hidden )
				fields.push(
					<FieldInput
						field={ field }
						key={ field }
						id={this.props.ID}
						list={this.props.list}
						addList={ this.props.addList ? this.props.addList[field]: null }
						on={this.on}
						onChange={this.on}
						{..._fields[field]}
						editable = {editable}
						value={ this.state[field] }
						vertical={ this.props.vertical }
						visibled_value={ visibled_value }
						external_link_data={external_link_data}
					/>
				);
		};
		return fields;
	}
	getDelBtn () 
	{
		return this.props.isNew || this.props.isHiddenDelete 
			? 
			null 
			: 
			<Popover
				position={Position.TOP_LEFT}
				content={
					<div className="square p-3">
						<div>
							<p>
								{__("Are you realy want delete?")}
							</p>
							<ButtonGroup className="p-2 tex-right">
								<Button
									intent={Intent.DANGER}
									text={__("Yes")}
									onClick={this.onDelete}
								/>
							</ButtonGroup>
						</div>						
					</div>						
				}
			>
				<Button
					intent={Intent.DANGER}
					text={__("Delete")}
				/>
			</Popover>
	}
	render()
	{		
		//if(this.props.data.isMain)	
		//	console.log(this.props.data.themes);
		return <div id={this.props.htmlID} className="category_card" style={{maxWidth: "100vw"}}>			
			{
				initArea( 
					"before-categoty-form", 
					{ ...this.props, parent_route: this.props.match.url, on:this.on, onRefresh:this.props.onRefresh } 
				) 
			}		
			{
				initArea(
					"categoty-form", 
					{ ...this.props, parent_route: this.props.match.url, on:this.on, onRefresh:this.props.onRefresh  },
					this.drawForms()
				) 
			}
						
			{
				initArea( 
					"after-categoty-form", 
					{ ...this.props, parent_route: this.props.match.url, on:this.on, onRefresh:this.props.onRefresh  } 
				) 
			}
			<div className="row">
				<div className="col-md-3">
				
				</div>
				<div className="col-md-7 ">
					<ButtonGroup className="p-2 tex-right">
					{
						this.props.isHiddenSave ? null :
						<Button
							text={this.props.saveLabel ? this.props.saveLabel : __("Update")}
							intent={this.props.intent}
							onClick={this.onSave}
						/>
					}
					{this.getDelBtn()}
					{
						this.props.isHiddenClose ? null :
						<Button
							text={__("Close")}
							onClick={this.props.onClose}
						/>
					}
					</ButtonGroup>
				</div>
			</div>			
		</div>
	}
	title = evt =>
	{
		const txt = evt.currentTarget.value;
		this.props.onChange("title", txt, this.props.ID);
		this.setState({title : txt});
	}
	onSave = () =>
	{		
		console.group('CategoryForm.onSave');
		let state = {}, stateF;
		const _fields = getFields(this.props.data_type );
		for( let field in _fields )
		{
			if(_fields[field].type)
			{
				if(_fields[field].type == "external")
				{
					//console.log(field, this.state[ field ]);
					state[ field ] = this.state[ field ] ? this.state[ field ].id : null;
				}
				else if(_fields[field].type == "array" && _fields[field].component)
				{
					//console.log( field, this.state[ field  ] );
					stateF = this.state[ field ] 
						? 
						this.state[ field ].map(e => { return e.id; } ) 
						: 
						[];
					state[ field ] = stateF;
					//console.log( field, state[ field ] );
				}
				else
				{
					//console.log(field, this.state[ field ]);
					state[ field ] = this.state[ field ];
				}
			}
			else
			{
				//console.log(field, this.state[ field ]);
				state[ field ] = this.state[ field ];
			}
		} 
		  
		//console.log(_fields);
		console.log( state );
		//console.log(this.props.ID);
		console.groupEnd(); 
		// return;
		this.props.onSave( state, this.props.ID );
	}
	onDelete =() =>
	{
		this.props.onDelete( this.props.ID );
	}
	on = (value, field, title, changeAnoverFields = {} ) =>
	{
		console.group('CategoryForm.on');
		console.log(value);
		console.log(field);
		console.log( changeAnoverFields );
		var obj = {}
		for(var f in changeAnoverFields)
		{
			obj[f] = changeAnoverFields[f];
		}
		obj[field] = value;
		this.setState(obj, function()
		{

			if(this.props.on){
				this.props.on(value, field, this.props.ID);
			}

			console.log( obj );
		});
		console.groupEnd();
		
	}

}
export default compose(
	withApollo,
	withRouter
)(CategoryForm);