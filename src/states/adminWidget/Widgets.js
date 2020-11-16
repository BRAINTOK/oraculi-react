import React, {Component, Fragment} from "react"; 
import { NavLink, Link } from 'react-router-dom';
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import getWidget, { initArea, widgetAreas } from "../../layouts/utilities/getWidget";
import getWidgets from "../../layouts/utilities/getWidgets";
import {concatRouting, mainPage, routeData, routing} from "../../layouts/routing";
import {widgets} from "../../layouts/template";
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
import Widget from "./Widget";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Widgets extends Component
{
	constructor(props) 
	{
		super(props);
		console.log( this.props.area );
		this.state = {
			area: [...this.props.area]
		};
	}
	componentWillReceiveProps ( nextProps )
	{ 
		 this.setState(nextProps)
	}
	reorder = (list, startIndex, endIndex) => 
	{
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};
	onDragEnd = result => 
	{
		// dropped outside the list
		if (!result.destination) 
		{
			return;
		}		
		const area = this.reorder(
			this.state.area,
			result.source.index,
			result.destination.index
		);

		this.setState({
			area
		});
	}
	
	render()
	{ 
		const {area} = this.state;
		const _widgets = area.length > 0
			?
			area.map((item, index) =>
			{
				return <Draggable key={index} draggableId={item.component} index={index}>
					{
						(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
								<Widget item={item} n={index} onUpdate={this.onUpdate} onRemoved={this.onRemoved}/>
							</div>
						)
					}
				</Draggable>
			})
			:
			<div className="alert alert-secondary m-2  min-width-400">
				{__("No elements exist")}
			</div>
		
		let wList=[], i=0; 
		for(  var w in getWidgets)
		{
			const _www = widgets()[w];
			const _title = _www ? _www.title : w;
			if(_www && _www.areas && _www.areas.filter(e => e == this.state.currArea).length == 0)
				continue;
			wList.push( 
				<Button fill={true} key={i} onClick={this.onAdd} w={w}>
					{__(_title)}
				</Button>
			);
			i++;
		};
		return <div className="admin-widgets-container-main position-relative">
			<div className="admin-widgets-container">
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
					{
						(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{_widgets}
							</div>
						)
					}
					</Droppable>
				</DragDropContext>
			</div>
			<div className="admin-widgets-add">  
				
				<Popover
					isOpen={this.state.isCreateOpen}
					content={     
						<div className="p-4">
							<div className="p-0 max-height-250 overflow-y-auto">
								<div style={{ overflowX:"hidden", overflowY:"auto", marginBottom:10 }}>
									{wList}
								</div>
							</div>
							<div className="d-flex mt-3">
								<Button minimal={true} disabled={true}>
									{__("Insert child Widget")}
								</Button>
								<Button intent={Intent.DANGER} onClick={this.onCreateToggle} rightIcon="cross">
									
								</Button>
							</div>
						</div>
					}
				>
					<div className="btn btn-light  btn-sm mt-2" onClick={this.onCreateToggle}>
						<i className="fas fa-plus" />
					</div>
				</Popover>
			</div>
		</div>
	}
	onCreateToggle = () =>
	{
		this.setState({isCreateOpen:!this.state.isCreateOpen});
	}
	onAdd = evt =>
	{
		const w = evt.currentTarget.getAttribute("w");
		let area = [...this.state.area];
		area.push({
			component : w
		});
		this.setState({
			area,
			isCreateOpen : false,
			canSave:true
		});
		this.props.onUpdate(area);
	}
	onUpdate = (data, n) =>
	{ 
		let area = [...this.state.area];
		area[n] = data;
		this.setState({
			area,
			isCreateOpen : false,
			canSave:true
		})
		console.log(data, n);
		this.props.onUpdate(area);
	}
	onRemoved = component =>
	{ 
		let area = [...this.state.area], n;
		area.forEach((e, i) =>
		{
			if(e.component == component)
			{
				n = i;
			}
		});
		area.splice(n, 1);
		console.log(n, component, area);
		this.setState({
			area,
			canSave:true
		});
		this.props.onUpdate(area);
	}
}
export default Widgets;