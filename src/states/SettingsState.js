import React, {Component, Fragment} from "react";
import BasicState from "../layouts/BasicState";
import { NavLink, Link } from 'react-router-dom';
import {__} from "../layouts/utilities/i18n";
import {styles, currentStyles} from "../layouts/template";

class SettingsState extends BasicState
{
	basic_state_data ()
	{
		let active = 1;
		const styles1 = styles();
		for(var i in styles1)
		{
			if(styles1[i].url == currentStyles())
			{
				console.log(i);
				active = styles1[i]._id;
				break;
			}
		}
		return { active, fluid: 1 };
	}
	render()
	{
		const styles1 = styles();
		const divs = styles1.map((e, i) =>
		{
			return <div 
				className={"btn square btn-secondary  m-1" + (this.state.active == e._id ? " active" : "")}
				onClick={this.onChange}
				e={ e.url }
				key={i}
			>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1 1">
					<rect x="0" y="0" width="1"  height="1" />
				</svg>
				<div>
					{__( e.title )}
				</div>
			</div>
		});
		return <div className="layout-state">
			<div className="layout-state-head">
				<span className={ "layout-state-logo " + this.state.route.icon } />
				<div className="layout-state-title">
					{ __( this.state.route.title ) }
				</div>
			</div>
			<div className="row text-center">
				<div className="col-12 my-2">
					<div className="lead">{__("Interface styles")}</div>
				</div>			
				<div className="col-12 my-2">
					<div className="btn-group d-flex flex-wrap" style={{justifyContent: "center", alignItems: "center"}}>
						{ divs }
					</div>			
				</div>			
				<div className="col-12 my-2">
					<div className="lead">{__("Container")}</div>
				</div>			
				<div className="col-12 my-2">
					<label className="_check_">
						<input	
							type="checkbox"
							checked={ this.state.fluid }
							onChange={ this.onFluid }
						/>
					</label>
				</div>			
			</div>
		</div>
	}
	onChange = evt =>
	{
		const a = evt.currentTarget.getAttribute("e");
		let active = 1;
		const styles1 = styles();
		for(var i in styles1)
		{
			if(styles1[i].url == a)
			{
				active = styles1[i]._id;
				break;
			}
		}
		this.setState({ active });
		this.props.onChangeStyle({ fluid:this.state.fluid, style: a });
	}
	onFluid = () => 
	{
		this.setState({ fluid : !this.state.fluid });
		const styles1 = styles();
		this.props.onChangeStyle({ fluid : !this.state.fluid, style : styles1.filter(e => e._id == this.state.active)[0].url });
	}
	getRoute = () =>
	{
		return "cog";
	}
}
export default SettingsState;