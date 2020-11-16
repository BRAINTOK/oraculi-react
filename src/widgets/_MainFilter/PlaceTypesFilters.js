import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { Button, ButtonGroup, Intent, Icon } from "@blueprintjs/core";

class PlaceTypesFilters extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			isOpen:props.isOpen,
			selected: this.props.placeTypes || []
		}
	}
	
	componentDidMount() 
	{
		document.body.addEventListener('click', this.onMouseLeaveHandler);
	}
    componentWillUnmount() 
	{
		document.body.removeEventListener('click', this.onMouseLeaveHandler);
	}
	onMouseLeaveHandler = e =>
	{	
		const domNode = ReactDOM.findDOMNode(this);
		if (!domNode || !domNode.contains(e.target))	
		{
			this.setState({
				isOpen: false
			});
			this.props.onOpen(false);
		}
	}
	componentWillReceiveProps ( nextProps )
	{
		if( nextProps.isOpen != this.state.isOpen )
		{
			this.setState({ isOpen: nextProps.isOpen });
		}
		if( nextProps.sPlaceTypes != this.state.sPlaceTypes )
		{
			this.setState({ selected: nextProps.sPlaceTypes });
		}			
	}
	render()
	{
		const placeTypes = this.props.placeTypes.map((e, i) => {
			const isSelect = this.state.selected.filter(ee => e._id == ee._id).length > 0;
			return <div
				key={i}
				style={{backgroundColor:!isSelect ? "transparent"  : e.color}}
				className={ !isSelect ? "emptySelectBtn" : "selectBtn" }
				onClick={() => this.onSelect(e)}
			>
				{e.title}
			</div>
		});
		return this.state.isOpen 
		?
		<div className="place-type-filter-container">
			{placeTypes}
		</div>
		:
		null;
	}
	onSelect = e =>
	{
		const isSelect = this.state.selected.filter(ee => e._id == ee._id).length > 0;
		
		let selected = [...this.state.selected];
		if(isSelect)
		{
			selected = selected.filter(ee => e._id != ee._id);
		}
		else
		{
			selected.push(e);
		}
		//this.setState({selected});
		this.props.onSelect(selected);
	}
}
export default PlaceTypesFilters;