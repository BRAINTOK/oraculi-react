import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import FieldInput from "../../layouts/FieldInput";
import {roles} from "../../layouts/app"
import {schema} from "../../layouts/schema";
import {concatRouting, routeData, routing} from "../../layouts/routing";
import { 
	Icon, Tag, Classes, Collapse,
	PopoverInteractionKind, PopoverPosition,
	Intent, Tooltip, 
	Card, FormGroup, 
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup,  Tab, Tabs
 } from "@blueprintjs/core";
import {AppToaster} from "../../layouts/utilities/blueUtils";


const components = {};

function importAll (r) {
	// console.log(r)
	r.keys().forEach(key => {
		const key1 = key.replace("./", "").split(".").slice(0, -1).join(".");
		components[key1] = r(key)
	});
}

importAll(require.context('../../states/', false, /\.js$/));

const ignoreStates = [
	"ChangeEmaiState",
	"DataState",
	"DataTableState",
	"FinishRestorePasswordState",
	"HTMLSourceState",
	"HTMLState",
	"NoMatchState",
	"PageState",
	"RememberPasswordForm",
	"RobokassaFailureState",
	"RobokassaSuccessState",
	"SchoolRememberPasswordForm",
	"SchoolResetPasswordForm",
	"SchoolSearchState",
	"SchoolVerify",
	"SearchState",
	"VerifyUserState"
];


class MenuElementForm extends Component
{
	constructor(props)
	{
		super(props);
		console.log(this.props.target_id, typeof this.props.target_id);
		this.state = {
			...this.props, 
			is_target : typeof this.props.target_id != "undefined" ? 1 : 2
		}
	}
	componentWillReceiveProps ( nextProps )
	{
		//console.log(nextProps.data_type);
		this.setState({
			component:null, 
			data_type:null, 
			html_source:null, 
			html:null, 
			target_id :null, 
			children :null,
			is_target : typeof nextProps.target_id != "undefined" ? 1 : 2, 
			...nextProps,
			title: nextProps.title,
			capability: nextProps.capability
		})
	}
	render()
	{
		//console.log(this.state.capability)
		let contentType;
		if(this.state.component)
			contentType = "component";
		else if(this.state.data_type)
			contentType = "data_type";
		else if(this.state.html_source)
			contentType = "html_source";
		else if(this.state.html)
			contentType = "html";
		const is_target = this.state.is_target;	
		const chreateChild = is_target == 2
			?
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
									{__("Insert child")}
								</Button>
								<Button intent={Intent.DANGER} onClick={this.onCreateToggle}>
									{__("Cancel")}
								</Button>
							</ButtonGroup>
						</div>
					</div>
				}
			>
				<Button onClick={this.onCreateToggle} fill={true} className="h-40px">
					{__("Create Child")}
				</Button>
			</Popover>
			:
			null;
		return typeof this.state.title != "undefined"
			?
			<div className="w-100">
				<div className="row">
					<div className="col-md-3  layout-label">
						{__( "Fontawesome Icon" ) }
					</div>
					<div className="col-md-9 layout-data d-flex align-items-center ">
						<div
							style={{
								width:50, 
								height:45, 
								display:"flex", 
								justifyContent:"center", 
								alignItems:"center", 
								fontSize:"1.2rem"
							}}
						>
							<i className={this.state.icon} />
						</div>
						<input 
							type="text"
							className=" form-control  input dark"
							value={this.state.icon}
							onChange={this.onIcon}
						/>
					</div>
				</div>
				<FieldInput 
					title={__("Title")}
					type={"string"}
					field={"Title"}
					editable={true}
					value={this.state.title}
					onChange={this.onTitle}
				/>
				<FieldInput 
					title={__("Creation Type")}
					type={"radio"}
					field={"createtype"}
					editable={true}
					value={ is_target }
					values={[{_id:2, title:"create in palce"}, {_id:1, title:"coping from exist"} ]}
					_id="createtype"
					onChange={this.onCrT}
				/>
				<div className={ this.state.is_target == 2 ? "hidden" : " row" }>
					<div className="col-md-3  layout-label">
						{__( "Copy from URL" ) }
					</div>
					<div className="col-md-9 layout-data">
						{ this.getRouteSelect() }
					</div>			
				</div>		
				<div className={ this.state.is_target == 1 ? "hidden" : "" }>
					<FieldInput 
						title={__("Route")}
						type={"string"}
						field={"URL"}
						editable={true}
						value={this.state.route}
						onChange={this.onRoute}
					/>
					<FieldInput 
						title={__("Content type")}
						type={"radio"}
						field={"contenttype"}
						editable={true}
						value={contentType}
						values={[
							{_id:"component",	title:"page component"}, 
							{_id:"data_type",	title:"page data_type"}, 
							{_id:"html_source",	title:"page html_source"}, 
							{_id:"html",		title:"page html"}
						]}
						_id="contenttype"
						onChange={this.onCT} 
					/> 
					<Collapse isOpen={ contentType == "component" }>	
						<div className=	"row w-100">			
							<div className="col-md-3  layout-label">
								{__( "Choose Ready Component" ) }
							</div>
							<div className="col-md-9 layout-data">
								{ this.getComponentSelect() }
							</div>			 
						</div>			 
					</Collapse>
					<Collapse isOpen={ contentType == "data_type" }>  
						<div className=	"row w-100">			
							<div className="col-md-3  layout-label">
								{__( "Choose Data Type" ) }
							</div>
							<div className="col-md-9 layout-data">
								{ this.getSchemaSelect() }
							</div>			 
						</div>	
					</Collapse>
					<Collapse isOpen={ contentType == "html_source" }>					
						<FieldInput 
							title={__("Insert URL")}
							type={"url"}
							field={"html_source"}
							editable={true}
							value={this.state.html_source}
							onChange={this.onHTML_source}
						/>
					</Collapse>
					<Collapse isOpen={ contentType == "html" }>
						<FieldInput 
							title={__("nsert HTML")}
							type={"text"}
							field={"html"}
							editable={true}
							value={this.state.html || ""}
							onChange={this.onHTML}
						/>
					</Collapse>
					<FieldInput 
						title={__("Hidden for unlogged")}
						type={"radio"}
						field={"islogged"}
						editable={true}
						value={this.state.islogged}
						values={[ {_id:1, title:"Yes"}, {_id:0, title:"No"} ]}
						component={"PlaceType"}
						_id="contenttype"
						onChange={this.onIsLogged}
					/>
					<FieldInput 
						title={__("Exlusive access by role")}
						type={"checkbox"}
						field={"capability"}
						editable={true}
						value={this.state.capability || []}
						values={ roles() }
						_id="contenttype"
						onChange={this.onRoles}
					/>
					<FieldInput 
						title={__("Is show left menu in Route")}
						type={"radio"}
						field={"is_left"}
						editable={true}
						value={this.state.is_left}
						values={[ {_id:1, title:"Yes"}, {_id:0, title:"No"} ]}
						component={"PlaceType"}
						_id="contenttype"
						onChange={this.onIsLeft}
					/>
				</div>
				<div className=	"row w-100 mt-2">			
					<div className="col-md-3  layout-label">
						 
