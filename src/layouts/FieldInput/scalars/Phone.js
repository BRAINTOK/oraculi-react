import React, {Component} from "react";
import PhoneInput, { isValidPhoneNumber }  from 'react-phone-number-input';
import 'react-responsive-ui/style.css'
import {__} from "../../utilities/i18n";

//TODO extends ScalarField
export default class Phone extends Component
{
	state = {value:this.props.value}
	render()
	{
		const { field, title } = this.props;
		const { value } = this.state;
		const col1 = this.props.vertical ? "col-12 layout-label-vert" : "col-md-3  layout-label";
		const col2 = this.props.vertical ? "col-12 layout-data-vert" : "col-md-7 layout-data";
		return <div className="row dat" key={field}>
			<div className={col1}>
				{__( title )}
			</div>
			<div className={col2}>
			{
				this.props.editable 
				?
					<div className="mb-4">
						<PhoneInput
							country="RU"
							placeholder={__("Enter phone number")}
							value={ this.state.value }
							onChange={ this.onChange }
							error={ value ? (isValidPhoneNumber(value) ? undefined : __('Invalid phone number')) : __('') }
						/>
					</div>
				:
					<div className="px-0 my-2">{ this.props.value }</div>
			}
			</div>
		</div>
	}
	onChange = value => 
	{
		this.setState({ value });
		this.on(value);
	}
	
	on = value =>
	{
		this.props.on( value, this.props.field, this.props.title );
	}
}