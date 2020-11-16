import React, {Component, Fragment} from "react";
import { __ } from "../../../layouts/utilities/i18n";
import { isRole } from "../../../layouts/user";
import { Button, Intent, Icon, Dialog, Tabs, Tab } from "@blueprintjs/core";
import DataContext from "../DataContext";
import matrix from "../data/matrix";
import FieldInput from "../../../layouts/FieldInput";
import {getVisibleValue} from "../../../layouts/template";

class InputForm extends Component
{
	state = {
		...this.props
	}
	componentDidUpdate(nextProps)
	{
		if(nextProps.source != this.state.source)
		{
			this.setState({source: nextProps.source});
		}
		if(nextProps.id != this.state.id)
		{
			this.setState({id: nextProps.id});
		}
		if(nextProps.data != this.state.data)
		{
			this.setState({data: nextProps.data});
		}
	}
	render()
	{
		let ttabs = {}, tabTitles = {};
		for(let m in matrix[this.state.source])
		{ 
			const mtrxCell = matrix[this.state.source][m]; 
			let ttb = mtrxCell.tab;
			let ttbIcon = mtrxCell.tab_icon;
			if( !ttb )
			{
				ttb 	= "BasicSettings"
				ttbIcon	= "fas fa-cog";
			}
			if( !ttabs[ ttb ] )
			{
				ttabs[ ttb ] = []; 
			}
			if( !tabTitles[ ttb ] )
			{
				tabTitles[ ttb ] = ttbIcon; 
			}
			
			if( mtrxCell.hidden ) continue;
			
			const visibled_value = mtrxCell.landing_object 
					&& matrix[mtrxCell.landing_object].visible_value
					?
					matrix[mtrxCell.landing_object].visible_value.value
					:
					"title";
			
			//console.log(DataContext[sourceType]( this.state.id ).data[m]); 
			//console.log(m, this.state.data[m]);
			//console.log(m, mtrxCell, mtrxCell.landing_object );
			const d = mtrxCell.demand
				&& mtrxCell.demand.value.filter(e =>
				{
					return this.state[ mtrxCell.demand.field ] == e
				}).length == 0 
			if(!d)
			{ 
				ttabs[ ttb ].push( <FieldInput
						field={ m }
						key={ m }
						id={this.state.ID} 
						on={ value => this.on(value, m) }
						onChange={ value => this.on(value, m) }
						visibled_value={ visibled_value }
						{ ...mtrxCell }
						origin={this.state}
						sourceData={this.state.data ? this.state.data[m] : "" }
						editable = { true }
						value={ this.state.data ? this.state.data[m] : "" }
						vertical={ false }
					/> );				
			}
			
		}
		
		const  tabArray = Object.keys(ttabs);
		//console.log( tabArray );
		return tabArray.length > 1
			?
			<div className="px-4">			
				<Tabs
					onChange={ this.onTab }
					animate={ false }
					id={ "tabs_" + this.state.id }
					key={ this.state.id } 
					vertical={ true } 
					className="tab-params "
				>
					{ 
						tabArray.map( (e, i) =>
						{
							//console.log( ttabs[ e ] );
							return <Tab
								key={ i }
								id={ e } 
								title={ 
									tabTitles[ e ]
										?
										<div className={ "hint hint--left" }  data-hint={ __( e ) }>
											<i className={ tabTitles[ e ]  + " fa-2x "} />
											<div>{ __( e ) }</div>
										</div>
										:
										__( e )

								} 
								panel={ this.tab( ttabs[ e ], i, e ) } 
							/>
						} )
					}
				</Tabs>
			</div>
			:
			
			<div className="px-4">			
				{ ttabs.PrimaryParams }
			</div>
	}
	
	on = ( value, field ) =>
	{
		console.log(value, field);
		if(this.props.on)
			this.props.on(value, field);
		let state = {...this.state};
		state[field] = value
		this.setState(state);
	}
	
	tab = ( tab, i, e ) =>
	{
		return <div>
			<div className="title mb-1 text-center">
				{e}
			</div>
			<div>
				{tab}
			</div>
		</div>
	}
}
export default InputForm;