					</div>
					<div className="col-md-9 layout-data">
						<ButtonGroup fill={true}>
							<Button intent={Intent.SUCCESS}  fill={true} className="h-40px">
								{__("Update")}
							</Button>
							<Popover
								isOpen={this.state.isRemoveOpen}
								content={
									<div className="square">
										<div>
											<small>
												{__("Are you shure?")}
											</small> 
											<ButtonGroup>
												<Button intent={Intent.SUCCESS} onClick={this.onRemove} >
													{__("Remove")}
												</Button>
												<Button intent={Intent.DANGER} onClick={this.onRemoveToggle}>
													{__("Cancel")}
												</Button>
											</ButtonGroup>
										</div>
									</div>
								}
							>
								<Button intent={Intent.DANGER} onClick={this.onRemoveToggle} fill={true} className="h-40px">
									{__("Remove")}
								</Button>
							</Popover>
							{chreateChild}
						</ButtonGroup>
					</div>
				</div>
			</div>
			:
			<div className="alert alert-secondary">
				{__("No elements exist")}
			</div>
	}
	onRemove = () =>
	{
		this.props.deleteRoute( this.state.route );
		this.setState({isRemoveOpen:false});
	}
	onRemoveToggle = () =>
	{
		this.setState({isRemoveOpen:!this.state.isRemoveOpen});
	}
	getRouteSelect()
	{
		return <select className="form-control" value={this.state.target_id || "-1"}>
		{
			concatRouting()
				.filter(e => e.route || e.route == "")
					.map((e, i) =>
					{
						const selected = e.route == this.state.target_id;
						return <option key={i} value={e.route} selected={selected}>
							{e.route}
						</option>
					})
		}
		</select>
	}
	getComponentSelect()
	{
		let rr = [];
		for(let key in components)
		{
			if(ignoreStates.filter(e => e == key).length == 0)
				rr.push(key);
		}
		return <select className="form-control">
		{
			rr.map((e, i) =>
				{
					const selected = e == this.state.component;
					return <option key={i} value={e} selected={selected}>
						{e}
					</option>
				})
		}
		</select>
	}
	getSchemaSelect()
	{
		let rr = [];
		let xx = {...schema()}
		for(let key in xx)
		{
			rr.push({...xx[key], data_type:key});				
		}
		return <select className="form-control">
		{
			rr.map((e, i) =>
				{
					const selected = e.data_type == this.state.data_type;
					return <option key={i} value={e.data_type} selected={selected}>
						{__(e.name)}
					</option>
				})
		}
		</select>
	}
	onChangeField = data =>
	{
		this.props.onChangeField(data);
	}
	onIcon = evt 		=> this.onChangeField({title:"icon", field:evt.currentTarget.value})
	onTitle = evt 		=> this.onChangeField({title:"title", field:evt})
	onRoute = evt 		=> this.onChangeField({title:"route", field:evt}) //this.setState({ route : evt });
	onHTML = evt 		=> this.onChangeField({title:"html", field:evt}) //this.setState({ html : evt });
	onHTML_source = evt => this.onChangeField({title:"html_source", field:evt}) //this.setState({ html_source : evt });
	onIsLogged = evt	=> this.onChangeField({title:"islogged", field:evt}) //this.setState({ islogged : evt });
	onIsLeft = evt		=> this.onChangeField({title:"is_left", field:evt}) //this.setState({ is_left : evt });
	onCrT = evt 		=> this.onChangeField({title:"is_target", field:evt}) //this.setState({ is_target : evt});
	onRoles = evt 		=> this.onChangeField({title:"capability", field:evt}) //this.setState({ capability : evt});
	onCT = evt 		=> {
		/*
		let data = {
			component:null, 
			data_type:null, 
			html_source:null, 
			html:null
		};
		data[evt] = {}
		this.setState(data);
		*/
		this.props.setContentType(evt);
	};
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
		this.setState({
			isCreateOpen:false,
			childName:""
		});
	}
}
export default MenuElementForm;
