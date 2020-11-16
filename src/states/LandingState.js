import React, {Component, Fragment} from "react";
import {__} from "../layouts/utilities/i18n";
import BasicState from "../layouts/BasicState"; 
import $ from "jquery";
import {withRouter} from "react-router";
import layouts from "../layouts/layouts";
import {isRole} from "../layouts/user"; 
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import {getQueryArgs, getQueryName, querySingle} from "../layouts/schema";
import Loading from "../layouts/utilities/Loading";
import data from "./LandingState/data/data";
import LandingEditDialog from "./LandingState/edit/LandingEditDialog";
import Section, { getDefault } from "./LandingState/Section";
import DataContext from "./LandingState/DataContext";
import { Button, ButtonGroup, Intent, Popover, Dialog, Icon, Tooltip, Position, Callout } from "@blueprintjs/core";
import { AppToaster } from "../layouts/utilities/blueUtils";
import matrix from "./LandingState/data/matrix";

import getWidget, { initArea } from "../layouts/utilities/getWidget";
import gql from 'graphql-tag';


class LandingState extends BasicState
{
	getId()
	{
		return "landing_page";
	}
	setID(lid)
	{
		//console.log(lid)
		this.setState(
			{lid},
			this.loadLanding(lid)
		);
	}
	loadLanding(lid)
	{ 
		//console.log(lid)
		let query = gql`
			query
			{
				getPE_Landing( id : "${lid}" )
				{
					json
				}
			}
		`; 
		this.props.client.query( { query: query } )
			.then( result  => 
				{  
					const json =  result.data.getPE_Landing.json;
					const replaced_json = json.replace( /'/g, '"' );
					let replaced2_json = replaced_json.replace( /~~/g, "'" );
					replaced2_json = replaced2_json.replace( /\t/g, "" );
					replaced2_json = replaced2_json.replace( /\n/g, "" );
					//console.log(typeof replaced2_json);					
					const parsed = replaced2_json  ? JSON.parse( replaced2_json ) : { sections : [] };
					DataContext.upd( parsed );
					//console.log( parsed );	
					//console.log( DataContext.data );	
					if( !parsed.sections || parsed.sections.length == 0)
					{
						this.onLandingClear();
					}
					this.setState({loading:false, is_edit : DataContext.data.sections.length == 0})
				}
			)
	}
	basic_state_data()
	{
		//DataContext.upd( data );
		return {
			loading: true,
			is_edit: false, //this.is_admin(),
			s:false
		}
	}
	stateDidMount() 
	{ 
		document.body.addEventListener('mousemove', this.onMove);
		const lid = this.getId();
		let query = gql`
			query
			{
				getPE_LandingID( id : "${lid}" ) 
			}
		`; 
		this.props.client.query( { query: query })
			.then(result  => 
				{  
					const json =  result.data.getPE_LandingID;
					console.log( json );
					this.setID( json );	
				}	
			)							
		/**/
	}
	 componentWillUnmount() 
	{ 
		document.body.removeEventListener('mousemove', this.onMove);
	}
	onMove = evt =>
	{
		window.mouseX = evt.offsetX;
		window.mouseY = evt.offsetY;
	}
	render()
	{
		if( this.state.loading )
		{
			return <div className="layout-state layout-center">
				<Loading />
			</div>
		}
		// console.log( DataContext.data ); 
		const landings = Array.isArray(DataContext.data.sections) && DataContext.data.sections.length > 0
			?
			DataContext.data.sections.map((e, i) =>
			{
				return <Section
					{...e}
					key={i}
					i={i}
					user={this.props.user}
					is_admin={ this.is_admin() }
					is_edit={this.state.is_edit}
					level={0}
					onEdit={this.onEdit}
					onUp={this.onUp}
					onDn={this.onDn}
					onAdd={this.onAdd}
					onRnv={this.onRnv}
					onHide={this.onHide}
					onRemoveFloat={this.onRemoveFloat}
					onUpdateFloat={this.onUpdateFloat}
				/>
			})
			:
			<div className="p-5">
				<Callout className="p-5 text-center">
					{__("No landing data")}
					{
						this.state.is_edit 
						?
							<div className="pt-4">
								<Button onClick={ this.onAdd } icon="plus" >
									{__("Add first section")}
								</Button>
							</div>
						:
						null
					}
				</Callout>
			</div>;
		let c, row;
		if(DataContext.data.landing && DataContext.data.landing.is_blocked)
		{
			c = <Fragment>
				<div className="landing-container-left-field" >
					<div 
						style={{ backgroundImage : "url(" + DataContext.data.landing.left_image + ")" }}
					/>
					<div 
						style={{ 
							backgroundColor : DataContext.data.landing.left_color,
							opacity	 : 	DataContext.data.landing.left_color_opacity				
						}}
					/>
				</div>
				<div className={ "container" }>
					{landings}
				</div>
				<div className="landing-container-right-field" >
					<div 
						style={{ backgroundImage : "url(" + DataContext.data.landing.right_image + ")" }}
					/>
					<div 						
						style={{ 
							backgroundColor : DataContext.data.landing.right_color,
							opacity	 : 	DataContext.data.landing.right_color_opacity 
						}}
					/>
				</div>
			</Fragment>;
			row = " flex-row "
		}
		else
		{
			c = landings;
			row = " flex-column "
		}
		
			
		return <div 
			className={ "landing-container layout-state p-0 " + row }
		>
			{
				this.is_admin()
					?
					!this.state.is_edit
						?
						<div className="landind-edit-cont">
							<Tooltip
								position={Position.LEFT}
								content={__( "Start edit Landing" )}
							>
								<div 
									className="l-inline-edit-btn" 
									onClick={ this.onEditHandler } 
									title={__( "Start edit Landing" )}
									style={{ position:"relative", top:"auto", right:0 }}
								>
									<Icon icon="annotation" />
								</div>
							</Tooltip>
						</div>
						:
						<Fragment>
							<div className="landind-edit-cont">
								<Button 
									intent={ Intent.NONE } 
									onClick={this.onSettings} 
									large={false} 
									fill={true}
									icon="cog"
									className="mr-1"
									title={__( "Landing settings" )}
								/>
								<Popover
									content={
										<div className="p-3">
											<ButtonGroup vertical={true}>											
												<Button 
													intent={ Intent.NONE } 
													onClick={this.onAdd} 
													large={false} 
													fill={true}
													className="mr-0 pe-room-btn" 
													icon="plus"
												>
													{__( "Add section" )}
												</Button>
												<Button 
													intent={ Intent.NONE } 
													onClick={this.onDownload} 
													fill={true}
													className="mr-1 pe-room-btn"
													icon="download"											
												>
													{__( "Download source json" )}
												</Button>
												<div className="position-relative pe-room-btn">
													<input	
														type="file"
														style={{
															width: "100%",
															height: 30
														}}
														onChange={this.onLoadChange}
													/>
													<Button 
														intent={ Intent.NONE } 
														onClick={this.onDownload} 
														className="position-absolute z-index-100 untouchble pe-room-btn"
														icon="upload"
														fill={true}
														title={__( "Upload Landing json" )}
													>
														{__("Upload Landing json")}
													</Button>
												</div>
												<Button 
													intent={ Intent.DANGER } 
													onClick={this.onClearOpen} 
													fill={true}
													className="mr-1 pe-room-btn"
													icon="clear"											
												>
													{__( "Clear all" )}
												</Button>
											
											</ButtonGroup>
										</div>
									}
								>
									<Button 
										intent={ Intent.NONE }  
										large={false} 
										className="mr-1" 
										icon="chevron-down"
									>
										{ __("Actions") }
									</Button>
								</Popover>
								
								<Button 
									intent={ Intent.SUCCESS } 
									onClick={this.onUpdateHandler} 
									large={false} 
									icon="floppy-disk"
									title={__( "Update Landing" )}
									className="mr-1"
								/>
								<Button 
									intent={ Intent.DANGER } 
									onClick={this.onEditHandler} 
									large={false} 
									className="mr-1"
									title={__( "Finish edit Landing" )}
									icon="cross"
								/>
								<Dialog
									isOpen={this.state.isClearOpen}
									onClose={this.onClearOpen}
									title={ __("Clear Landing?") }
									className="little"
								>
									<div className="p-4 layout-centered">
										<div>
											<div className="pb-3">
												{__("Realy clear all content?")}
											</div>
											<ButtonGroup>
												<Button
													intent={Intent.NONE}
													onClick={this.onLandingClear}
													text={__("Yes, clear")}
												/>
												<Button
													intent={Intent.DANGER}
													icon="cross"
													onClick={this.onClearOpen}
												/>
											</ButtonGroup>
										</div>
									</div>
								</Dialog>
							</div>
							<LandingEditDialog
								isOpen={this.state.isLandingEditOpen}
								onClose={this.onSettings}
								data={DataContext.data.landing}
								onEdit={this.onLandingEdit}
							/>
						</Fragment>
					: 
					null
			}
			{ c }
		</div>
	}
	onLandingEdit = data =>
	{
		DataContext.setLanding(data);
		this.setState({isLandingEditOpen : false});
	}
	onSettings = () =>
	{
		//console.log(this.state.isLandingEditOpen);
		this.setState({isLandingEditOpen : !this.state.isLandingEditOpen});
	}
	onLoadChange = evt =>
	{
		//console.log(evt.target.files);
		if(evt.target.files[0].type == "application/json")
		{
			const context = this;
			let reader = new FileReader();
			reader.readAsText(evt.target.files[0]);
			reader.onload = () =>
			{
				const data = JSON.parse( reader.result ) ;
				if(data.sections && data.maxSectionID && data.maxFloatID)
				{
					DataContext.upd(data);
					context.setState({s : !context.state.s});
				}
				else
				{
					AppToaster.show({
						intent: Intent.DANGER,
						icon: "tick",
						duration:10000,
						message: __( "File is not Landing format" )
					})
				}
			};
		}
		else
		{
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick",
				duration:10000,
				message: __( "Choose JSON file." )
			})
		}
		
	}
	is_admin(  )
	{
		return isRole( "administrator", this.props.user );
	}
	onEditHandler = () =>
	{
		this.setState({ is_edit : !this.state.is_edit });
	}
	onUpdateHandler = () =>
	{
		//console.log( DataContext.data );
		const data = JSON.stringify(DataContext.data ).replace( /'/g, "~~" ).replace( /"/g, "'" );
		//console.log( data); 
		this.setState({ loading : true });
		const lid = this.getId();
		const chagePE_Landing = gql`
			mutation chagePE_Landing
			{
				chagePE_Landing( id : "${lid}", input:"${data}")
			}
		`;
		this.props.client.mutate({
			mutation: chagePE_Landing,
			update: (store, { data: { chagePE_Landing } }) =>
			{
				this.setState({ 
					is_edit : !this.state.is_edit ,
					loading : false
				});
			}
		})
		
		
	}
	onEdit = data =>
	{
		console.log( data, matrix[data.type] );
		let sections = [...DataContext.data.sections];
		// fill by default if empty (new)
		if(matrix[data.type].default)
		{
			console.log( matrix[data.type].default );
			Object.keys(matrix[data.type].default).forEach((e,i) =>
			{
				console.log(e, matrix[data.type].default[e]);
			})
		}			
		// finish fill		
		DataContext.updateSection(data.id, data);
		//DataContext.upd({ ...DataContext.data, sections });	
		this.setState({s:!this.state.s});
	}
	onUp = data =>
	{
		console.log("UP", data);
		let sections = [ ...DataContext.data.sections ];
		const sec = { ...sections[ data ] };
		sections.splice( data, 1 );
		sections.splice( data - 1, 0, sec );
		DataContext.upd({...DataContext.data, sections});
		this.setState({s:!this.state.s});
	}
	onDn = data =>
	{
		console.log("DN", data);
		let sections = [ ...DataContext.data.sections ];
		const sec = { ...sections[ data ] };
		sections.splice( data, 1 );
		sections.splice( data + 1, 0, sec );
		DataContext.upd({...DataContext.data, sections});
		this.setState({s:!this.state.s});
	}
	onRnv = data =>
	{
		console.log("RMV", data);
		let sections = [ ...DataContext.data.sections ]; 
		sections.splice( data, 1 ); 
		DataContext.upd({...DataContext.data, sections});
		this.setState({s:!this.state.s});
	} 
	onAdd = data =>
	{
		// console.log("ADD", data);
		let sections = [ ...DataContext.data.sections ];
		const sec = getDefault(); 
		sections.splice( data + 1, 0, sec );
		console.log(sections);
		DataContext.upd({...DataContext.data, sections});
		this.setState({s:!this.state.s});
	}
	onHide = (id, is_hide) =>
	{
		console.log("HIDE", id, is_hide); 
		DataContext.hideSection(id, is_hide);
		console.log( DataContext.data ); 
		this.setState({s:!this.state.s});
	}
	onClearOpen = () =>
	{
		this.setState({isClearOpen : !this.state.isClearOpen });
	}
	onLandingClear = () =>
	{
		DataContext.clear();
		this.setState({ s:!this.state.s, isClearOpen : false })
		
	}
	onRemoveFloat = float_id =>
	{
		DataContext.deleteFloatId( float_id );
		this.setState({ s:!this.state.s })
	}
	onUpdateFloat = (data, float_id, section_id) =>
	{
		console.log(data, float_id, section_id);
		DataContext.updateFloat( data, float_id, section_id);
		console.log(DataContext.data);
		this.setState({ s:!this.state.s })
	}
	onDownload = () =>
	{
		//const downloadFile = async () => 
		//{
			const myData  = DataContext.data; 	// I am assuming that "this.state.myData"
												// is an object and I wrote it to file as
												// json
			const fileName = "file";
			const json = JSON.stringify(myData);
			const blob = new Blob([json],{type:'application/json'});
			const href = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.classList.add("lead");
			link.classList.add("bg-light");
			link.classList.add("p-5");
			link.href = href;
			link.download = fileName + ".json";
			document.body.appendChild(link);
			link.click();
			//document.body.removeChild(link);
		//}
	}
}
export default compose(
	withRouter,
	withApollo
)(LandingState)
