import React, {Component, Fragment} from "react";
import { __ } from "../../layouts/utilities/i18n";
import { isRole } from "../../layouts/user";
import { Button, Intent, Icon, Dialog } from "@blueprintjs/core";
import DataContext from "./DataContext";
import InputForm from "./edit/InputForm";
import matrix from "./data/matrix";
import FieldInput from "../../layouts/FieldInput";

class EditLabel extends Component
{
	constructor(props)
	{
		super( props );
		this.state= { 
			...this.props,
			isOpen:false
		}
	}
	render()
	{ 
		//return null;
		return this.props.is_edit
			?
			<Fragment>
				{this.state.isBtn ? this.btn() : this.pic()}
				<Dialog
					isOpen={this.state.isOpen}
					onClose={this.onDailogHandler}
					className="little2"
					title={__( "Edit " ) + __( this.props.source ) }
				>
					<div className="p-4">
						{this.dialogContent()}
					</div>
					<div className="d-flex justify-content-center pt-2">
						<Button intent={Intent.DANGER} >
							{__("Update")}
						</Button>
					</div>
				</Dialog>
			</Fragment>
			:
			null
	}
	pic()
	{
		return <div 
					className="l-inline-edit-btn" 
					onClick={ this.onDailogHandler } 
					style={{ width: this.props.style.width, height: this.props.style.height }}
				>
					<Icon icon="annotation" />
				</div>
	}
	btn()
	{
		return <Button   
					className="m-2" 
					icon="annotation"
					onClick={ this.onDailogHandler } 
				>
					{__(this.props.label ? this.props.label : "Edit" )}
				</Button>
	}
	onDailogHandler = () =>
	{
		this.setState({isOpen : !this.state.isOpen});
	}
	onEdit = () =>
	{
		this.props.onEdit({source : this.props.source, type : this.props.type});
	}
	dialogContent()
	{ 
		return <InputForm {...this.props} id={this.state.id} />
		
		/*
		let html = [];
		for(let m in matrix[this.props.source])
		{
			if(matrix[this.props.source][m].hidden) continue;
			const cntxt = DataContext.getSection( this.state.id );
			const src = cntxt && cntxt[this.props.source]
					? DataContext.getSection( this.state.id )[this.props.source][m]
					: ""; 
			html.push( <FieldInput
						field={ m }
						key={ m }
						id={this.props.ID} 
						on={this.on}
						onChange={this.on}
						{ ...matrix[this.props.source][m] }
						editable = { true }
						value={ src }
						vertical={ false }
						visibled_value={ "title" }
					/> )
		}
		return html;
		*/
	}
	on = (data, field) =>
	{
		console.log(data, field);
	}
}
export default EditLabel;