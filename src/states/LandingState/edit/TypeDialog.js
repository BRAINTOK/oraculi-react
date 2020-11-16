import React, {Component, Fragment} from "react";
import {__} from "../../../layouts/utilities/i18n";
import LayoutIcon from "../../../layouts/LayoutIcon"; 
import {components} from "../Section";
import InputForm from "./InputForm";
import FlaotDettingDialog from "./FlaotDettingDialog";
import matrix from "../data/matrix";
import FieldInput from "../../../layouts/FieldInput";
import {Button, ButtonGroup, Intent, Popover, Position, Tabs, Tab} from "@blueprintjs/core";


class TypeDialog extends Component
{
	state = {
		...this.props,
		current_type: this.props.type,
		tab:"types"
	}
	
	
	render()
	{
		// console.log( this.state );
		const hiddenButton = this.state.is_hidden
			?			
			<Button
				intent={Intent.SUCCESS}
				className="mx-1"
				icon="eye-open"
				onClick={ () => this.props.onHide( this.state.menu.id, 0 ) }
			>
				{__("Show section for users")}
			</Button>
			:
			<Button
				intent={Intent.DANGER}
				className="mx-1"
				icon="eye-off"
				onClick={ () => this.props.onHide( this.state.menu.id, 1 ) }
			>
				{__("Hide section for users")}
			</Button>
		return  <div className="p-0">
			<Tabs
				onChange={ this.onTab }
				animate={ false }
				id="TabsType"
				key={ "horizontal" } 
				vertical={ false }
				className="tab-light-head"
			>
				<Tab id="types" title={__("Type")} panel={this.types()} />
				<Tab id="title" title={__("Title")} panel={this.title()} />
				<Tab id="composition" title={__("Composition")} panel={this.composition()} />
				<Tab 
					id="prm" 
					title={ this.state.current_type } 
					panel={ 
						<InputForm 
							{ ...this.state }
							source={ this.state.current_type }
							id={ this.state.id }
							data={this.state.data}
							sourceType="section"
							on={(value, field) => this.onField(value, field, "data")}
						/>
					} 
				/>
				<Tab id="floats" title={__("Floats")} panel={this.floats()} />
				<Tab id="html" title={__("Style")} panel={this.html()} />
				<Tab id="menu" title={__("Menu")} panel={this.menu()} />
			</Tabs>
			<div className="layout-simple-center p-2 flex-row">
				<Button intent={Intent.DANGER} onClick={this.onClick}>
					{__("Update section")}
				</Button>
				{hiddenButton}				
				<Button
					icon="trash"
					intent={Intent.DANGER} 
					onClick={ () => this.props.onRnv( this.state.id ) }
				>
					{__( "Delete Section" )}
				</Button> 			
				<Button
					icon="cross"
					intent={Intent.DANGER} 
					onClick={ () => this.props.onClose( ) }
					title={__( "Close" )}
					className="ml-1"
				/> 
			</div>
		</div>
	}
	
	onTab = navbarTabId => this.setState({ navbarTabId });
	
