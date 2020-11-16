import React, { Component } from "react"; 
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MenuElementBtn from "./MenuElementBtn";
import {__} from "../../layouts/utilities/i18n";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core"; 

class MenuElementBtnGroup extends Component
{
	constructor(props) 
	{
		super(props);
		this.state = {
			items: this.props.items,
			curBtn: this.props.curBtn
		};
	}
	componentWillReceiveProps ( nextProps )
	{
		//if(nextProps.curBtn!=this.state.curBtn)
		//	this.setState({ curBtn: nextProps.curBtn })
		 this.setState(nextProps)
	}
	grid = 8;
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
		const items = this.reorder(
			this.state.items,
			result.source.index,
			result.destination.index
		);

		this.setState({
			items
		});
	}
	render()
	{
		return <div>
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
				{
					(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{
								this.state.items.map((item, index) => (
									<Draggable key={index} draggableId={item.route || item.target_id} index={index}>
									{
										(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<MenuElementBtn 
													{...item} 
													i={index} 
													key={index} 
													level={0}
													current={this.state.curBtn}
													onCurBtn={this.props.onCurBtn} 
												/>
											</div>
										)
									}
									</Draggable>
								))
						  }
						  {provided.placeholder}
						</div>
					)
				}
				</Droppable>
			</DragDropContext>
			<ButtonGroup fill={true}>
				<Popover
					isOpen={this.state.isCreateOpen}
					content={
						<div className="square">
							<div>
								<small>
									{__("Set child's title")}
								</small>
								<input 
									type="text"
									value={this.state.childName}
									onChange={ evt => this.setState({childName:evt.currentTarget.value}) }
									className="form-control mt-2 mb-4"
									placeholder={__("Title")}
								/>
								<ButtonGroup>
									<Button intent={Intent.SUCCESS} onClick={this.onCreateChild} >
										{__("Insert child Route")}
									</Button>
									<Button intent={Intent.DANGER} onClick={this.onCreateToggle} rightIcon="cross">
										
									</Button>
								</ButtonGroup>
							</div>
						</div>
					}
				>
					<Button onClick={this.onCreateToggle}  fill={true} className="h-40px justify-content-start px-4">
						{__("Create child Route")}
					</Button>
				</Popover>
			</ButtonGroup>
		</div>
	}
	onCreateToggle = () =>
	{
		this.setState({isCreateOpen:!this.state.isCreateOpen});
	}
	onCreateChild = () =>
	{
		if( !this.state.childName )
		{
			AppToaster.show({  
				intent: Intent.DANGER,
				icon: "tick", 
				message: "Insert not empty title" 
			});
			return;
		}
		const childName = this.state.childName;
		//let items = [...this.state.items];
		//items.push({title:this.state.childName, route:""})
		this.setState({
			isCreateOpen:false,
			childName:"" 	
		},
		() => this.props.onNewBtn(childName) );
	}
}

export default MenuElementBtnGroup;