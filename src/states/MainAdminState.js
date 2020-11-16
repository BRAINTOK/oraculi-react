import React, { Component, Fragment } from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from "react-router-dom";
import { __ } from "../layouts/utilities/i18n";
import layouts from "../layouts/layouts";

//out
class MainAdminState extends BasicState 
{
	addRender() 
	{
		//console.log(this.props);
		const menus = this.props.children
			?
			this.props.children.map((e, i) => 
			{
				const url = this.props.route + "/" + e.route;
				return  <div className='col-md-6 mb-3' key={i}>
						<div className='card bg-light text-center' style={{ width: "100%" }}>
							<div className='card-body'>
								<h5 className='card-title'>
									{__(e.title)}
								</h5>
								<p className='card-text'>
									{__(e.description)}
								</p>
								<NavLink 
									to={url} 
									className={"btn btn-primary text-right"}
								>
									Перейти
								</NavLink>
							</div>
						</div>
					</div>;
			})
			:
			null;
		//console.log( menus )
		return <div className='layout-state'> 
			<div className='layout-state-description'>
				{__(this.props.description)}
			</div>
			<div className='row'>
				{menus}
			</div>
		</div>
	}
	getRoute = () => 
	{
		return this.props.route;
	};
}
export default MainAdminState;
