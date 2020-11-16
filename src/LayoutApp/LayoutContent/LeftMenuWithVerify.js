import React, {Fragment, Component} from 'react'
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { Link, NavLink } from 'react-router-dom';
import { Intent, Tag, Button} from "./utilities/AppToaster";
import i18n from "../../layouts/i18n";
// import {  } from "react-router-dom";
import Loading from "./utilities/Loading";

import leftmenu from "../../states/mapState/graphql/leftmenu.graphql";
import main_request from "../../states/mapState/graphql/get_user_request.graphql";
import request_verify from "../../states/mapState/graphql/request_verify.graphql";

class LeftMenuWithVerify extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
		{

		};
    }
    render()
    {
        if (this.props.data.loading) return <Loading/>;
        let leftmenu = this.props.data.leftmenu.left_menu || [];
		let comment = <div className="lead px-3 py-3 text-light text-center " style={{backgroundColor:"#182026"}}>
			{i18n.t("Personal Cabinet")}
		</div>;
		if( this.props.init.user.account_activated == 0 )
		{
			leftmenu = leftmenu.filter(elem => elem.id=="params");
			comment =  <Fragment>
				{comment}
				<Tag
					icon={ false }
					intent={ Intent.DANGER }
					minimal={ false }
					fill={true}
					round={ false }
					large={ true }
					className={"p-4 text-center"}
					style={{height:200}}
				>
					<div className="mb-3">
						{"	" + i18n.t("Verify your e-mail for full functionality.")}
					</div>
					<div
						className="small btn btn-outline-light btn-sm px-3 py-1"
						onClick={this.onNewVerify}
					>
						{i18n.t("Request new verification")}
					</div>
				</Tag>
			</Fragment>
		}
        // console.log( this.props );
        // const main_request = this.props.main_request.main_request || {};
        // const requests = main_request.requests || {};
        const menus = leftmenu.map((menuPoint, num) =>
		{
			const alert = menuPoint.alert ?
				<div className="indic" title={menuPoint.alert.hint}>
					{menuPoint.alert.label}
				</div>
				:
				null;
			const success = menuPoint.success ?
				<div className="indicm" title={menuPoint.success.hint}>
					{menuPoint.success.label}
				</div>
				:
				null;
            return menuPoint.id === "separator" ?
                <li className='separator' key={num} >
                    <div className='spacer-5'></div>
                </li>
                :
				<li className={ num === this.state.num ? "active" : num } key={num} >
                    <NavLink 
						to={'/cabinet/'+menuPoint.id} 
						lid={menuPoint.id} 
						activeClassName={"active"}
					>
                        <span><i className={menuPoint.icon}/></span>
                        {i18n.t(menuPoint.title)}
                        <i className='fas fa-angle-right zz'> </i>
						{ success }
						{ alert }
                    </NavLink>
                </li>
        });
        return 	<Fragment>
			{comment}
			<ul className="bio_cab_menu">
				{ menus }
			</ul>
		</Fragment>
    }
	onNewVerify = () =>
	{
		this.props.request_verify( 
		{
			variables: 
			{ 
				url: window.location.origin 
			},
            update: (store, { data: { request_verify } }) =>
			{
				console.log(request_verify);				
            }
        });
	}
}

//



LeftMenuWithVerify.propTypes = {}

LeftMenuWithVerify.defaultProps = {};

//(props.match.params.id ? props.match.params.id : "")

export default compose(
    graphql(leftmenu),
    graphql(main_request, {
        name: "main_request"
    }),
    graphql(request_verify, {
        name: "request_verify"
    })
)(LeftMenuWithVerify);

//https://github.com/apollographql/react-apollo/issues/660

//https://reacttraining.com/react-router/web/api/NavLink