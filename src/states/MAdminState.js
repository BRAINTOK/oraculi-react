import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";

//out
class MAdminState extends BasicState
{
	render()
	{
		return <div className="layout-state  bg-white text-dark">
			<div className="position-relative " >
				<div className=" mt-5">
					<div className="row ">
						<div className="col-md-5 title">
							{__("Administaration")}
						</div>
					</div>
				</div>
			</div>
		</div>
	}
	getRoute = () =>
	{
		return "admin";
	}
}
export default MAdminState;