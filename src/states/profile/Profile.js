import React, {Fragment, Component} from "react";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import {AppToaster} from "../../layouts/utilities/blueUtils";
import { Intent } from "@blueprintjs/core";
import {userModelField, userModelKeys} from "../../layouts/user";
import toFieldInput from "../../layouts/FieldInput";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';


export default class Profile extends Component
{
	state = this.props.user;
	render()
	{
		const fields = userModelField();
		const keys = userModelKeys();
		const flds = keys.map((e, i) =>
				{
					const {component, editable, values } = fields[ e ];
					const title = e;
					const value = this.state[e] || "";
					const onChange = this.onEditField;
					const type = fields[ e ].type;
					return <Fragment key={i}>
						{
							toFieldInput(
								{
									title,
									value,
									onChange,
									type,
									className: "form-control input light height_auto",
									component2: [ 
										{ _id:"subscriber", title:"subscriber"}, 
										{ _id:"admin", 		title:"admin" }, 
									],
									values: Array.isArray(values) ? values 
										.map( e =>
										{
											return {_id:e, title:e};
										}) : null,
									editable:  editable
								}
							)
						}
					</Fragment>;
				});
		return <div className="layout-center11">
			<div className="row">
				<div className="col-md-3">
					<CircularProgressbarWithChildren 
						value={81}
						styles={{
							// Customize the root svg element
							root: {},
							// Customize the path, i.e. the "completed progress"
							path: {
							  // Path color
							  stroke: '#175586',
							  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
							  strokeLinecap: 'butt',
							  // Customize transition animation
							  transition: 'stroke-dashoffset 0.5s ease 0s',
							  // Rotate the path
							  transform: 'rotate(0.25turn)',
							  transformOrigin: 'center center',
							},
							// Customize the circle behind the path, i.e. the "total progress"
							trail: {
							  // Trail color
							  stroke: '#17558600',
							  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
							  strokeLinecap: 'butt',
							  // Rotate the trail
							  transform: 'rotate(0.25turn)',
							  transformOrigin: 'center center',
							},
							// Customize the text
							text: {
							  // Text color
							  fill: '#f88',
							  // Text size
							  fontSize: '16px',
							},
							// Customize background - only used when the `background` prop is true
							background: {
							  fill: '#3e98c700',
							},
						  }}
					>
						<LayoutIcon
							src={ "assets/img/user1.svg" }
							className="profile-ava"
						/>
					</CircularProgressbarWithChildren>
				</div>
				<div className="col-md-9">
					
						{flds}
					
					
					<div className="row">
						<div className="col-md-4 layout-label">
							
						</div>
						<div className="col-md-8 mt-3">
							<div className="btn btn-secondary btn-sm px-5" onClick={this.onEdit}>
								{__("Save")}
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>;
	}
	onEditField = ( value, fieldtype, title) =>
	{
		let state = {...this.state};
		state[ title] = value;
		this.setState(state);
		console.log(value, title, state);
	}
	onEditFiels= evt =>
	{
		const fieldtype = evt.currentTarget.getAttribute("fieldtype");
		const value  = evt.currentTarget.value;
		//console.log(fieldtype, value);
		let state = {...this.state};
		state[fieldtype] = value;
		this.setState(state);
	}
	onEdit = () =>
	{

		let state = {...this.state};
		// console.log(state);
		delete state._id;
		this.props.onChange( state );
	}
}