	title()
	{
		
		return <div className="p-4"> 
			<div className="layout-simple-center p-2 title"> 
				{__("Title")}
			</div> 
			<InputForm 
				{ ...this.state }
				source={ "title" }
				id={ this.state.id }
				data={ this.state.title }
				sourceType="title"
				on={( value, field ) => this.onField(value, field, "title")}
			/>
			<div className="layout-simple-center p-2 title"> 
				{ __("Descriptions") }
			</div>
			<InputForm 
				{ ...this.state }
				source={ "descriptions" }
				id={ this.state.id }
				data={ this.state.descriptions }
				sourceType="descriptions"
				on={( value, field ) => this.onField(value, field, "descriptions")}
			/>
		</div>
		
		/*
		//console.log(this.state.title );
		return <div className="p-4"> 
			<div className="layout-simple-center p-2"> 
				{__("Title")}
			</div>
			{
				Object.entries( matrix.title )
				.map((e, i) => 
				{
					//console.log( e, this.state.title[ e[0] ], e[1].type );
					const val = e[1] ? e[1] : {};
					return e[1].hidden 
						?
						null
						:
						<FieldInput
							field={ e[0] }
							key={ e[0] }
							title={ val.title }
							type={ val.type }
							id={ this.state.ID } 
							on={ (value, field) => this.onField(value, field, "title") }
							{ ...matrix.title[ e[0] ] }
							onChange={ (value, field) => this.onField(value, field, "title") }
							editable = { true }
							value={ this.state.title ? this.state.title[ e[0] ] : e[0] }
							values={ val.values }
							vertical={ false }
						/>
				})
			}
			<div className="layout-simple-center p-2"> 
				{ __("Descriptions") }
			</div>
			{
				Object.entries( matrix.descriptions )
				.map((e, i) => 
				{ 
					const val = e[1] ? e[1] : {};
					return e[1].hidden 
						?
						null
						:
						<FieldInput
							field={ e[0] }
							key={ e[0] }
							title={ val.title }
							type={ val.type }
							id={ this.state.ID } 
							on={ (value, field) => this.onField(value, field, "descriptions") }
							{ ...matrix.title[ e[0] ] }
							onChange={ (value, field) => this.onField(value, field, "descriptions") }
							editable = { true }
							value={ this.state.descriptions ? this.state.descriptions[ e[0] ] : e[0] }
							values={ val.values }
							vertical={ false }
						/>
				})
			}
		</div>
		*/
	}
	types()
	{
		/**/
		let btns = [];
		for(let c in components)
		{
			let cl = c == this.state.current_type ? "active " : " " ;
			const ccl = c == this.state.type ? " text-danger " : " ";
			btns.push( <div 
				key={c} 
				type={c}
				className={"l-icon " + cl} 
				onClick={this.onTypeSwitch}
			> 
				<div>
					<LayoutIcon
						src={ components[ c ].icon }
						className="layout-icon"
					/>
					<div className={ccl}>
						{ __(components[ c ].title) }
					</div>
				</div>
			</div> ) 
		}
		return <div className="p-4">
			{ btns } 
		</div>
	}
	html()
	{ 
		//console.log( this.state );
		return <div className="p-4"> 
			<Tabs
				onChange={ this.onTab }
				animate={ false }
				id={ "tabs_" + this.state.id }
				key={ this.state.id } 
				vertical={ true } 
				className="tab-params "
			>
				<Tab
					id="style"
					title = <div className={ "hint hint--left" } data-hint={ __( "Basic" ) } > 
							<i className={ "fas fa-palette fa-2x" }/>
							<div>{ __( "Basic" ) }</div>
						</div>
					panel={
						<Fragment>
							<FieldInput
								field={ "class" }
								key={ "css-class" }
								title={ "css-class" }
								type="Style"
								id={ this.state.id } 
								on={ (value, field) => this.onClassName(value ) } 
								onChange={ (value, field) => this.onClassName(value ) }
								editable = { true }
								value={ this.state.class_name }
								vertical={ false }
							/>	
							<FieldInput
								field={ "style" }
								key={ "css-style" }
								title={ "css-style" }
								{...{type: "landing_object", visualization: "landing-object", landing_object: "Style"}}
								id={ this.state.id } 
								{ ...matrix.Style}
								on={ this.onStyle }
								onChange={ this.onStyle }
								editable = { true }
								value={ this.state.style }
								vertical={ false }
							/>					
						</Fragment>
					}
				/>
				<Tab
					id="bg"
					title = <div className={ "hint hint--left" } data-hint={ __( "Smart background" ) }>
							<i className={ "fas fa-object-ungroup fa-2x " }  />
							<div>{ __( "Smart background" ) }</div>
						</div>
					panel={
						Object.entries( matrix.Background )
							.map((e, i) => 
							{
								//console.log( e, this.state.menu, e[1].type );
								const val = e[1] ? e[1] : {};
								return e[1].hidden 
									?
									null
									:
									<FieldInput
										field={ e[0] }
										key={ e[0] }
										title={ val.title }
										type={ val.type }
										id={ this.state.ID } 
										on={ (value, field) => this.onField(value, field, "background") }
										{ ...matrix.Background[ e[0] ] }
										onChange={ (value, field) => this.onField(value, field, "background") }
										editable = { true }
										value={ this.state.background ? this.state.background[ e[0] ] : e[0] } 
										values={ val.values }
										vertical={ false }
									/>
							})	
					}
				/>
				<Tab
					id="lazy"
					title = <div className={ "hint hint--left" }  data-hint={ __( "Lazy" ) }>
							<i className={ "fas fa-video fa-2x" } />
							<div>{ __( "Lazy" ) }</div>
						</div>
					panel={
						
						<Fragment>
							<FieldInput
								field={ "lasy_load_type" }
								key={ "lasy_load_type" }
								title={ "Lazy load animation type" } 
								id={ this.state.id } 
								on={ (value, field) => this.onField(value, field, "lasy_load_type") } 
								onChange={ (value, field) => this.onField(value, field, "lasy_load_type") }
								editable = { true }
								value={ this.state.lasy_load_type }
								vertical={ false }
							/>	
							<FieldInput
								field={ "lasy_load_delay" }
								key={ "lasy_load_delay" }
								title={ "Lazy load delay" } 
								type={"number"}
								id={ this.state.id }  
								on={(value, field) => this.onField(value, field, "lasy_load_delay") }
								onChange={ (value, field) => this.onField(value, field, "lasy_load_delay") }
								editable = { true }
								value={ this.state.lasy_load_delay }
								vertical={ false }
							/>					
						</Fragment>	
					}
				/>
			</Tabs> 
		</div>
	}
	floats()
	{
		return <div className="p-4"> 
			<div className="layout-simple-center p-2"> 
				<FlaotDettingDialog {...this.state} onUpdate={this.onUpdateFloat} />
			</div>
		</div>
	}
	menu()
	{
		const btns = Object.entries( matrix.Menu )
			.map((e, i) => 
			{
				//console.log( e, this.state.menu, e[1].type );
				const val = e[1] ? e[1] : {};
				return e[1].hidden 
					?
					null
					:
					<FieldInput
						field={ e[0] }
						key={ e[0] }
						title={ val.title }
						type={ val.type }
						id={ this.state.ID } 
						on={ (value, field) => this.onField(value, field, "menu") }
						{ ...matrix.Menu[ e[0] ] }
						onChange={ (value, field) => this.onField(value, field, "menu") }
						editable = { true }
						value={ 
							this.state.menu 
								? 
								this.state.menu[ e[0] ] 
								: 
								e[0] 
						}
						values={ val.values }
						vertical={ false }
					/>
			})
		return <div className="p-4"> 
			{ btns }
		</div>
	}
	composition()
	{
		
		return <div className="p-4"> 
		{
			Object.entries( matrix.Composition )
				.map((e, i) => 
				{
					const is_demand = e[1].demand
						?
						(
							Array.isArray( e[1].demand.value )	
								?
								e[1].demand.value
								:
								[ e[1].demand.value ]
						)
							.filter( ee => 
							{
								/*
								console.log( 
									Array.isArray( e[1].demand.value )	
										?
										e[1].demand.value
										:
										[ e[1].demand.value ],
									ee, 
									this.state.composition[ e[1].demand.field ], 
									ee == this.state.composition[ e[1].demand.field ] 
								);
								*/
								return ee == this.state.composition[ e[1].demand.field ];
							})
								.length == 0
						:
						false;
					return e[1].hidden || is_demand					
						?
						null
						:
						<FieldInput
							field={ e[0] }
							key={ e[0] }
							title={ e[1].title }
							type={ e[1].type }
							id={ this.state.ID } 
							on={ (value, field) => this.onColumnCount(value, field, "composition") }
							{ ...matrix.Composition[ e[0] ] }
							onChange={ (value, field) => this.onColumnCount(value, field, "composition") }
							editable = { true }
							value={ this.state.composition[ e[0] ] }
							values={ e[1].values }
							vertical={ false }
						/>
				})
		}
		</div>
	}
	prm()
	{
		
	}
	onStyle = val =>
	{
		//console.log( val );
		this.setState({ style: val });
	}
	onClassName = value  =>
	{
		this.setState( { class_name : value } );
	}
	
	onTypeSwitch = evt =>
	{
		const current_type = evt.currentTarget.getAttribute("type");
		let data = {};
		if(matrix[current_type].default)
		{
			data = {...matrix[current_type].default};
			delete data.hidden;
		}
		//console.log( data, current_type );
		this.setState({data, current_type, is_change_type_enbl : current_type != this.state.type });
	}
	onClick = () =>
	{
		//console.log( this.state.current_type, this.state  );
		//this.setState({});
		this.props.onChange( this.state.current_type, this.state );
	}
	on = ( value, field ) =>
	{
		//console.log( value,  field );
	}
	onColumnCount = ( value,  field, block ) =>
	{
		//console.log( value, field, block );
		let state = {...this.state};
		if(!state[block])
			state[block] = {};
		state[block][field] = value;
		console.log( state )
		this.setState( state );
	}
	onField = ( value,  field, block ) =>
	{
		//console.log( value, field, block );
		let state = {...this.state};
		if(!state[block])
			state[block] = {};
		state[block][field] = value;
		//console.log( state );
		this.setState( state );
	}
	onUpdateFloat= (data, float_id) =>
	{
		this.props.onUpdateFloat(data, float_id);
	}
}
export default TypeDialog;