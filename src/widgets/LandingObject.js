import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import matrix from "../states/LandingState/data/matrix";
import { Button, Intent, Icon, Dialog, Tag, Collapse, Slider, MultiSlider, ButtonGroup } from "@blueprintjs/core";
import FieldInput from "../layouts/FieldInput";
import Columns from "./landingObject/Columns";
import Padding from "./landingObject/Padding";
import Margin from "./landingObject/Margin";
import Border from "./landingObject/Border";
import SectionButton from "./landingObject/SectionButton";
import ContanctFormFieldButton from "./landingObject/ContanctFormFieldButton";
import YandexMapPlaceBottom from "./landingObject/YandexMapPlaceBottom";
import CardButton from "./landingObject/CardButton";
import CardField from "./landingObject/CardField";
import Composition from "./landingObject/Composition";
import Style from "./landingObject/Style";
import {getVisibleValue} from "../layouts/template";
import {getTypeSelector} from "../layouts/schema";
import TypeDialog from "../states/LandingState/edit/TypeDialog";
import InputForm from "../states/LandingState/edit/InputForm";
import DataContext from "../states/LandingState/DataContext";
import {getDefault} from "../states/LandingState/Section";

class LandingObject extends Component
{
	state = {
		...this.props,
		isDialog : false,
		object: {}
	}
	
	render()
	{
		//console.log( this.props );
		const { field, title, description } = this.props;
		const { value } = this.state;
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-9 layout-data";
		
		const o =  this.props.type == "landing_object"
			?
			<div className="row dat" row_data={ field }>
				<div className={col1}>
					{__( this.props.title )}
				</div>
				<div className={col2} style={{ position : "relative" }}>
					{ this.formInput() }
				</div>
			</div>
			:
			null;
		return <Fragment>
			{o}
			<Dialog
				isOpen={ this.state.isDialog }
				onClose={ this.onDialog }
				title={ __("Parameters") }
			>
				{ this.dialogContent() }
			</Dialog>
		</Fragment>
	}
	
