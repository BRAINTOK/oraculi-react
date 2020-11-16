import React, {Component, Fragment} from "react";
import Row from "./Row";
import {__} from "../../layouts/utilities/i18n";
import Moment from 'react-moment';
import {
	Icon, Tag,
	Intent, Tooltip,
	Card, FormGroup,
	Button, ButtonGroup,
	Position, Popover, Callout,
	InputGroup
 } from "@blueprintjs/core";
import $ from "jquery";

export default class DataTableElements extends Component
{
	constructor(props)
	{
		super(props);
		const posts = this.props.posts ? this.props.posts : [];
		//console.log( posts );
		let checked= {};
		//posts.forEach(e => checked[e.id] = 0);
		this.state = {
			posts,
			current: this.props.current,
			height: this.props.height,
			allChecked 	: false, 
			checked,
			
		}
	}
	componentWillReceiveProps ( nextProps )
	{
		if(typeof nextProps.current !== "undefined" )
		{
			//console.log(nextProps.current);
			this.setState({current:nextProps.current});
		}
		if(typeof nextProps.checked !== "undefined" )
		{
			//console.log(nextProps.checked);
			this.setState({checked:nextProps.checked});
		}
	}
	render()
	{
		const rows = Array.isArray(this.state.posts) ?
			this.state.posts
			.filter(e => !e.parent)
			.map((elem, i) =>
			{	
				return <Fragment key={i}>
					<Row
						i={i}
						trColor={this.props.trColor}
						route={this.props.route}
						data_type={this.props.data_type}
						query_name = {this.props.query_name}
						query = {this.props.query}
						mutation_name={this.props.mutation_name}
						change_mutation={this.props.change_mutation}
						mutation_delete={this.props.mutation_delete}
						isOpen={i == this.state.current}
						onOpen={this.onOpen}
						onChecked={this.onChecked}
						elem={elem}
						isNew={this.props.isNew}
						checked={ this.state.checked[elem.id] }
						level={0}
					/>
					{/*children*/}
				</Fragment>
			})
			:
			<tr>
				<td colSpan="22">
					<Callout intent={Intent.DANGER} icon="error" title={ __( "Error" ) }>
						{ __( "Array data expected" ) }
					</Callout>
				</td>
			</tr>;
		return <tbody>
			{rows}
		</tbody>
	}
	onOpen = current =>
	{
		this.setState({current});
		this.props.onCurrent(current);
	}
	onChecked = ( chck, id ) =>
	{
		let checked = {...this.state.checked};
		if(chck)
		{
			checked[ id ] = 1;
		}
		else
		{
			checked[ id ] = 0;
		}
		this.setState({checked});
		// console.log( checked, id );
		// console.log( chck, this.state.posts.length );
		this.props.showAllChecked( checked );
	}
	
}