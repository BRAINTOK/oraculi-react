import React, {Component, Fragment} from "react";
import { Classes, H5, Switch } from "@blueprintjs/core";
import { DatePicker, DateInput, IDateFormatProps, TimePrecision, DateTimePicker } from "@blueprintjs/datetime";
import {__} from "../layouts/utilities/i18n";
import Moment from 'react-moment';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'moment/locale/ru';
import { LocaleUtils } from "react-day-picker";

import {withRouter} from "react-router";
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";
import Loading from "../layouts/utilities/Loading";
import gql from 'graphql-tag';


class EventCalendar extends Component
{
	constructor(props) 
	{
		super(props);
		this.state = {
			date:new Date(props.date || Date.now())
		};
   }
	render()
	{
		const query = gql`query getBio_Events 
		{
			getBio_Events  
			{ 
				id
				post_title
				time
				__typename
			  }
		  }
		  `;
		const jsDateFormatter: IDateFormatProps = {
			// note that the native implementation of Date functions differs between browsers
			formatDate: date => moment( date ).format('D.MM.YYYY HH:mm'),
			parseDate: str => new Date(Date.parse(str)),
			placeholder: "M/D/YYYY",
		};
		const events		= this.props.events || [];
		const highlighted 	= events.map(e => new Date(Date.parse(e.start_date)));
		return <Query query={query} >
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <Loading/>;
					}
					if(data)
					{	
						console.log(data.getBio_Events);
						return <DatePicker 
							locale="ru"
							localeUtils={MomentLocaleUtils}
							showActionsBar={true}
							highlightCurrentDay={false}
							todayButtonText={__("Today")}
							clearButtonText={__("Clear")}
							onChange={this.handleDateChange} 
							minDate={ new Date( new Date().setFullYear( new Date().getFullYear() - 100 ) ) }
							maxDate={ new Date( new Date().setFullYear( new Date().getFullYear() + 10 ) ) }
							{...jsDateFormatter} 
							invalidDateMessage={__("Invalid date")}
							date={this.state.date}
							dayPickerProps={{
								modifiers:{
									highlighted : highlighted
								},
								numberOfMonths : 1,
								showOutsideDays : false,
								firstDayOfWeek:0
							}}
						/>
					}						
					if(error)
					{
						return error.toString();
					}
				}
			}
			</Query>
	}
	handleDateChange = (date: Date) => this.setState({ date });
}

export default compose(
	withApollo,
	withRouter
)(EventCalendar);