import React, {Component, Fragment}  from "react";
import FieldInput from "../../layouts/FieldInput";
import {__} from "../../layouts/utilities/i18n";
import {
  FormGroup,
  InputGroup,
  Classes,
  Button,
  Intent,
  Icon
} from "@blueprintjs/core";
import gql from "graphql-tag";
import { withApollo, graphql, Mutation } from "react-apollo";
import { AppToaster } from "../../layouts/utilities/blueUtils";
import { compose } from "recompose";
import { withRouter } from "react-router";


class Settings extends Component
{
	constructor(props)
	{
		super(props);
		this.state = { ...props };
	}
	render()
	{
		const mutation = gql`
		  mutation changeOptions($input: OptionsInput) {
			changeOptions(input: $input)
		  }
		`;
		
		return <Mutation mutation={mutation}>
        {
			m_change => 
			{
				let flds = [];
				for( var ff in this.props)
				{
					flds.push( { name:ff, data: this.props[ff] } );
				}
				const fields = flds.map((e,i) =>
				{
					if(["__typename", "i", "client", "history", "location", "match", "staticContext"]
						.filter(ee => ee == e.name)
							.length > 0)
								return null; 
					
					if (typeof this.props[e.name] == "object" && this.props[e.name] != null)
					{
						return <FieldInput
							key={i}
							title={__(e.name)}
							type={"external"}
							kind="type"
							component={"Bio_Course"}
							external_fields={["id", "post_title"]}
							field={e.name}
							editable={true}
							value={this.props[e.name]}
							onChange={this.onChange}
						/>
					}
					else
					{
						return <FieldInput
							key={i}
							title={__(e.name)}
							type={"string"}
							field={e.name}
							editable={true}
							value={this.props[e.name]}
							onChange={this.onChange}
						/>
					}
					
				});
				return <Fragment>
					{fields}
					<div className="btn btn-primary offset-md-3 my-5" onClick={e => 
					{
						e.preventDefault();
						this.onChangeOptions(m_change);
					}}>
						{__("Change")}
					</div>
				</Fragment>
			}
		}
        </Mutation>
	}
	onChange = (e, i) =>
	{
		let obj = {};
		obj[i] = e;
		this.setState(obj);
	}
	onChangeOptions = m_change => 
	{
		let _data = {};
		for(var s in this.state)
		{
			if(["__typename", "i", "client", "history", "location", "match", "staticContext"]
				.filter(ee => ee == s)
					.length > 0)
						continue;
			if( s == "__typename") continue;
			_data[s] = this.state[s].id ? this.state[s].id : this.state[s];
			console.log( _data, typeof this.state[s] );
		}
		m_change({
			variables: 
			{
				input: _data
			},
			update: (store, { data: { changeOptions } }) => 
			{
				AppToaster.show({
					intent: Intent.SUCCESS,
					icon: "tick",
					message: __("Профиль отредактирован")
				});
			}
		});
	}
}

export default compose(withApollo, withRouter)(Settings);