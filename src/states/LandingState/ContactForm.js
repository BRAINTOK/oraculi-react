import React, {Component, Fragment} from "react";
import {__} from "../../layouts/utilities/i18n";
import LayoutIcon from "../../layouts/LayoutIcon";
import EditLabel from "./EditLabel";
import {components} from "./Section";
import SectionContent from "./SectionContent";
import MediaChooser from "../../layouts/utilities/MediaChooser";
import { AppToaster } from "../../layouts/utilities/blueUtils";
import { Button, ButtonGroup, Intent, Popover, Dialog, Icon, Tooltip, Position, Callout } from "@blueprintjs/core";
import gql from 'graphql-tag';
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";
import { compose } from "recompose";
import $ from "jquery";
import { DateInput, IDateFormatProps, TimePrecision, DateTimePicker } from "@blueprintjs/datetime";
import Moment from 'react-moment';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'moment/locale/ru';


class ContactForm extends SectionContent
{
	
	getState()
	{
		this.ref = React.createRef();
		return {
			values  : [],
			message	: "",
			height  : 200	
		}
	}
	is()
	{
		const { forms } = this.state.data;
		return Array.isArray(forms) && forms.length > 0  
	}
	renderContent()
	{
		const { type } = this.props;
		const { class_name, style, forms, label } = this.props.data;
		//console.log(this.props.data.forms);
		return this.state.message
			?
			<div className="w-100 " style={{ ...style }} >
				<div className="landing-contact-form" style={{ minHeight: this.state.height }} >
					<span className=" cf-message ">
						{ this.state.message }
					</span>
				</div>
			</div>
			:
			<div className="w-100" style={{ ...style }} >
				<div className="landing-contact-form" style={{ minHeight: this.state.height }} ref={ this.ref } >
					{this.getForms()}
					<div className="p-4 d-flex">
						<div 
							className="btn btn-primary mx-auto"
							onClick={this.onSend}
						>
							{label}
						</div>
					</div>
				</div>
			</div>
	}
	getForms()
	{
		const { forms } = this.props.data;
		const jsDateFormatter: IDateFormatProps = {
			// note that the native implementation of Date functions differs between browsers
			formatDate: date => moment( date ).format('D.MM.YYYY HH:mm'),
			//parseDate: str => new Date(str),
			parseDate: str => new Date(Date.parse(str)),
			placeholder: "M/D/YYYY",
		};
		// console.log(this.props.data.forms);
		return forms.map((e,i) =>
		{
			const label = e.label 
				?
				<div className="title">
					{__(e.label)}
				</div>
				:
				null;
			const description = e.description 
				?
				<div className="description">
					{__(e.description)}
				</div>
				:
				null;
			let input;
			//console.log( e.type );
			switch( e.type )
			{
				case "email":
					input = <div>
						<input
							type="email"
							className="form-control my-2"						
							name={ e.label }
							value={ this.state.values[i] }
							onChange={evt => this.onValue(evt, i) }
						/>
					</div>
					break;
					break;
				case "phone":
					input = <div>
						<input
							type="phone"
							className="form-control my-2"						
							name={ e.label }
							value={ this.state.values[i] }
							onChange={evt => this.onValue(evt, i) }
						/>
					</div>
					break;
				case "file_loader":
					input = <div >
						<MediaChooser
							prefix={ "_" + e.label }							
							url={ e.value }
							id={ "mc_" + i }
							ID={ "mc_" + i }
							padding={5}
							height={140}
							onChange={ (value, file) => this.onMediaChange(value, file, i) }
						/>	
					</div>
					break;
				case "time": 
					input = <div>
						<DateInput
							minDate={ new Date( new Date().setFullYear( new Date().getFullYear() - 100 ) ) }
							maxDate={ new Date( new Date().setFullYear( new Date().getFullYear() + 10 ) ) }
							{...jsDateFormatter} 
							className={" " + ""}
							closeOnSelection={true}
							date={this.state.values[i]}
							defaultValue={new Date()} 
							onChange={value => this.handleStartChange(value, i) }
							invalidDateMessage={__("Invalid date")}
							timePrecision={ TimePrecision.MINUTE }
							timePickerProps={{showArrowButtons: true}}
						/>
					</div>;
					break;
				case "calendar":
					input = <div>
						<DateTimePicker
							minDate={ new Date( new Date().setFullYear( new Date().getFullYear() - 100 ) ) }
							maxDate={ new Date( new Date().setFullYear( new Date().getFullYear() + 10 ) ) }
							{...jsDateFormatter} 
							className={" " + ""}
							closeOnSelection={true}
							date={this.state.values[i]}
							defaultValue={new Date()} 
							onChange={value => this.handleStartChange(value, i) }
							invalidDateMessage={__("Invalid date")}
							timePrecision={ TimePrecision.MINUTE }
							timePickerProps={{showArrowButtons: true}}
						/>
					</div>;
					break;
				case "radio": 
					console.log(this.state.values[i], e.label);
					const variants = this.props.data.forms[i].data
						.map((e,ii) =>
						{
							return <div className="p-2" key={ii}>
								<label for={ "cf-radio" + this.props.section_id + "_" + ii } className="_check_">
									<input 
										type="radio"
										className="" 
										ii={ii}
										i={i}
										id={ "cf-radio" + this.props.section_id + "_" + ii }
										checked={ this.state.values[i] == e.label}
										onChange={this.onRadioChange}
									/>
									{e.label}
								</label>
							</div>
						});
					input = <div>
						{variants}
					</div>
					break;
				case "string":
				default:
					input = <div>
						<input
							type="text"
							className="form-control my-2"						
							name={ e.label }
							onChange={evt => this.onValue(evt, i) }
						/>
					</div>
			}
			return <div key={i} className="py-4">
				{ label }
				<div className={ "req_input " + ( e.is_required ? "required" : "" ) }>
					{ input }
					{
						e.is_required 
							? 
							<span className="req">
								{ __( "required field" ) }
							</span>
							:
							null
					}
				</div>
				{ description }
			</div>
		});
	}
	onRadioChange = evt =>
	{
		const i = evt.currentTarget.getAttribute("i");
		const ii = evt.currentTarget.getAttribute("ii");
		const cheched = evt.currentTarget.checked;
		const value = this.props.data.forms[i].data[ii].label;
		let values = [...this.state.values];
		values[i] = value;
		console.log( value, i , values ); 
		this.setState({ values });
	}
	onValue(evt, i)
	{
		const value = evt.currentTarget.value;
		let values = [...this.state.values];
		values[i] = value;
		// console.log( value, i , values ); 
		this.setState({ values });
	}
	
