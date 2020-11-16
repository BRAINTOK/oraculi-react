import React, { Component, Fragment } from "react";
import { menu } from "../../layouts/routing";
import LayoutIcon from "../../layouts/LayoutIcon";
import { template } from "../../layouts/template";
import { NavLink, withRouter } from "react-router-dom";
import { __ } from "../../layouts/utilities/i18n";
import { isCapability } from "../../layouts/user";
import PictogrammMenu from "./menuLeft/PictogrammMenu";
import HierarhicalMenu from "./menuLeft/HierarhicalMenu";
const injectTapEventPlugin = require("react-tap-event-plugin");

class LayoutMenuLeft extends Component 
{
	state = 
	{
		current: this.props.current,
		hover: false,
		show: true
	};

	toggle = () => 
	{
		this.setState({ show: !this.state.show });
	};

	componentWillReceiveProps(nextProps) 
	{
		this.setState({
			current: nextProps.current
		});
	}
	
	render()
	{
		const icons = menu().map((e, i) => 
		{
			const isRole =
					isCapability(e.capability, this.props.user);
			if(isRole) return "";	
			switch (template().left_menu) 
			{
				case "pictogramm":
					return (
						<PictogrammMenu {...e} current={this.state.current} i={i} key={i} />
					);
				case "hierarhical":
				default:
					return (
						<div key={i}>
							<button
								className='admin-menu-toggle'
								onClick={this.toggle}
							></button>

						<div style={{ display: this.state.show ? "block" : "none" }}>
							<HierarhicalMenu
								{...e}
								parent_route={""}
								razdel={e.children ? e.children : [e]}
								i={i}
								level={1}
								key={i}
							/>
						</div>
					</div>
				);
			}
		});
		return (
		  <div className='layout-menu-left'>
			{icons}
			<div className='layout-settings-btn '>
			  <NavLink
				to={"/cog"}
				className={"layout-left-btn "}
				activeClassName='active'
			  >
				<div className={"layout-menu-icon"}>
				  <i className='fas fa-cog' />
				</div>
			  </NavLink>
			</div>
		  </div>
		);
  }
  onSwitch = evt => {
    //this.setState({ current:evt.currentTarget.getAttribute("i") });
    this.props.onCurrent(evt.currentTarget.getAttribute("i"));
  };
}
export default withRouter(LayoutMenuLeft);
