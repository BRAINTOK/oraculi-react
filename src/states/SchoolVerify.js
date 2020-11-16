import React, {Component, Fragment} from "react";
import i18n from "../layouts/i18n";
import {graphql, compose, withApollo, Query} from 'react-apollo';
import { loader } from 'graphql.macro';
import Loading from "../layouts/utilities/Loading";
import BasicState from "../layouts/BasicState";
import {withRouter} from "react-router";
import {Callout, Intent} from "@blueprintjs/core";

const verify_user = loader("../layouts/schema/graphql1/verify_user.graphql");

class SchoolVerify extends BasicState
{

	do_verify = (verify_user) =>{

		console.log( verify_user );
		let mess1;
		let mess2;
		if(verify_user.success)
		{
			mess1 = "Your e-mail verified successful.";
			mess2 = verify_user.current_user_id == verify_user.user_verified
				? "Congratulation!"
				: "Please log in this account and start to work.";
		}
		else
		{
			mess1 = "Error e-mail verification.";
			mess2 = verify_user.current_user_id == verify_user.user_verified
				? "Check new request for e-mail verification in Personal Cabinet."
				: "Please log in this account and check new request for e-mail verification in Personal Cabinet.";
		}
		const message = i18n.t( mess1 + mess2 );
		return <div className="bg-light w-100 p-5">
			<div className="new-head">
				{ i18n.t("Verify e-mail account") }
			</div>
			<div className="row">
				<div className="col-12 text-center mb-2">
					{i18n.t( mess1 )}
				</div>
				<div className="col-12 text-center">
					{i18n.t( mess2 )}
				</div>
			</div>
		</div>
	}

	addRender = () =>
	{

		return <Query query={verify_user}>
			{
				({ loading, error, data, client}) =>
				{
					if( loading)
					{
						return <Loading/>;
					}
					if(data)
					{
						const verify_user = data.verify_user || {};
						return verify_user
							?
							this.do_verify(verify_user)
							:
							"";
					}
					if(error)
					{
						return <Callout intent={Intent.DANGER}>
							{ error.toString()}
						</Callout>
					}
				}
			}
		</Query>;


	}
}

//    graphql( verify_user, {
//         options: (props) => ({
//             variables: {
//                 user_id: props.match.params.id,
//                 pattern: props.match.params.key
//             }
//         })
//     } )

export default compose(
	withApollo,
	withRouter
)( SchoolVerify );