	onMediaChange = (value, file, i) =>
	{
		let values = [...this.state.values];
		values[i] = value;
		this.setState({ values });
	}
	handleStartChange = (value, i) =>
	{
		let values = [...this.state.values];
		values[i] = value;
		this.setState({ values });
		//const state = { ...this.state, values }; 
		// this.on( moment( value ).toISOString() );
	}
	onSend = () =>
	{ 
		let values = [...this.state.values];
		// console.log( values ); 
		const { forms, toast_text } = this.state.data;
		if( values.filter( e => e != "" || typeof e != "undefined" ).length == 0 )
		{		
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick",
				message: __( "Form is empty." )
			});	
			return;
		}
		let req = forms
			.filter( ( e, i ) => 
			{
				// console.log( values[i] );
				return e.is_required && ( values[i] == "" || typeof values[i] == "undefined" ) 
			} )
				.map(e => e.label); 		
		// console.log( values, req ); 		
		if( req.length > 0 )
		{		
			AppToaster.show({
				intent: Intent.DANGER,
				icon: "tick",
				duration:10000,
				message: __( "Some required are empty: "  ) + req.join(", ")
			});	
			return;
		}
		//sending
		let message = [];
		forms.forEach((e, i) =>
		{
			message.push({
				...e,
				i:i,
				value : values[i]			
			});
		});
		let message_json 	= (JSON.stringify( message )).replace( /"/g, "'" );
		let matrix_json 	= (JSON.stringify( forms  )).replace( /"/g, "'" );
		
		const mutation = gql`
			mutation sendPELandingContactFormMessage
			{
				sendPELandingContactFormMessage( input: 
					{
						message_json 	: "${message_json}",
						matrix_json 	: "${matrix_json}"
					} 
				)
			}`;
		this.props.client.mutate({
			mutation: mutation, 
				update: (store, { data: data }) =>
				{
					this.setState({ 
						values: [], 
						message: __( toast_text ),
						height: this.ref.current.getBoundingClientRect().height
					});
					/*
					AppToaster.show({
						intent: Intent.SUCCESS,
						icon: "tick",
						duration:10000,
						message: __( toast_text )
					});
					*/					
				}
		});
		
	}
}
export default  compose(
	withApollo,
	withRouter
)(ContactForm);