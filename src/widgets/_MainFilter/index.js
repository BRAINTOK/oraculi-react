import React, {Fragment, Component} from "react";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import SubFilterPlaces from "./MainFilter/SubFilterPlaces";
import $ from "jquery";

class MainFilter extends Component
{
	state = {
		selected : {
			places:true,
			events:true,
			translations:true		
		},
		sPlaceTypes	: this.props.placeTypes
		
	}
	componentDidMount()
	{
		if($("#sub-places").length > 0 )
		{
			$("#sub-places").outerWidth($("#places-filters").outerWidth());
		}
	}
	
	render()
	{ 
		const isPlaces 	= this.props.fields.filter(e => e == 'places').length > 0;
		const isEvents 	= this.props.fields.filter(e => e == 'events').length > 0;
		const isTrans 	= this.props.fields.filter(e => e == 'translations').length > 0;
		return <div className="main-filter-container">
			<ButtonGroup id="filters">
				{
					 isPlaces
						?
						<Button 
							minimal={!this.state.selected.places}
							intent={this.state.selected.places ? Intent.SUCCESS : Intent.NONE}
							type="places"
							onClick={this.onChoose} 
							className={this.state.selected.places ? "" : "opacity_025"}
							id="places-filters"
						>
							{__("Places")}
						</Button>
						:
						null
				}
				{
					 isEvents
						?
						<Button 
							minimal={!this.state.selected.events}
							intent={this.state.selected.events ? Intent.PRIMARY : Intent.NONE}
							type="events"
							onClick={this.onChoose} 
							className={this.state.selected.events ? "" : "opacity_025"}
						>
							{__("Events")}
						</Button>
						:
						null
				}
				{
					 isTrans
						?
						<Button 
							minimal={!this.state.selected.translations}
							intent={this.state.selected.translations ? Intent.DANGER : Intent.NONE}
							type="translations"
							onClick={this.onChoose} 
							className={this.state.selected.translations ? "" : "opacity_025"}
						>
							{__("Translations")}
						</Button>
						:
						null
				}
			</ButtonGroup>
			<div  className="sub-filters" id="sub-filters">
			{
				isPlaces
					?
					<div className="sub" id="sub-places">
						<SubFilterPlaces 
							placeTypes={this.props.placeTypes} 
							sPlaceTypes={this.state.sPlaceTypes} 
							onSelect={this.onSelectPlaceTypes}
						/>
					</div>
					:
					null
			}
				<div className="sub" id="sub-events">
				
				</div>
				<div className="sub" id="sub-translations">
				
				</div>
				
			</div>
		</div>;
	}
	onSelectPlaceTypes = sPlaceTypes =>
	{		
		
		this.setState(
			{
				sPlaceTypes	: sPlaceTypes, 
				selected	: { ...this.state.selected, places:sPlaceTypes.length > 0 }
			},
			console.log(this.state , this.state.selected )
		);
	}
	
	onChoose = evt =>
	{
		const type	= evt.currentTarget.getAttribute("type");
		let selected = {...this.state.selected};
		let sPlaceTypes = [...this.state.sPlaceTypes];
		if(selected[type])
		{
			delete selected[type];
			if(type=="places")
				sPlaceTypes  = [];
		}
		else
		{
			selected[type] = true;
			if(type=="places")
				sPlaceTypes  = this.props.placeTypes;
		}
		this.setState({selected, sPlaceTypes});
	}
}

export default MainFilter;