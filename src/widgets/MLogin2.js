import React, { Component, Fragment } from "react";
import { Dialog, Classes, Button, Intent } from "@blueprintjs/core";
import { NavLink, Link } from "react-router-dom";
import { profile } from "../layouts/routing";
import { __ } from "../layouts/utilities/i18n";
import Loading from "../layouts/utilities/Loading";
import LayoutIcon from "../layouts/LayoutIcon";
import { isCapability } from "../layouts/user";
import ReactDOM from "react-dom";
import { compose } from "recompose";
import { Query, withApollo, Mutation } from "react-apollo";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import {AppToaster} from "../layouts/utilities/blueUtils";
import ReviewDialog from "../states/MLanding/ReviewDialog";

class MLogin2 extends Component {
  state = {
    isHide: !(this.props.user && this.props.user.is_waiting_review),
    isQuestion: false,
    isOpen: this.props.isOpen,
    height: 0
  };

  componentDidMount() {
    document.body.addEventListener("click", this.onMouseLeaveHandler);
  }
  componentWillUnmount() {
    document.body.removeEventListener("click", this.onMouseLeaveHandler);
  }
  onMouseLeaveHandler = e => {
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({
        isOpen: this.props.isOpen,
        height: 0
      });
    }
  };

  render() {
    const profile_routing = profile();
    let profile_menu;
    if (profile_routing.length > 0) 
	{
      profile_menu = profile_routing.map((e, i) => 
	  {
        const isRole = isCapability(e.capability, this.props.user);
        if (isRole) return "";
        return (
          <NavLink
            className={""}
            activeClassName='active'
            to={"/" + e.route}
            key={i}
          >
            <LayoutIcon
              isSVG={true}
              src={e.icon}
              className='personal-menu__icon mr-3'
            />
            {__(e.title)}
          </NavLink>
        );
      });
    } 
	else 
	{
      profile_menu = (
        <NavLink className={""} activeClassName='active' to={"/profile"}>
          <LayoutIcon
            isSVG={true}
            src={"/assets/img/user.svg"}
            className='personal-menu__icon mr-3'
          />
          {__("edit profile")}
        </NavLink>
      );
    }
	const current_course = this.props.user ?  this.props.user.current_course.post_title : "";
	
    return [
		<div className='first-screen__aside' key={1}>
			<div className='cabnet' onClick={this.onToggle}>
			  <div className='user-name layout-header-title'>
				{ this.props.user.display_name }
			  </div>
			  <div className='reg_icon'>
				<i className='fas fa-user'></i>
			  </div>
			</div>

			<div className='logined-menu' style={{ height: this.state.height }}>
			  <ul id='person_menu'>
				{profile_menu}
				<li onClick={this.logout}>
				  <LayoutIcon
					isSVG={true}
					src={"/assets/img/logout.svg"}
					className='personal-menu__icon mr-3'
				  />
				  {__("logout")}
				</li>
			  </ul>
			</div>
			{
			!this.state.isHide 
				? 
				<div className={"question "} onClick={this.onQuestionHandler}>
					<div className="question__icon">
						<i className="far fa-envelope"></i>
					</div>
					<div className="question__text">
						{__("Обратная связь")}
					</div>
				</div>
				: 
				null
			}
		</div>,
		<ReviewDialog 
			isQuestion={this.state.isQuestion}
			user ={this.props.user}
			onClose={this.onQuestionHandler}
			key={2}
		/>
    ];
  }
	
	onQuestionHandler = evt => 
	{
		this.setState({ isQuestion: !this.state.isQuestion, alert:false });
	};
	onToggle = evt => 
	{
		//console.log( document.getElementById("person_menu").clientHeight );
		this.setState({
		isOpen: !this.state.isOpen,
		height: !this.state.isOpen
			? document.getElementById("person_menu").clientHeight
			: 0
		});
	};
	logout = () => 
	{
		this.props.logout();
	};
}
export default compose(withApollo, withRouter)(MLogin2);
