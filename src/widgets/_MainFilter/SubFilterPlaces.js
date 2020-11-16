import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import { Button, ButtonGroup, Intent, Icon } from "@blueprintjs/core";
import PlaceTypesFilters from "./PlaceTypesFilters";

class SubFilterPlaces extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isOpen:false,
			sPlaceTypes:this.props.sPlaceTypes
		}
	}
	componentWillReceiveProps ( nextProps )
	{
		if( nextProps.sPlaceTypes != this.state.sPlaceTypes )
		{
			this.setState({ sPlaceTypes: nextProps.sPlaceTypes });
		}		
	}
	render()
	{
		return <Fragment>
			<div className="pointer" onClick={this.onClick}>
				<Icon icon={ !this.state.isOpen ? "chevron-down" : "chevron-up" }/>
			</div>
			<PlaceTypesFilters 
				isOpen={this.state.isOpen} 
				onOpen={this.onClose} 
				placeTypes={this.props.placeTypes}
				sPlaceTypes={this.state.sPlaceTypes}
				onSelect={this.props.onSelect}
			/>
		</Fragment>
	}
	onClose = bool =>
	{
		this.setState({isOpen:bool});
	}
	onClick = evt =>
	{
		this.setState({isOpen:!this.state.isOpen});
	}
}
export default SubFilterPlaces;