	formInput()
	{
		const { value } = this.state;
		//console.log( value );
		switch(this.props.kind)
		{
			case "array":
				switch( this.props.landing_object )
				{
					case "ColumnsProportia": 
						// console.log( Array.isArray( value ) );
						// console.log(this.state);
						let _value = value;
						if( !Array.isArray( _value ) )
						{
							_value = [];
							let columnsC = this.state.origin && this.state.origin.composition
								?
								this.state.origin.composition.columns
								:
								1;
							for( var __i=0 ;__i < columnsC; __i++ )
							{
								_value.push( 100 / columnsC);
							}
						}
						let pr = 0;
						let fields = [];
						const handles = _value.map(
							(e, i) =>
							{
								if(i == _value.length - 1) 
									return null;
								const m = <MultiSlider.Handle 
									key={i}
									value={pr + e} 
									type="end2" 
									intentAfter={Intent.PRIMARY} 
								/>
								pr += e;
								fields.push(
									<input	
										type="number"
										key={i}
										className="input dark m-1 py-2 w_45"
										value={ parseInt( e ) }
										onChange={this.onMultiInput}
									/>
								)
								return m;
							}
						);
						return <div className="w-100"> 
							<MultiSlider
								min={0}
								max={100}
								stepSize={.1}
								labelStepSize={10}
								onChange={this.onMulti} 
								vertical={false}
							>
								<MultiSlider.Handle value={0} type="start" intentAfter={Intent.DANGER} />
								{ handles }
								<MultiSlider.Handle value={100} type="end" intentAfter={Intent.PRIMARY} />
							</MultiSlider>
							<div className="d-flex">
								{ fields }
							</div>
						</div>
					case "ProportiaInt":  
						return <div className="w-100">
							<div className="d-flex justify-content-between">
								<Tag> {__("Title")} </Tag>
								<Tag> {__("Content")} </Tag>
							</div>
							<Slider
								min={0}
								max={100}
								stepSize={1}
								labelStepSize={20}
								onChange={this.onSlider}
								value={ Array.isArray(value) ? value[0] : value }
								vertical={false}
							/>
						</div>
					default:
						const btns = Array.isArray(value) 
							?
							value.map((e, i) =>
							{
								let label;
								if(this.state.visibled_value)
								{
									let tt = getVisibleValue(e, this.state.visibled_value);
									//console.log(e, this.state, tt);
									label = tt && tt.length > 0 ? tt : i;
								}
								else
								{
									label = i;
								}
								switch(this.props.landing_object)
								{
									case "section":
										return <SectionButton
											key={i} 
											eid={e.id} 
											object={e}
											onClick={ 
												object => this.onSubDialog({ 
													...object, 
													landing_type:this.props.landing_object 
												}) 
											}
										/>
									case "ContanctFormField":
										return <ContanctFormFieldButton 
											key={ i }
											i={ i } 
											object={e}
											onClose={ this.onCFBClose }
											onChange={ this.onCFForm } 
										/>
									case "YandexMapPlace":
										return <YandexMapPlaceBottom 
											key={ i }
											i={ i } 
											object={e}
											onClose={this.onYandexPlaceClose}
											onClick={ 
												object => console.log(object)
											}
										/>
									case "Card" :
										return <CardButton
											key={i} 
											i={i} 
											object={e}
											onClick={ 
												object => this.onSubDialog({ 
													object, 
													landing_type : this.props.landing_object,
													i : i	
												}) 
											}
										/>
									case "CardField" :
										return <CardField
											key={ i }
											i={ i } 
											object={e}
											onClose={ this.onCFBClose }
											onChange={ this.onCFForm } 
										/>
									case "MotivatonElement":
									default:
										return <Button 
											key={i} 
											i={i} 
											eid={e.id} 
											onClick={ 
												evt => this.onSubDialog({ 
													...e, 
													landing_type : this.props.landing_object,
													i : parseInt( evt.currentTarget.getAttribute( "i" ) )			
												}) 
											}
										>
											{ label }
										</Button>
								}
								
							})
							:
							null;
						return <div className="d-flex flex-wrap w-100" >
							{ btns }
							<Button 
								icon="plus"
								className=" " 
								onClick={ this.onAddArray }
							/>
						</div>
				}
			default:
				switch( this.props.landing_object )
				{
					case "Coordinate": 
						//console.log( this.state.field,  this.state );	
						let dst;
						switch(this.state.field)
						{
							case "x":
								dst = <div>
									<label className="_check_ mr-2 w_80" htmlFor={"dst_x1_" + this.state.id} >
										<input
											type="radio"
											name={"dst_x_" + this.state.id}
											id={"dst_x1_" + this.state.id} 
											checked={ this.state.value.dst=="L" }
											value={"L"}
											onClick={ evt => this.onCoordinate(evt, "dst" ) }
										/>
										{__("from left")}
									</label>
									<label className="_check_ mr-2 w_80" htmlFor={"dst_x2_" + this.state.id} >
										<input
											type="radio"
											name={"dst_x_" + this.state.id}
											id={"dst_x2_" + this.state.id} 
											checked={ this.state.value.dst=="R" }
											value={"R"}
											onClick={ evt => this.onCoordinate(evt, "dst" ) }
										/>
										{__("from right")}
									</label>
								</div>
								break;
							case "y":
								dst = <div>
									<label className="_check_ mr-2 w_80" htmlFor={"dst_yt_" + this.state.id} >
										<input
											type="radio"
											name={"dst_y_" + this.state.id}
											id={"dst_yt_" + this.state.id}
											className=""
											checked={ this.state.value.dst=="T" }
											value={"T"}
											onClick={ evt => this.onCoordinate(evt, "dst" ) }
										/>
										{__("from top")}
									</label>
									<label className="_check_ mr-2 w_80" htmlFor={"dst_yb_" + this.state.id} >
										<input
											type="radio"
											name={"dst_y_" + this.state.id}
											id={"dst_yb_" + this.state.id}
											className=""
											checked={ this.state.value.dst=="B" }
											value={"B"}
											onClick={ evt => this.onCoordinate(evt, "dst") }
										/>
										{__("from bottom")}
									</label>
								</div>								
								break;
							default:
								
								break;
						}
						return <div className="d-flex align-items-center">
							<input	
								type="number"
								step=".2"
								value={this.state.value.value}
								field="value"
								className="input dark m-1 text-right w_80"
								onChange={ evt => this.onCoordinate( evt, "value" ) }
							/>
							<select 
								className="input dark m-1 mr-2"
								value={this.state.value.ei} 
								onChange={ evt => this.onCoordinate( evt, "ei" ) }
							>
								<option value="px" >px</option>
								<option value="%"  >%</option>
							</select>
							{dst}
						</div>
					case "ColumnsCount":  
						return <Columns {...this.state} on={this.on} />;
					case "Padding":  
						return <Padding {...this.state} on={this.on} />;
					case "Margin":  
						return <Margin {...this.state} on={this.on} />;
					case "Border":  
						return <Border {...this.state} on={this.on} />;
					case "Style":					
						// console.log( this.state );
						return <Style  {...this.state} on={this.onStyle}  />; 
					case "SchemaType":
						return getTypeSelector({
							onChange : evt => this.on( this.props.field, evt.currentTarget.value ),
							className : " input dark ",
							selected : this.state.value
						});
					case "Composition":
						return <Composition
							 {...this.state} on={this.onComposition} 
						/>
					case "Columns":
						return getTypeSelector({
							onChange : evt => this.on( this.props.field, evt.currentTarget.value ),
							className : " input dark ",
							selected : this.state.value
						});
					case "Section":
					default:
						return <div>
							{"COMPONENT " + this.props.landing_object}
						</div>
				}
		}
	} 
	dialogContent = () =>
	{
		let value;
		switch(this.state.object.landing_type)
		{
			case "section":
				return <TypeDialog 
					{...this.state.object} 
					onChange={this.onSection} 
					onRnv={this.onRnv}
					onClose={this.onDialog}
				/>
			case "Card":
				value = typeof this.state.value != "undefined" ? this.state.value : [];
				return <div className="p-4" >				
					<InputForm
						{ ...value[ this.state.object.i ] }
						source={ this.state.object.landing_type }
						id={ this.state.object.i }
						data={ value[ this.state.object.i ] }
						sourceType={ this.state.object.landing_type }
						on={ this.onDialogEdit }
					/>
					<div className="d-flex justify-content-center">
						<ButtonGroup className="p-2">
							<Button 
								icon="cog" 
								intent={Intent.NONE} 
								onClick={ this.onDialogUpdate }
							>
								{ __( "Edit" ) }
							</Button>
							<Button 
								icon="cross" 
								intent={Intent.DANGER} 
								onClick={ this.onRemoveElement }
							>
								{ __( "Delete" ) }
							</Button>							
						</ButtonGroup>
					</div>
				</div>
			case "TestanomialMember":
			case "MotivatonElement":
			default:
				value = typeof this.state.value != "undefined" ? this.state.value : [];
				//console.log( this.state );
				return <div className="p-4" >
					<InputForm
						{ ...value[ this.state.object.i ] }
						source={ this.state.object.landing_type }
						id={ this.state.object.i }
						data={ value[ this.state.object.i ] }
						sourceType={ this.state.object.landing_type }
						on={ this.onDialogEdit }
					/>
					<div className="d-flex justify-content-center">
						<ButtonGroup className="p-2">
							<Button 
								icon="cog" 
								intent={Intent.NONE} 
								onClick={ this.onDialogUpdate }
							>
								{ __( "Edit" ) }
							</Button>
							<Button 
								icon="cross" 
								intent={Intent.DANGER} 
								onClick={ this.onRemoveElement }
							>
								{ __( "Delete" ) }
							</Button>
							
						</ButtonGroup>
					</div>
				</div>
		}
	}
	onDialogEdit = ( value, field ) =>
	{
		let v = [...this.state.value];
		let object = v[this.state.object.i];
		//console.log( value, field, v );
		object[field] = value;
		v[this.state.object.i] = { ...v[this.state.object.i], field : value };
		this.setState({value : v }) 
		
	}
	onDialogUpdate = evt =>
	{
		this.on(this.state.field, this.state.value);
	}
	onRemoveElement = evt =>
	{
		let value = [...this.state.value];
		value.splice(this.state.object.i, 1);
		this.setState({value}) 
		this.on(this.state.field, value);
	}
	onAddArray = evt =>
	{
		//console.log( this.state.value,  this.state.field, this.state.landing_object, this.state );
		const mt 	= matrix[ this.state.landing_object ];
		const dflt 	= mt.default ? mt.default : {};
		let obj 	= { };
		Object.keys( mt )
			.filter( e => !mt[e].hidden )
				.forEach( ( e, i ) =>
				{
					//console.log( e, mt[e] ); 
					let el;
					switch( mt[e].type )
					{
						case "int":
						case "number":
						case "slider":
							el =  dflt[e] ? dflt[e] : 0;
							break;
						case "boolean":
							el =  dflt[e] ? dflt[e] : false;
							break;
						case "geo":
						case "array":
							el 	= dflt[e] ? dflt[e] : [];
							break;
						case "checkbox":
						case "string":
						case "media":
						case "color":
						case "url":
						case "text":
						case "date":
							el 	= dflt[e] ? dflt[e] : '';
							if(e == "id" && this.state.landing_object == "section")
							{
								el = DataContext.getMaxSectionID( true );
							}
							break;
						case "radio":
						case "checkbox":
							
							break;
						default:
						case "landing_object":
							let mtt = matrix[ mt[e].landing_object ];
							el =  dflt[e] ? dflt[e] : {};
							//console.log( mtt, e, el, mt[e] );
							if(!mtt || dflt[e]) break;
							Object.keys( mtt )
								.filter( ee => !mtt[ee].hidden )
									.forEach( ( ee, i ) =>
									{
										//console.log( ee, mtt[ee] ); 
										let ell;
										switch( mtt[ee].type )
										{
											case "int":
											case "number":
											case "slider":
												ell = 0;
												break;
											case "boolean":
												ell = false;
												break;
											case "checkbox":
											case "array":
											case "string":
											case "media":
											case "color":
											case "url":
											case "text":
											case "date":
												ell = '';
												break;
											case "radio":
											case "checkbox":
												
												break;
											default:
											case "landing_object":
												//console.log( ee, mtt[ee].landing_object, matrix[ mtt[ee].landing_object ] );
												ell = mtt[ee].kind == "array" 
													? 
													[]
													: 
													{};
												break;
										}
										el[ee] = ell;
									} );
							
							break;
					}
					obj[e] = el;
				} );
				
		if( this.state.landing_object == "section" )
		{
			obj = getDefault();
			obj.id = DataContext.getMaxSectionID( true );
		}
					
		let value = Array.isArray(this.state.value)
			? 
			this.state.value
			: 
			[];
		value.push( { ...obj } );
		//console.log( value );
		this.setState({value});
		this.on(this.state.field, value);
	}
	onMultiInput = evt =>
	{
		
	}
	onMulti = data =>
	{
		//console.log( data );
		let value = [], vv = 0;
		data.forEach((e,i) =>
		{
			if(e != 0)
			{
				const v = e - vv;
				vv += v;
				value.push(v);
			}
		});
		//value.push(100 - vv); 
		//console.log( vv, value );
		this.setState({ value })
		this.on(this.state.field, value);
	}
	on = (data, field) =>
	{
		//console.log(data, field);
		this.props.on(field, data)
		this.setState({ isDialog : false });
	}
	onDialog = evt =>
	{
		this.setState({ isDialog : !this.state.isDialog });
	}
	onCFForm = (data, i) => 
	{
		let value = [ ...this.state.value ];
		value[i] = data;
		this.setState({ value });
		this.on( this.state.field, value );
	}
	onCFBClose = eid =>
	{
		let value = [ ...this.state.value ];
		// console.log( eid, value );
		value.splice(eid, 1); 
		// console.log( "onCFBClose", value );
		this.props.on( value, this.state.field );
	}
	onSubDialog = ( object, type, i ) =>
	{
		// console.log( object );
		this.setState({ object, isDialog:true, current_element:i })
	}
	onSection = (type, data ) =>
	{
		//console.log( "on Section Edit", type, data );
		let value = [ ...this.state.value ];
		//console.log( value );
		value = Array.isArray( value ) ? value : [];
		value.forEach( (e, i) =>
		{
			//console.log( e.id, data.id );
			if(e.id == data.id)
			{
				let dt = {...data, type};
				delete dt.current_type;
				delete dt.is_change_type_enbl;
				delete dt.navbarTabId;
				delete dt.tab;
				delete dt.onChange;
				value[i] = dt;
			}
		});
		if( value.length == 0 )
		{
			value[0] = {...data, type};
		}
		console.log( "on Section Edit", value );
		this.props.on( value );
		this.setState({ isDialog: false })
	}
	onRnv = id =>
	{
		let value = [ ...this.state.value ];
		//console.log( value );
		value = Array.isArray( value ) ? value : [];
		value.forEach( (e, i) =>
		{
			//console.log( e.id, data.id );
			if(e.id == id)
			{
				value.splice( i, 1 );
			}
		});
		console.log( "on Section Delete", value );
		this.props.on( value );
		this.setState({ isDialog: false })
	}
	onStyle = val =>
	{
		this.setState( { value : val });
		this.props.on( val, this.state.field );
	}
	onCoordinate = (evt, field) =>
	{
		let value = { ...this.state.value };
		value[field] = evt.currentTarget.value;
		//console.log(value);
		this.setState( { value });
		this.props.on(value);
	}
	onComposition = (value, field) =>
	{
		//let value = { ...this.state.value };
		//value[field] = evt.currentTarget.value;
		console.log( value, field );
		//this.setState( { value });
		//this.props.on(value);
	}
}
export default LandingObject;

export function getStyle(style)
{
	
}