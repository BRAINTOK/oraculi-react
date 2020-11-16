import React, {Component} from "react";
import {__} from "../../utilities/i18n"
import ScalarField from "./ScalarField";
import { Tag, ButtonGroup, Button, Intent } from "@blueprintjs/core";
import MediaChooser from "../../utilities/MediaChooser";

//  Scalar  String

export default class Upload extends ScalarField
{
	render()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-7 layout-data";
		return <div className="row dat" key={field}>
			<div className={col1}>
				{__( title ) }
			</div>
			<div className={col2}>
			{
				this.props.editable 
				?
					<div className="my-2">
						<MediaChooser
							prefix={"_" + field + this.props.id}
							url={value}
							id={""}
							ID={""}
							isDescr={true}
							padding={5}
							height={120}
							onChange={this.onMediaChange}
						/>			
						<input type="hidden"  onChange={this.onChange} />		
					</div>
				:
					<div className="px-0 my-1">
						<div style={{
							backgroundImage: "url(" + value + ")",
							backgroundSize:"cover",
							width:60,
							height:60,
							opacity:0.8,
							margin:6
						}} />
					</div>
			}
			</div>
		</div>
	}
	
	
	onMediaChange = (value, file) =>
	{
		//console.log(file);
		let state = {value:file};
		this.on(file, this.props.field, file.name);
		this.setState(state);
	}
	
	
	onChange = evt =>
	{
		console.log(evt.currentTarget);
		console.log(evt.target.files);

		const file = evt.target.files[0];

		this.setState({value:file});
		this.on(file)
	}
	on = (value, name, fileName) =>
	{
		this.props.on( value, this.props.field, this.props.title);
	}
}