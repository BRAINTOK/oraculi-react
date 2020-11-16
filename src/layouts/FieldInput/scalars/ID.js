import React, {Component} from "react";
import {__} from "../../utilities/i18n";
import { Tag, ButtonGroup, Button, Intent } from "@blueprintjs/core";

//  Scalar  ID
//TODO extends ScalarField
export default class ID extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			value:this.props.value
		}
	}
	isEnabled()
	{
		const {field, title, value, extended_link, external_link_data } = this.props;
		return <div className={"datetimer "+this.props.className}>
			<i className="fas fa-fingerprint"></i>
			<input 
				type="text" 
				className={ "" }
				value={ value ? value : ""}
				onChange={this.onChange}
			/>
		</div>
	}
	isDesabled()
	{
		return <div className={"datetimer "+this.props.className}>
			<i className="fas fa-fingerprint"></i>
			<div className="px-0 my-2">
			{
				this.props.value 
					?
					<Tag minimal={true}>
						{ this.props.value + " "}
					</Tag>
					:
					null
			}
			</div>
		</div>
	}
	render()
	{
		const {field, title} = this.props;
		const {value} = this.state;
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-7 layout-data";
		return <div className="row  dat" key={field}>
			<div className={col1}>
				{__( title )}
			</div>
			<div className={col2}> 
				<div className={"datetimer "+this.props.className}>
					<i className="fas fa-fingerprint"></i>
					{
						this.props.editable 
						?
							<input 
								type="text" 
								className={ "" }
								value={ value ? value : ""}
								onChange={this.onChange}
							/>
						:
							<div className="px-0 my-2">
							{
								this.props.value 
									?
									<Tag minimal={true}>
										{ this.props.value + " "}
									</Tag>
									:
									null
							}
							</div>
					}
				</div>
			</div>
		</div>
	}
	
	onChange = evt =>
	{
		this.setState({value:evt.currentTarget.value});
		this.on(evt.currentTarget.value)
	}
	
	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}