import React, {Fragment, Component} from "react";
import {__} from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import SubFilterPlaces from "./_MainFilter/SubFilterPlaces";
import $ from "jquery";
import { get, exec_route } from "../layouts/routing";
import { Route } from "react-router";

const components = {};
function importAll (r) 
{
	r.keys().forEach(key => 
	{
		const key1 = key.replace("./", "").split(".").slice(0, -1).join(".");
		components[key1] = r(key)
	});
}
importAll(require.context('../states/wpfestREST', false, /\.js$/));


class FreeRouteWidget extends Component
{
	render()
	{
		console.log(this.props.preroute + "/" + this.props.link_route);
		const link_routes 	= Array.isArray(this.props.link_route) 	? this.props.link_route : [this.props.link_route];
		const labels 		= Array.isArray(this.props.label) 		? this.props.label 		: [this.props.label];
		const __components	= Array.isArray(this.props.components) 
			?
			this.props.components
			:
			[]
		return link_routes.map((e, i) =>
		{
			const _Component = components[ __components[i] ].default;
			return <Route
				key={i}
				exact
				path ={ this.props.preroute + "/" + e }
			>
				<_Component {...this.props} />
			</Route> 
		});
	}
}
export default FreeRouteWidget;