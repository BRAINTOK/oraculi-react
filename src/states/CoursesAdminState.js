import React from "react";
import DataTable from "./SchoolDataTable";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {
	getQueryName, getQueryArgs,
	queryCollection, querySingle,
	getChangeName, getInputTypeName, getMutationArgs,
	mutationAdd, mutationEdit, mutationDelete
} from "../layouts/schema";
import {__} from "../layouts/utilities/i18n";
import {withRouter} from "react-router";
import gql from 'graphql-tag';
import {compose} from "recompose";
import {Query, withApollo} from "react-apollo";

//out
class CoursesAdminState extends BasicState
{
	render()
	{
		let data_type = "Bio_Article";
		const query_name = getQueryName(data_type)
		const query_args = getQueryArgs(data_type)

		let filter = this.props.match.params.id ? `{
			count:-1,
			taxonomies:[
				{	
					tax_name: "bio_course", 
					term_ids: 
					[${this.props.match.params.id}]
				}
			], 
			order: "asc", order_by_meta: "order"}
			` : null;
		let route = this.props.match.params.id ? "/admin/courses_articles/" + this.props.match.params.id : "/admin/courses_articles/";

		const query = queryCollection( data_type, query_name, query_args, filter);

		const mutation_name = getChangeName( data_type );
		const input_type_name = getInputTypeName( data_type );
		const mutation_args = getMutationArgs( data_type );
		let change_mutation = mutationEdit( data_type, mutation_name, input_type_name, mutation_args );

		const delete_mutation = mutationDelete( data_type );
		// see: https://www.apollographql.com/docs/react/v2.4/essentials/mutations/
		//const fills = dt ? dt.admin_data.fill : ["#4580E6","#1F4B99"];
		//const fills = ["#3f586b", "#293742"];
		const fills = ["transparent", "transparent"];

		//console.log(query);
		let content = 
		<Query query={gql`query getBio_Courses {
			getBio_Courses{id post_title}
		}`}>
			{
				({ loading, error, data, client}) =>
				{
					if (loading) {
						return null;
					}
					let current_course = {};
					if (this.props.match.params.id) {
						data.getBio_Courses.forEach((e) => {if (e.id == this.props.match.params.id) {
							current_course = e;
						}})
					}
					return <div className="row">
						<div className="col-md-2 col-3">
							{
								data.getBio_Courses.map((e, i) => <NavLink 
										to={"/admin/courses_articles/" + e.id} 
										className="switch-link"
										activeClassName="active"
										key={i}
									>
										{e.post_title}
									</NavLink>
								)
							}
						</div>
						{ current_course.id ? 
							<div className="col-md-10 col-9">
								<h2>{current_course.post_title}</h2>
								<DataTable
									theadColor = {fills[0]}
									trColor = {fills[1]}
									data_type = { data_type }
									query_name = {query_name}
									query = {query}
									mutation_name={mutation_name}
									change_mutation = {change_mutation}
									mutation_delete = {delete_mutation}
									custom_variables = {this.props.match.params.id ? {bio_course : [this.props.match.params.id]} : null}
									route={route}
									isList={false}
								/>
							</div>
							: "" }
					</div>;
				}
				}
	</Query>

		return <div className="layout-state">
			<div className="layout-state-head">
				<span className={ "layout-state-logo " + this.state.route.icon } />
				<div className="layout-state-title">
					{ __( this.state.route.title ) }
				</div>
			</div>
			<div className="">
				{content}							
			</div>
		</div>
	}
	getRoute = () =>
	{
		return "admin";
	}
}
export default compose(
	withApollo,
	withRouter
)(CoursesAdminState)