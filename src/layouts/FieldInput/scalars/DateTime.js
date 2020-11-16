import React, {Component, Fragment} from "react";
import { Card, Classes, FormGroup, Button, Tooltip, Position, Popover, ButtonGroup } from "@blueprintjs/core";
import { DateInput, IDateFormatProps, TimePrecision, DateTimePicker } from "@blueprintjs/datetime";
import {__} from "../../utilities/i18n";
import ScalarField from "./ScalarField";
import Moment from 'react-moment';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'moment/locale/ru';

export default class DateTime extends ScalarField
{
	constructor(props)
	{
		super(props);
		const now  = Date.now();
		const d = new Date(now);
		const plusm = d.setMonth(d.getMonth() + 2);
		let range = props.range;
		range = range == [] ? [new Date(range[0]), new Date(range[1])] : [new Date(now), new Date(plusm)];
		//console.log(props);
		//console.log(now);
		this.state = {
			value : new Date(this.props.value || now),
			range : range,
			date : new Date(this.props.value || now)
		}
	}
	componentWillReceiveProps ( nextProps )
	{
		if(nextProps.value)
			this.setState({value:new Date(nextProps.value), date:new Date(nextProps.value)})
	}
	render()
	{
		const {field, title, value, className} = this.props;
		const jsDateFormatter: IDateFormatProps = {
			// note that the native implementation of Date functions differs between browsers
			formatDate: date => moment( date ).format('D.MM.YYYY HH:mm'),
			//parseDate: str => new Date(str),
			parseDate: str => new Date(Date.parse(str)),
			placeholder: "M/D/YYYY",
		};
		
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-9 layout-data";
		return <div className="row  dat" key={field}>
			<div className={col1}>
				{ __( title ) }
			</div>
			<div className={col2}>
				{
				this.props.editable 
					?
					<div className={"datetimer "+this.props.className}>
						<i className="fas fa-calendar-alt pr-1 fa-15x"/>
						<DateInput
							minDate={ new Date( new Date().setFullYear( new Date().getFullYear() - 100 ) ) }
							maxDate={ new Date( new Date().setFullYear( new Date().getFullYear() + 10 ) ) }
							{...jsDateFormatter} 
							className={" " + ""}
							closeOnSelection={true}
							date={this.state.date}
							defaultValue={new Date(this.state.date)}
							onChange={this.handleStartChange}
							invalidDateMessage={__("Invalid date")}
							timePrecision={ TimePrecision.MINUTE }
							timePickerProps={{showArrowButtons: true}}
						/>
					</div>
					:
					<div className="d-flex my-1">
						<i className="fas fa-calendar-alt pr-1"/>
						<div className="">
							<Moment locale="ru" format="D MMMM YYYY HH:mm">
								{new Date( this.state.value )}
							</Moment>
						</div>
					</div>
				}
			</div>
		</div>
	}
	isEnabled()
	{
		const {field, title, value, className} = this.props;
		const jsDateFormatter: IDateFormatProps = {
			// note that the native implementation of Date functions differs between browsers
			formatDate: date => moment( date ).format('D.MM.YYYY HH:mm'),
			//parseDate: str => new Date(str),
			parseDate: str => new Date(Date.parse(str)),
			placeholder: __("Time"),
		};
		
		return <div className={"datetimer "+this.props.className}>
			<i className="fas fa-calendar-alt pr-1 fa-15x"/>
			<DateInput
				minDate={ new Date( new Date().setFullYear( new Date().getFullYear() - 100 ) ) }
				maxDate={ new Date( new Date().setFullYear( new Date().getFullYear() + 10 ) ) }
				{...jsDateFormatter} 
				invalidDateMessage={__("Invalid date")}
				timePrecision={ TimePrecision.MINUTE }
				className={" " + ""}
				closeOnSelection={true}
				date={this.state.date}
				defaultValue={new Date()}
				onChange={this.handleStartChange}
			/>
		</div>;
	}
	isDesabled()
	{
		return <div className="d-flex my-1">
			<i className="fas fa-calendar-alt pr-1"/>
			<div className="">
				<Moment locale="ru" format="D MMMM YYYY">
					{new Date( this.state.value )}
				</Moment>
			</div>
		</div>
	}
	
	dtp()
	{
		return <DateTimePicker
			className={Classes.ELEVATION_1}
			value={this.state.date}
			timePickerProps={{ precision: "second", useAmPm: true }}
			onChange={this.handleStartChange}
		/>
	}
	handleStartChange = value =>
	{
		this.setState({ value });
		const state = { ...this.state, value };
		//this.on(Date.parse(value)/1000);
		this.on( moment( value ).toISOString() );
	}
	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}